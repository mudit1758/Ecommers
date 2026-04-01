'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,

      login: (email, password) => {
        // Mock login - in production, validate against backend
        if (email && password) {
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name: email.split('@')[0],
            createdAt: new Date(),
          };
          set({ user, isLoggedIn: true });
          return { success: true, user };
        }
        return { success: false, error: 'Invalid credentials' };
      },

      signup: (email, password, name) => {
        // Mock signup - in production, save to backend
        if (email && password && name) {
          const user = {
            id: Math.random().toString(36).substr(2, 9),
            email,
            name,
            createdAt: new Date(),
          };
          set({ user, isLoggedIn: true });
          return { success: true, user };
        }
        return { success: false, error: 'All fields are required' };
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      getUser: () => {
        return get().user;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
