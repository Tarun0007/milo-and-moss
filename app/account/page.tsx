import React from 'react';
import { AccountDashboard } from '@/components/account/AccountDashboard';

export const metadata = {
  title: 'Your Account & Orders | MILO & MOSS',
  description: 'Manage your profile, child milestone preferences, delivery addresses, and past order history.',
};

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3]">
      <AccountDashboard />
    </div>
  );
}
