import { Product, ProductColor } from './product';

export interface CartItem {
  id: string; // unique item id (productId + color + size)
  productId: string;
  product: Product;
  quantity: number;
  selectedColor?: ProductColor;
  selectedSize?: string;
  price: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  apartment?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  type: 'home' | 'work';
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'UPI' | 'Card' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  status: 'Processing' | 'Confirmed' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}
