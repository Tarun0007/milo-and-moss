import { create } from 'zustand';
import { Product } from '@/types/product';

interface ToastData {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface UIState {
  isMiniCartOpen: boolean;
  setMiniCartOpen: (open: boolean) => void;
  
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  isMobileNavOpen: boolean;
  setMobileNavOpen: (open: boolean) => void;

  toasts: ToastData[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMiniCartOpen: false,
  setMiniCartOpen: (open) => set({ isMiniCartOpen: open }),

  isSearchOpen: false,
  setSearchOpen: (open) => set({ isSearchOpen: open }),

  quickViewProduct: null,
  setQuickViewProduct: (product) => set({ quickViewProduct: product }),

  isMobileNavOpen: false,
  setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),

  toasts: [],
  showToast: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3800);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
