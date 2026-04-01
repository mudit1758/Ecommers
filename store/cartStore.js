import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const { cartItems } = get();
        const existingItem = cartItems.find((item) => item._id === product._id);

        if (existingItem) {
          set({
            cartItems: cartItems.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...cartItems, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item._id === productId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ cartItems: [] });
      },

      getTotalPrice: () => {
        const { cartItems } = get();
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getCartCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
