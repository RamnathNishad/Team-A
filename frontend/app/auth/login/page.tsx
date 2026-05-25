'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { authService } from '@/services/authService';
import { useDispatch } from 'react-redux';
import { setAuth, setAuthError, setAuthLoading } from '@/store/slices/authSlice';

// Validation Schema based on BRD requirements
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional().default(false),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  // Load remembered email on mount
  useEffect(() => {
    const remembered = authService.getRememberedEmail();
    if (remembered) {
      setValue('email', remembered);
      setValue('rememberMe', true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError('');
    dispatch(setAuthLoading(true));

    try {
      const response = await authService.login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });

      if (response?.user && response?.accessToken) {
        // Update Redux store
        dispatch(
          setAuth({
            user: response.user,
            token: response.accessToken,
            isAuthenticated: true,
          })
        );

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setServerError(response?.message || 'Login failed. Please try again.');
        dispatch(setAuthError(response?.message || 'Login failed'));
      }
    } catch (error: any) {
      const errorMessage =
        error?.message ||
        error?.error?.message ||
        'Invalid email or password. Please try again.';
      setServerError(errorMessage);
      dispatch(setAuthError(errorMessage));
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
      dispatch(setAuthLoading(false));
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your SmartLoan account</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Server Error Alert */}
          {serverError && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
              <div className="flex-shrink-0 text-red-600 text-xl">⚠️</div>
              <div>
                <p className="text-sm font-medium text-red-800">{serverError}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
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
                className={`w-full px-4 py-3 rounded-lg border-2 bg-gray-50 focus:bg-white transition ${
                  errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-600'
                } focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">✕</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Password
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
                  {showPassword ? (
                    <span className="text-xl">👁️</span>
                  ) : (
                    <span className="text-xl">👁️‍🗨️</span>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">✕</span> {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
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
                  <span>Signing in...</span>
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-xs text-blue-900 font-medium">📝 Demo Credentials:</p>
            <p className="text-xs text-blue-700 mt-1">Email: demo@smartloan.com</p>
            <p className="text-xs text-blue-700">Password: Demo@12345</p>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New to SmartLoan?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/auth/register"
            className="w-full py-3 px-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition text-center block"
          >
            Create an Account
          </Link>
        </div>

        {/* Security Info */}
        <div className="mt-8 text-center text-xs text-gray-600 space-y-2">
          <p className="flex items-center justify-center space-x-2">
            <span>🔒</span>
            <span>Your information is encrypted and secure</span>
          </p>
          <p className="flex items-center justify-center space-x-2">
            <span>✓</span>
            <span>Session timeout: 30 minutes of inactivity</span>
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center space-y-2 text-xs text-gray-600">
          <p>
            Need help?{' '}
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
