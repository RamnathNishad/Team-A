'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { Button } from '@/components/common/Button';
import { Input } from '@/components/common/Input';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine((val) => val === true, 'You must agree to the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await authService.register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobileNumber: data.mobileNumber,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
      });
      if (response.success) {
        router.push('/auth/login');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-8">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">SmartLoan</h1>
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">Create Your Account</h2>

        {serverError && (
          <div className="mb-4 p-4 bg-error-100 text-error-600 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              placeholder="First name"
              error={errors.firstName}
              {...register('firstName')}
            />
            <Input
              label="Last Name"
              placeholder="Last name"
              error={errors.lastName}
              {...register('lastName')}
            />
          </div>

          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email}
            {...register('email')}
          />

          <Input
            label="Mobile Number"
            placeholder="9876543210"
            error={errors.mobileNumber}
            {...register('mobileNumber')}
          />

          <Input
            label="Date of Birth"
            type="date"
            error={errors.dateOfBirth}
            {...register('dateOfBirth')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register('password')}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword}
            {...register('confirmPassword')}
          />

          <div className="form-group">
            <label className="flex items-center">
              <input
                type="checkbox"
                {...register('agreeToTerms')}
                className="w-4 h-4 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-primary-600 hover:underline">
                  terms and conditions
                </Link>
              </span>
            </label>
            {errors.agreeToTerms && (
              <p className="form-error">{errors.agreeToTerms.message}</p>
            )}
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full">
            Create Account
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-semibold">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
