'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useRedux';
import { authService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await authService.logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary-600">
          SmartLoan
        </Link>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="text-sm">
                <p className="text-gray-600">Welcome, {user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-gray-600 hover:text-primary-600">
                Login
              </Link>
              <Link href="/auth/register" className="btn-primary text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
