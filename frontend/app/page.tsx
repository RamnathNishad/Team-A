'use client';

import Link from 'next/link';
import { Header } from '@/components/layouts/Header';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Loans for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Financial Goals</span>
              </h1>
              <p className="text-xl text-gray-600">
                Get instant loan approvals with transparent terms and competitive rates. Apply online in minutes, not hours.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/auth/register" 
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition text-center"
              >
                Apply for Loan
              </Link>
              <Link 
                href="#features" 
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div 
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-white flex items-center justify-center text-white text-sm font-semibold"
                  >
                    {i}K
                  </div>
                ))}
              </div>
              <div>
                <p className="text-gray-900 font-semibold">10,000+ Happy Customers</p>
                <p className="text-gray-600 text-sm">Join our growing community</p>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden md:flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl opacity-10 blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-xl">
                <div className="space-y-6">
                  {/* Card Design */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-gray-600 text-sm">Loan Approved</p>
                        <p className="text-2xl font-bold text-gray-900">₹5,00,000</p>
                      </div>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">✓</span>
                    </div>
                    <div className="border-t pt-4">
                      <p className="text-gray-600 text-xs">EMI: ₹10,500/month</p>
                      <p className="text-gray-600 text-xs">Rate: 10.5% p.a.</p>
                    </div>
                  </div>

                  {/* Calculator Card */}
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <p className="text-gray-900 font-semibold mb-4">Loan Calculator</p>
                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded h-2"></div>
                      <div className="bg-gray-100 rounded h-2 w-4/5"></div>
                      <div className="bg-gray-100 rounded h-2 w-3/4"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose SmartLoan?</h2>
            <p className="text-xl text-gray-600">Experience the easiest way to get a loan</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Approval</h3>
              <p className="text-gray-600">
                Get loan approval within minutes with our advanced AI-powered assessment system. Fast decision-making without delays.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600">
                Enjoy competitive interest rates starting from 8.99% p.a. with transparent terms and no hidden charges.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Secure</h3>
              <p className="text-gray-600">
                Your data is encrypted with bank-level security. We follow strict compliance and privacy standards.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Application</h3>
              <p className="text-gray-600">
                Simple, user-friendly application process. Complete your loan application on any device in just 10 minutes.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Options</h3>
              <p className="text-gray-600">
                Choose from various loan types: Personal, Home, and Auto loans. Flexible tenure from 12 to 240 months.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                24/7 customer support team ready to assist you. Get personalized guidance throughout your loan journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple 4-step process to get your loan</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Sign Up</h3>
                <p className="text-gray-600 text-center text-sm">
                  Create your account with email and basic details in under 2 minutes.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute left-[calc(50%+2rem)] top-8 w-[calc(100%-4rem)] h-1 bg-blue-200 -z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Apply</h3>
                <p className="text-gray-600 text-center text-sm">
                  Fill in your details and select your desired loan amount and tenure.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute left-[calc(50%+2rem)] top-8 w-[calc(100%-4rem)] h-1 bg-blue-200 -z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Verify</h3>
                <p className="text-gray-600 text-center text-sm">
                  Upload required documents. Our system verifies instantly with AI.
                </p>
              </div>
              {/* Connector Line */}
              <div className="hidden md:block absolute left-[calc(50%+2rem)] top-8 w-[calc(100%-4rem)] h-1 bg-blue-200 -z-10"></div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">Get Approved</h3>
                <p className="text-gray-600 text-center text-sm">
                  Receive instant approval and funds directly to your account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Types Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Loan Products</h2>
            <p className="text-xl text-blue-100">Choose the perfect loan for your needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Personal Loan */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-3xl mb-4">💼</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Personal Loan</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Amount: ₹10K - ₹50L
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Rate: From 10.99% p.a.
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Tenure: 12-60 months
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Instant Approval
                </li>
              </ul>
              <Link 
                href="/auth/register?type=personal" 
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition text-center block"
              >
                Apply Now
              </Link>
            </div>

            {/* Home Loan */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition md:scale-105">
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-2 rounded-t-xl text-sm font-semibold">
                MOST POPULAR
              </div>
              <div className="text-3xl mb-4 pt-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Home Loan</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Amount: ₹5L - 1Cr+
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Rate: From 6.50% p.a.
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Tenure: 60-240 months
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Low Interest Rates
                </li>
              </ul>
              <Link 
                href="/auth/register?type=home" 
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition text-center block"
              >
                Apply Now
              </Link>
            </div>

            {/* Auto Loan */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl transition">
              <div className="text-3xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Auto Loan</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Amount: ₹1L - 20L
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Rate: From 7.99% p.a.
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Tenure: 24-84 months
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                  Quick Processing
                </li>
              </ul>
              <Link 
                href="/auth/register?type=auto" 
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition text-center block"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of customers who have already achieved their financial goals with SmartLoan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/auth/register" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition text-center"
            >
              Apply for Loan Now
            </Link>
            <Link 
              href="/auth/login" 
              className="px-8 py-4 border-2 border-gray-400 text-gray-300 font-semibold rounded-lg hover:border-white hover:text-white transition text-center"
            >
              Already a Member? Login
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-white font-bold mb-4">SmartLoan</h4>
              <p className="text-sm">Making loans simple and accessible for everyone.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Personal Loan</Link></li>
                <li><Link href="#" className="hover:text-white transition">Home Loan</Link></li>
                <li><Link href="#" className="hover:text-white transition">Auto Loan</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition">Security</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">© 2026 SmartLoan. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition">Facebook</Link>
              <Link href="#" className="hover:text-white transition">Twitter</Link>
              <Link href="#" className="hover:text-white transition">LinkedIn</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
