'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <CheckCircle className="w-24 h-24 text-green-600 mx-auto mb-6 animate-bounce" />
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped soon.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <p className="text-sm text-gray-600 mb-2">Order Number</p>
          <p className="text-2xl font-bold text-blue-600">
            ORD-{Date.now()}
          </p>
        </div>

        <p className="text-gray-600 mb-8">
          You will receive an email confirmation shortly with tracking details.
        </p>

        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors mb-4"
        >
          Continue Shopping
        </Link>

        <div className="text-gray-600 text-sm">
          <p>Need help? Contact us at support@shophub.com</p>
        </div>
      </div>
    </div>
  );
}
