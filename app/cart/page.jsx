'use client';

import { useCartStore } from '@/store/cartStore';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } =
    useCartStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const totalPrice = getTotalPrice();

  const handleRazorpayPayment = async () => {
    if (cartItems.length === 0) {
      setError('Cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Create order on backend
      const orderResponse = await fetch('/api/razorpay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalPrice,
          currency: 'INR',
          receipt: `order_${Date.now()}`,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderData.success) {
        setError('Failed to create order: ' + orderData.error);
        setLoading(false);
        return;
      }

      const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_1234567890abcd';

      // Initialize Razorpay
      const options = {
        key: keyId,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'ShopHub',
        description: 'E-Commerce Purchase',
        order_id: orderData.data.id,
        handler: function (response) {
          // Payment successful
          alert(
            `Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
          clearCart();
          setLoading(false);
          window.location.href = '/';
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563eb',
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setError('Payment cancelled');
          },
        },
      };

      // Load Razorpay script dynamically
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        if (window.Razorpay) {
          const rzp = new window.Razorpay(options);
          rzp.open();
        } else {
          setError('Failed to load Razorpay. Please refresh and try again.');
          setLoading(false);
        }
      };
      script.onerror = () => {
        setError('Failed to load Razorpay checkout. Check your internet connection.');
        setLoading(false);
      };
      document.body.appendChild(script);
    } catch (err) {
      setError('Error: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Test Mode Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧪</span>
              <div>
                <h3 className="font-bold text-yellow-800">Test Mode Active</h3>
                <p className="text-sm text-yellow-700">
                  Use test card <code className="bg-yellow-100 px-2 py-1 rounded">4111 1111 1111 1111</code> to simulate payments
                </p>
              </div>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-800">
              <p className="font-semibold mb-1">⚠️ {error}</p>
              <p className="text-sm">
                Tip: If you see "404" error, ensure the Razorpay key is valid. You can use test mode with demo cards below.
              </p>
            </div>
          )}

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mb-6">
                Add some products to get started!
              </p>
              <Link
                href="/"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="border-b p-6 flex gap-4 hover:bg-gray-50 transition"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-xl font-bold text-blue-600">
                            ₹{item.price.toFixed(2)}
                          </span>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-gray-200 transition"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 font-semibold min-w-[40px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item._id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-gray-200 transition"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Item Total */}
                          <span className="text-lg font-bold text-gray-800">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                      >
                        <Trash2 className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 border-b pb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping</span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (18%)</span>
                      <span>₹{(totalPrice * 0.18).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-2xl font-bold text-gray-800 mb-6">
                    <span>Total</span>
                    <span className="text-blue-600">
                      ₹{(totalPrice * 1.18).toFixed(2)}
                    </span>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 text-sm text-blue-800">
                    <p className="font-semibold mb-2">💡 Test Mode</p>
                    <p className="mb-2">Use these test cards:</p>
                    <ul className="text-xs space-y-1">
                      <li>💳 Card: 4111 1111 1111 1111</li>
                      <li>📅 Expiry: Any future date</li>
                      <li>🔐 CVV: Any 3 digits</li>
                    </ul>
                  </div>

                  <button
                    onClick={handleRazorpayPayment}
                    disabled={loading || cartItems.length === 0}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin">⏳</div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        Buy Now with Razorpay
                      </>
                    )}
                  </button>

                  <Link
                    href="/"
                    className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
