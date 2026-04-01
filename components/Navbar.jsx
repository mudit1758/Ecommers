'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, Search, User, LogOut, Settings } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());
  const { user, isLoggedIn, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="w-8 h-8" />
              <span>ShopHub</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="w-full bg-white rounded-lg px-4 py-2 flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>

          {/* Right side - Cart, Auth, Menu */}
          <div className="flex items-center gap-6">
            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 hover:opacity-80 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Desktop Auth Buttons - Visible on md and up */}
            {!isLoggedIn && (
              <div className="hidden md:flex gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-white hover:bg-blue-700 rounded-lg transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* User Profile Dropdown - Visible when logged in */}
            {isLoggedIn && user && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:bg-blue-700 px-3 py-2 rounded-lg transition"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-sm font-semibold hidden lg:inline">{user.name}</span>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Link>
                    <Link
                      href="/orders"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      My Orders
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-50 text-red-600 transition border-t"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {/* Mobile Search */}
            <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-gray-800 placeholder-gray-500"
              />
            </div>

            {/* Mobile Navigation Links */}
            <Link href="/" className="block py-2 hover:bg-blue-700 px-4 rounded">
              Home
            </Link>
            <Link href="/cart" className="block py-2 hover:bg-blue-700 px-4 rounded">
              Cart
            </Link>

            {/* Mobile Auth Links */}
            {!isLoggedIn ? (
              <>
                <Link
                  href="/login"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <div className="px-4 py-2 border-t border-blue-500">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-blue-100">{user.email}</p>
                </div>
                <Link
                  href="/profile"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  My Orders
                </Link>
                <Link
                  href="/settings"
                  className="block py-2 hover:bg-blue-700 px-4 rounded"
                >
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 hover:bg-blue-700 px-4 rounded text-red-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
