'use client';

import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bell, Lock, Eye, Volume2, Shield, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoggedIn } = useAuthStore();
  const router = useRouter();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: true,
    orderUpdates: true,
    twoFactorAuth: false,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Settings</h1>

          {/* Notification Preferences */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6" />
              Notification Preferences
            </h2>

            <div className="space-y-4">
              {[
                {
                  key: 'emailNotifications',
                  label: 'Email Notifications',
                  description: 'Receive notifications via email',
                },
                {
                  key: 'pushNotifications',
                  label: 'Push Notifications',
                  description: 'Receive push notifications on your device',
                },
                {
                  key: 'marketingEmails',
                  label: 'Marketing Emails',
                  description: 'Receive promotional offers and updates',
                },
                {
                  key: 'orderUpdates',
                  label: 'Order Updates',
                  description: 'Get notified about order status changes',
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-800">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative w-12 h-7 rounded-full transition-colors ${
                      settings[item.key] ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform ${
                        settings[item.key] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    ></div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Security Settings
            </h2>

            <div className="space-y-4">
              {/* Two Factor Auth */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  {settings.twoFactorAuth ? 'Disable' : 'Enable'}
                </button>
              </div>

              {/* Change Password */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Change Password
                  </p>
                  <p className="text-sm text-gray-600">Update your password regularly for security</p>
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Change
                </button>
              </div>

              {/* Active Sessions */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    Active Sessions
                  </p>
                  <p className="text-sm text-gray-600">Manage devices that are logged into your account</p>
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  View
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Data */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Volume2 className="w-6 h-6" />
              Privacy & Data
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800">Download Your Data</p>
                  <p className="text-sm text-gray-600">Get a copy of your personal data</p>
                </div>
                <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-semibold text-gray-800 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete Account
                  </p>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                  Delete
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <button className="px-6 py-3 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-50 transition font-semibold">
              Cancel
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
