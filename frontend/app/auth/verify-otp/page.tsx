'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Validation Schema
const verifyOtpSchema = z.object({
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

export default function VerifyOtpPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(0);
  const [email, setEmail] = useState<string>('');

  // Get email from query params or previous step
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get('email') || sessionStorage.getItem('registerEmail') || '';
    setEmail(emailParam);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    mode: 'onBlur',
  });

  const otpValue = watch('otp');

  const onSubmit = async (data: VerifyOtpFormData) => {
    setIsLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/v1/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: data.otp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerError(result.message || 'Failed to verify OTP. Please try again.');
        return;
      }

      // OTP verified successfully, redirect to login
      router.push('/auth/login?verified=true');
    } catch (error) {
      setServerError('An error occurred. Please try again.');
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setServerError('');

    try {
      const response = await fetch('/api/v1/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        setServerError('Failed to resend OTP. Please try again.');
        return;
      }

      // Start countdown timer
      setResendTimeout(60);
      const interval = setInterval(() => {
        setResendTimeout((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setServerError('An error occurred. Please try again.');
      console.error('Resend OTP error:', error);
    } finally {
      setResendLoading(false);
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
          <Link href="/auth/register" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition">
            <span className="mr-2">← Back</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">💳</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">Enter the 6-digit OTP sent to {email}</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
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
            {/* OTP Field */}
            <div>
              <label htmlFor="otp" className="block text-sm font-semibold text-gray-900 mb-2">
                6-Digit OTP
              </label>
              <input
                {...register('otp')}
                type="text"
                id="otp"
                inputMode="numeric"
                placeholder="000000"
                maxLength={6}
                className={`w-full px-4 py-3 text-center text-2xl tracking-widest rounded-lg border-2 bg-gray-50 focus:bg-white transition ${
                  errors.otp ? 'border-red-500 focus:border-red-600' : 'border-gray-200 focus:border-blue-600'
                } focus:outline-none focus:ring-0 text-gray-900 placeholder:text-gray-400 font-semibold`}
              />
              {errors.otp && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="mr-1">✕</span> {errors.otp.message}
                </p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
              <p className="font-medium">📧 Check Your Email</p>
              <p className="mt-1 text-xs">We've sent a 6-digit code to your email. It will expire in 10 minutes.</p>
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || !otpValue || otpValue.length !== 6}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition ${
                isLoading || !otpValue || otpValue.length !== 6
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:from-blue-700 hover:to-blue-800'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Verifying...</span>
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>
          </form>

          {/* Resend OTP */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Didn't receive the code?{' '}
              <button
                onClick={handleResendOtp}
                disabled={resendTimeout > 0 || resendLoading}
                className={`font-medium transition ${
                  resendTimeout > 0 || resendLoading
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:text-blue-700'
                }`}
              >
                {resendTimeout > 0 ? `Resend in ${resendTimeout}s` : 'Resend OTP'}
              </button>
            </p>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-6 text-center text-xs text-gray-600">
          <p>
            Wrong email?{' '}
            <Link href="/auth/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Go back
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
