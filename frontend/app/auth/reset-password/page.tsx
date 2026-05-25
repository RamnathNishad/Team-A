'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation Schema
const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const token = searchParams.get('token') || '';
  const email = searchParams.get('email') || '';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onBlur',
  });

  const password = watch('password');

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/v1/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          token: token,
          newPassword: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to reset password. Please try again.');
        return;
      }

      setSuccessMessage('Password reset successfully! Redirecting to login...');
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error) {
      setServerError('An error occurred. Please try again.');
      console.error('Reset password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center">
              <div className="text-red-600 text-5xl mb-4">⚠️</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Link</h1>
              <p className="text-gray-600 mb-6">The password reset link is invalid or has expired.</p>
              <Link
                href="/auth/forgot-password"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Request New Link
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center px-4 py-12">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition">
            <span className="mr-2">← Back to Home</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">💳</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Password</h1>
          <p className="text-gray-600">Enter your new password below</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Success Alert */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 text-green-600 text-xl">✓</div>
              <div>
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
              </div>
            </div>
          )}

          {/* Error Alert */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 text-red-600 text-xl">⚠️</div>
              <div>
                <p className="text-sm font-medium text-red-800">{serverError}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* New Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition ${
                    errors.password ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-600'
                  } focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {showPassword ? <span className="text-xl">👁️</span> : <span className="text-xl">👁️‍🗨️</span>}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-start">
                  <span className="mr-1 mt-0.5">✕</span> {errors.password.message}
                </p>
              )}

              {/* Password Requirements */}
              <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-900 mb-2">Password Requirements:</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li className={password && password.length >= 8 ? 'text-green-600' : ''}>
                    ✓ At least 8 characters
                  </li>
                  <li className={password && /[A-Z]/.test(password) ? 'text-green-600' : ''}>
                    ✓ One uppercase letter
                  </li>
                  <li className={password && /[a-z]/.test(password) ? 'text-green-600' : ''}>
                    ✓ One lowercase letter
                  </li>
                  <li className={password && /[0-9]/.test(password) ? 'text-green-600' : ''}>
                    ✓ One number
                  </li>
                  <li className={password && /[^A-Za-z0-9]/.test(password) ? 'text-green-600' : ''}>
                    ✓ One special character
                  </li>
                </ul>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition ${
                    errors.confirmPassword ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-600'
                  } focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 focus:outline-none"
                >
                  {showConfirmPassword ? <span className="text-xl">👁️</span> : <span className="text-xl">👁️‍🗨️</span>}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">✕</span> {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Reset Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Resetting Password...</span>
                </span>
              ) : (
                'Reset Password'
              )}
            </button>
          </form>

          {/* Security Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-xs text-yellow-800 flex items-start">
              <span className="mr-2">🔒</span>
              <span>Your password will be securely hashed and encrypted. Never share your password with anyone.</span>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>
            Remember your password?{' '}
            <Link href="/auth/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
