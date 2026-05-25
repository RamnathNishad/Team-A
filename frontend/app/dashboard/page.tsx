'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { Header } from '@/components/layouts/Header';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, router]);

  const handleLogout = async () => {
    try {
      // Call logout API
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      router.push('/');
    }
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome, {user?.name || user?.email}!</h1>
              <p className="text-gray-600">Here's your SmartLoan dashboard</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Active Loans</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Loan Amount</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">₹0</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Pending Applications</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
              </div>
              <div className="text-4xl">⏳</div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Account Status</p>
                <p className="text-2xl font-bold text-green-600 mt-2">Active ✓</p>
              </div>
              <div className="text-4xl">✅</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/applications"
              className="p-6 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
            >
              <div className="text-4xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Apply for Loan</h3>
              <p className="text-sm text-gray-600">Start a new loan application</p>
            </Link>

            <Link
              href="/profile"
              className="p-6 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
            >
              <div className="text-4xl mb-3">👤</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile</h3>
              <p className="text-sm text-gray-600">Update your profile information</p>
            </Link>

            <Link
              href="/"
              className="p-6 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition text-center"
            >
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Home</h3>
              <p className="text-sm text-gray-600">Back to homepage</p>
            </Link>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Applications</h2>
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-600 mb-4">No applications yet</p>
            <Link
              href="/applications"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition"
            >
              Create Your First Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
