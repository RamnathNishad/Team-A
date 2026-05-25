'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation Schema
const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setServerError('');
    setSuccessMessage('');

    try {
      // Call password reset API
      const response = await fetch('/api/v1/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to send reset link. Please try again.');
        return;
      }

      setSuccessMessage(`Password reset link sent to ${data.email}`);
      setEmailSent(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    } catch (error) {
      setServerError('An error occurred. Please try again.');
      console.error('Forgot password error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

        {/* Logo Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">💳</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset Your Password</h1>
          <p className="text-gray-600">Enter your email address and we'll send you a link to reset your password</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Success Alert */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 text-green-600 text-xl">✓</div>
              <div>
                <p className="text-sm font-medium text-green-800">{successMessage}</p>
                <p className="text-xs text-green-700 mt-1">Redirecting to login...</p>
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
          {!emailSent ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email Address
                </label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition disabled:bg-gray-100 disabled:cursor-not-allowed ${
                    errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-600'
                  } focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <span className="mr-1">✕</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-medium mb-2">What happens next?</p>
                <ul className="space-y-1 text-xs text-blue-700">
                  <li>✓ We'll send a password reset link to your email</li>
                  <li>✓ The link will be valid for 24 hours</li>
                  <li>✓ Click the link to create a new password</li>
                </ul>
              </div>

              {/* Send Button */}
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
                    <span>Sending...</span>
                  </span>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="mb-4 text-5xl">📧</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Check Your Email</h2>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <strong>{getValues('email')}</strong>
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left text-sm text-gray-700 space-y-2">
                <p className="font-medium">Tips:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Check your spam/junk folder if you don't see it</li>
                  <li>The link will expire in 24 hours</li>
                  <li>If you don't receive an email, try again or contact support</li>
                </ul>
              </div>
              <p className="text-xs text-gray-600 mb-4">Redirecting to login in a few seconds...</p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
              >
                Back to Login
              </Link>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Back to Login */}
          <Link
            href="/auth/login"
            className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition text-center block"
          >
            Back to Sign In
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
          <p className="flex items-center justify-center space-x-2">
            <span>🔒</span>
            <span>Password reset links are secure and expire after 24 hours</span>
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2 text-xs text-gray-600">
          <p>
            Still need help?{' '}
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Contact Support
            </Link>
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/privacy" className="hover:text-gray-900">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-900">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}