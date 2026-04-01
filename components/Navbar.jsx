'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ShoppingCart, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = useCartStore((state) => state.getCartCount());

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

          {/* Cart Icon */}
          <div className="flex items-center gap-6">
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
            <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full outline-none text-gray-800 placeholder-gray-500"
              />
            </div>
            <Link href="/" className="block py-2 hover:bg-blue-700 px-4 rounded">
              Home
            </Link>
            <Link href="/cart" className="block py-2 hover:bg-blue-700 px-4 rounded">
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
