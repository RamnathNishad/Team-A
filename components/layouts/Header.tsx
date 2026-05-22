'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💳</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:inline">SmartLoan</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-700 hover:text-blue-600 font-medium transition">
              How It Works
            </Link>
            <Link href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login" 
              className="px-6 py-2 text-gray-700 font-medium hover:text-blue-600 transition"
            >
              Sign In
            </Link>
            <Link 
              href="/auth/register" 
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col space-y-1.5 focus:outline-none"
          >
            <span className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-gray-900 transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
            <Link href="#features" className="block text-gray-700 hover:text-blue-600 font-medium">
              Features
            </Link>
            <Link href="#how-it-works" className="block text-gray-700 hover:text-blue-600 font-medium">
              How It Works
            </Link>
            <Link href="#" className="block text-gray-700 hover:text-blue-600 font-medium">
              About
            </Link>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Link 
                href="/auth/login" 
                className="px-4 py-2 text-center text-gray-700 font-medium hover:text-blue-600 transition"
              >
                Sign In
              </Link>
              <Link 
                href="/auth/register" 
                className="px-4 py-2 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:shadow-lg transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
