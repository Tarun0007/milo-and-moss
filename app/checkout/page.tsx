import React from 'react';
import { CheckoutSteps } from '@/components/checkout/CheckoutSteps';

export const metadata = {
  title: 'Secure Demo Checkout | MILO & MOSS',
  description: 'Complete your demo order with mock UPI, cards, and doorstep delivery simulation.',
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <CheckoutSteps />
    </div>
  );
}
