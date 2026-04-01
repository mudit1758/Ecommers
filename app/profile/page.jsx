'use client';

import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Mail, Calendar, Edit } from 'lucide-react';

export default function ProfilePage() {
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

          {/* Profile Card */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            {/* Profile Header */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
                <p className="text-gray-600 mt-2">{user.email}</p>
                <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Profile Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <p className="text-xl text-gray-800 mt-2">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Email Address</label>
                <div className="flex items-center gap-2 mt-2 text-xl text-gray-800">
                  <Mail className="w-5 h-5" />
                  {user.email}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Member Since</label>
                <div className="flex items-center gap-2 mt-2 text-xl text-gray-800">
                  <Calendar className="w-5 h-5" />
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Account Status</label>
                <p className="text-xl text-green-600 font-semibold mt-2">✓ Active</p>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Orders</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">0</p>
              <a href="/orders" className="text-blue-600 hover:text-blue-700 font-semibold">
                View Orders →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Addresses</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">0</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                Manage →
              </a>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Wishlist</h3>
              <p className="text-4xl font-bold text-blue-600 mb-4">0</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
                View Wishlist →
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
