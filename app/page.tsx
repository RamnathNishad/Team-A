import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary-600">SmartLoan</div>
          <div className="space-x-4">
            <Link href="/auth/login" className="text-gray-600 hover:text-primary-600">
              Login
            </Link>
            <Link
              href="/auth/register"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">Smart Loans, Made Simple</h1>
        <p className="text-xl text-gray-600 mb-8">
          Get approved for your loan in minutes, not days. Fast, transparent, and secure.
        </p>
        <Link
          href="/auth/register"
          className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Get Started Now
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose SmartLoan?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Fast Approval', desc: 'Get approved in 24-48 hours' },
            { title: 'Easy Application', desc: 'Simple online application process' },
            { title: 'Transparent', desc: 'No hidden charges or surprises' },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
