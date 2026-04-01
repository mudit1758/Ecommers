'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Loader } from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await fetch('/api/products');
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          setError('Failed to fetch products');
        }
      } catch (err) {
        setError('Error fetching products: ' + err.message);
        // Fallback sample data for demo
        setProducts([
          {
            _id: '1',
            title: 'Wireless Headphones',
            description: 'High-quality wireless headphones with noise cancellation',
            price: 4999,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
            rating: 4.5,
          },
          {
            _id: '2',
            title: 'Smart Watch',
            description: 'Advanced fitness tracking with heart rate monitor',
            price: 12999,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
            rating: 4,
          },
          {
            _id: '3',
            title: 'Camera Pro',
            description: 'Professional-grade digital camera for photography',
            price: 34999,
            image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=500&h=500&fit=crop',
            rating: 4.8,
          },
          {
            _id: '4',
            title: 'Laptop Stand',
            description: 'Ergonomic laptop stand for better posture',
            price: 1999,
            image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
            rating: 4.3,
          },
          {
            _id: '5',
            title: 'USB-C Cable',
            description: 'Fast charging USB-C cable with durability',
            price: 499,
            image: 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop',
            rating: 4.2,
          },
          {
            _id: '6',
            title: 'Mechanical Keyboard',
            description: 'RGB mechanical keyboard with cherry switches',
            price: 7999,
            image: 'https://images.unsplash.com/photo-1587829191301-b5044e2b04d7?w=500&h=500&fit=crop',
            rating: 4.6,
          },
          {
            _id: '7',
            title: 'Mouse Pad XL',
            description: 'Large gaming mouse pad with non-slip base',
            price: 799,
            image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
            rating: 4.1,
          },
          {
            _id: '8',
            title: 'Portable Charger',
            description: '20000mAh power bank with fast charging',
            price: 2499,
            image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop',
            rating: 4.4,
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to ShopHub</h1>
            <p className="text-xl text-blue-100">
              Discover amazing products at unbeatable prices
            </p>
          </div>
        </section>

        {/* Products Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Products</h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <Loader className="w-12 h-12 text-blue-600 animate-spin" />
            </div>
          ) : error && products.length === 0 ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
              <p>{error}</p>
              <p className="text-sm mt-2">Showing demo products below:</p>
            </div>
          ) : null}

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">
              <p className="text-lg">No products available at the moment</p>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white mt-12 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 ShopHub. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
