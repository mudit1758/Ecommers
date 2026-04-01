'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, ShoppingCart, Check } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/Navbar';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const signup = useAuthStore((state) => state.signup);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const { name, email, password, confirmPassword } = formData;

    // Validate inputs
    if (!name.trim()) {
      setError('Name is required');
      setIsLoading(false);
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    // Attempt signup
    const result = signup(email, password, name);

    if (result.success) {
      setTimeout(() => {
        router.push('/');
      }, 500);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  // Password strength indicator
  const getPasswordStrength = () => {
    const password = formData.password;
    if (password.length === 0) return null;
    if (password.length < 6) return { text: 'Weak', color: 'text-red-600', bg: 'bg-red-100' };
    if (password.length < 10) return { text: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'Strong', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const strength = getPasswordStrength();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-3 rounded-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-800">ShopHub</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
            <p className="text-gray-600">Join ShopHub and start shopping today</p>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {strength && (
                  <div className={`mt-2 px-3 py-1 rounded text-xs font-semibold ${strength.bg} ${strength.color}`}>
                    Password strength: {strength.text}
                  </div>
                )}
              </div>

              {/* Confirm Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                  {formData.password && formData.confirmPassword === formData.password && (
                    <Check className="absolute right-3 top-3 w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 mt-6">
                <input
                  type="checkbox"
                  id="terms"
                  defaultChecked
                  className="mt-1 w-4 h-4 accent-blue-600 rounded"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin">⏳</div>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Signup Buttons */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button className="border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <span className="text-xl">🔵</span>
                <span className="text-sm font-medium">Facebook</span>
              </button>
              <button className="border border-gray-300 rounded-lg py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                <span className="text-xl">🔴</span>
                <span className="text-sm font-medium">Google</span>
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-blue-600 hover:text-blue-700 font-bold"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-sm text-blue-800">
            <p>🔒 Your data is secure and encrypted</p>
          </div>
        </div>
      </main>
    </>
  );
}
