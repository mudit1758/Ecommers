'use client';

import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ShoppingCart, Package, MapPin, Clock } from 'lucide-react';

export default function OrdersPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  // Mock orders data
  const orders = [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h1>

          {orders.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Orders Yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't placed any orders yet. Start shopping now!
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Order #{order.id}</h3>
                      <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                        <Clock className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-lg font-semibold ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-gray-600 mb-2">Items: {order.items}</p>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin className="w-4 h-4" />
                      {order.address}
                    </div>
                  </div>

                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">₹{order.total.toFixed(2)}</span>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
