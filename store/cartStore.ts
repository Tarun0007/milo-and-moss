import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Product, ProductColor } from '@/types/product';
import { CartItem } from '@/types/cart';

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscountPercentage: number;
  
  // Actions
  addItem: (product: Product, quantity?: number, selectedColor?: ProductColor, selectedSize?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Computed helpers
  getSubtotal: () => number;
  getDiscount: () => number;
  getShippingFee: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

const FREE_SHIPPING_THRESHOLD = 999;
const STANDARD_SHIPPING_FEE = 99;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: null,
      promoDiscountPercentage: 0,

      addItem: (product, quantity = 1, selectedColor, selectedSize) => {
        set((state) => {
          const colorKey = selectedColor ? selectedColor.name : 'default';
          const sizeKey = selectedSize || 'default';
          const itemId = `${product.id}-${colorKey}-${sizeKey}`;

          const existingIndex = state.items.findIndex((item) => item.id === itemId);

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex].quantity += quantity;
            return { items: updatedItems };
          } else {
            const newItem: CartItem = {
              id: itemId,
              productId: product.id,
              product,
              quantity,
              selectedColor: selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : undefined),
              selectedSize: selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined),
              price: product.price,
            };
            return { items: [...state.items, newItem] };
          }
        });
      },

      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [], promoCode: null, promoDiscountPercentage: 0 });
      },

      applyPromoCode: (code: string) => {
        const cleanCode = code.trim().toUpperCase();
        if (cleanCode === 'LITTLE10') {
          set({ promoCode: cleanCode, promoDiscountPercentage: 10 });
          return { success: true, message: '10% discount applied!' };
        } else if (cleanCode === 'MOSS20') {
          set({ promoCode: cleanCode, promoDiscountPercentage: 20 });
          return { success: true, message: '20% welcome discount applied!' };
        } else if (cleanCode === 'FIRSTNEST') {
          set({ promoCode: cleanCode, promoDiscountPercentage: 15 });
          return { success: true, message: '15% new parent discount applied!' };
        }
        return { success: false, message: 'Invalid promo code. Try "LITTLE10" or "MOSS20"' };
      },

      removePromoCode: () => {
        set({ promoCode: null, promoDiscountPercentage: 0 });
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      },

      getDiscount: () => {
        const subtotal = get().getSubtotal();
        const percent = get().promoDiscountPercentage;
        return percent > 0 ? Math.round((subtotal * percent) / 100) : 0;
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD) {
          return 0;
        }
        return STANDARD_SHIPPING_FEE;
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },
    }),
    {
      name: 'milo_moss_cart_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
