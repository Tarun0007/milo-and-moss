import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Address, Order } from '@/types/cart';

interface AccountState {
  profile: {
    name: string;
    email: string;
    phone: string;
    childName: string;
    childAge: string;
    childBirthday: string;
  };
  addresses: Address[];
  orders: Order[];
  
  updateProfile: (data: Partial<AccountState['profile']>) => void;
  addAddress: (address: Omit<Address, 'id'>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  addOrder: (order: Order) => void;
}

export const useAccountStore = create<AccountState>()(
  persist(
    (set, get) => ({
      profile: {
        name: 'Aanya Sharma',
        email: 'aanya.sharma@example.com',
        phone: '+91 98765 43210',
        childName: 'Reyan',
        childAge: '8 months',
        childBirthday: '2026-03-15',
      },
      addresses: [
        {
          id: 'addr-1',
          fullName: 'Aanya Sharma',
          phone: '+91 98765 43210',
          street: '402, Green Glen Layout, Bellandur',
          apartment: 'Palm Springs Apts',
          city: 'Bengaluru',
          state: 'Karnataka',
          pincode: '560103',
          isDefault: true,
          type: 'home',
        },
      ],
      orders: [
        {
          id: 'MM-98241',
          date: '12 Nov 2026',
          items: [],
          subtotal: 2498,
          discount: 249,
          shippingFee: 0,
          total: 2249,
          shippingAddress: {
            id: 'addr-1',
            fullName: 'Aanya Sharma',
            phone: '+91 98765 43210',
            street: '402, Green Glen Layout, Bellandur',
            city: 'Bengaluru',
            state: 'Karnataka',
            pincode: '560103',
            isDefault: true,
            type: 'home',
          },
          paymentMethod: 'UPI',
          paymentStatus: 'Paid',
          status: 'Delivered',
          estimatedDelivery: '15 Nov 2026',
        },
      ],

      updateProfile: (data) => {
        set((state) => ({
          profile: { ...state.profile, ...data },
        }));
      },

      addAddress: (addressData) => {
        const id = `addr-${Date.now()}`;
        const newAddress: Address = { ...addressData, id };
        set((state) => ({
          addresses: [...state.addresses, newAddress],
        }));
      },

      deleteAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.filter((a) => a.id !== id),
        }));
      },

      setDefaultAddress: (id) => {
        set((state) => ({
          addresses: state.addresses.map((a) => ({
            ...a,
            isDefault: a.id === id,
          })),
        }));
      },

      addOrder: (order) => {
        set((state) => ({
          orders: [order, ...state.orders],
        }));
      },
    }),
    {
      name: 'milo_moss_account_v1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
