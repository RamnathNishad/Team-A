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

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setServerError(null);
    try {
      const response = await authService.login(data);
      if (response.success) {
        router.push('/dashboard');
      }
    } catch (error: any) {
      setServerError(error.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-6">SmartLoan</h1>
        <h2 className="text-xl font-semibold text-center mb-6 text-gray-700">Login to Your Account</h2>

        {serverError && (
          <div className="mb-4 p-4 bg-error-100 text-error-600 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            error={errors.email}
            {...register('email')}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password}
            {...register('password')}
          />

          <Button type="submit" isLoading={isLoading} className="w-full">
            Login
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-semibold">
            Register here
          </Link>
        </div>

        <div className="mt-4 text-center text-sm">
          <Link href="/auth/forgot-password" className="text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
