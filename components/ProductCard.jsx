'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Star, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';

export default function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product);
    window.location.href = '/cart';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(Math.floor(product.rating))].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
              />
            ))}
            {product.rating % 1 !== 0 && (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50" />
            )}
          </div>
          <span className="text-sm text-gray-600">({product.rating})</span>
        </div>

        {/* Price and Buttons */}
        <div className="space-y-3">
          <span className="text-2xl font-bold text-blue-600 block">
            ₹{product.price.toFixed(2)}
          </span>
          
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Add</span>
            </button>

            <Link
              href="/cart"
              onClick={handleBuyNow}
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white rounded-lg p-2 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Buy</span>
            </Link>
          </div>
        </div>

        {/* Added Message */}
        {addedMessage && (
          <div className="mt-2 text-center text-green-600 text-sm font-semibold">
            ✓ Added to Cart
          </div>
        )}
      </div>
    </div>
  );
}
