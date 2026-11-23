'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  User,
  Package,
  MapPin,
  Heart,
  Baby,
  Trash2,
  ArrowRight,
} from 'lucide-react';
import { useAccountStore } from '@/store/accountStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUIStore } from '@/store/uiStore';
import { formatPrice } from '@/lib/utils';

export function AccountDashboard() {
  const { profile, updateProfile, addresses, orders, deleteAddress } = useAccountStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const { showToast } = useUIStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'preferences'>('orders');

  // Profile edit form state
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [childName, setChildName] = useState(profile.childName);
  const [childAge, setChildAge] = useState(profile.childAge);

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ name, email, phone, childName, childAge });
    showToast('Parent profile and baby preferences updated!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E7E4DC] shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#23483B] text-[#FAF8F3] font-heading text-2xl font-bold flex items-center justify-center">
            {profile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#23483B]">
                Welcome back, {profile.name}
              </h1>
              <span className="text-[0.625rem] font-semibold px-2.5 py-0.5 rounded-full bg-[#B9D5C4]/40 text-[#23483B]">
                Member Parent
              </span>
            </div>
            <p className="text-xs text-[#7A807A] mt-1 flex items-center gap-2">
              <Baby className="w-3.5 h-3.5 text-[#23483B]" />
              <span>Shopping for {profile.childName} ({profile.childAge})</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/wishlist"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E7E4DC] bg-[#FAF8F3] hover:border-[#23483B] text-xs font-semibold text-[#252822] transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-[#23483B]" />
            <span>Wishlist ({wishlistItems.length})</span>
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
          >
            <span>Explore Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main Account Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-3xl p-3 border border-[#E7E4DC] shadow-card space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                activeTab === 'orders'
                  ? 'bg-[#23483B] text-white shadow-sm'
                  : 'text-[#252822] hover:bg-[#FAF8F3]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Orders & Deliveries</span>
              <span className="ml-auto text-[0.625rem] px-2 py-0.5 rounded-full bg-white/20">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                activeTab === 'profile'
                  ? 'bg-[#23483B] text-white shadow-sm'
                  : 'text-[#252822] hover:bg-[#FAF8F3]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Parent Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-[#23483B] text-white shadow-sm'
                  : 'text-[#252822] hover:bg-[#FAF8F3]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses</span>
              <span className="ml-auto text-[0.625rem] px-2 py-0.5 rounded-full bg-black/5">
                {addresses.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('preferences')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-colors ${
                activeTab === 'preferences'
                  ? 'bg-[#23483B] text-white shadow-sm'
                  : 'text-[#252822] hover:bg-[#FAF8F3]'
              }`}
            >
              <Baby className="w-4 h-4" />
              <span>Child & Stage Settings</span>
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        <div className="lg:col-span-9">
          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B]">
                  Your Orders ({orders.length})
                </h3>
                <span className="text-xs text-[#7A807A]">Persistent demo history</span>
              </div>

              {orders.length === 0 ? (
                <div className="p-10 rounded-3xl bg-white border border-[#E7E4DC] text-center space-y-3">
                  <Package className="w-8 h-8 text-[#7A807A] mx-auto" />
                  <p className="text-sm font-medium text-[#252822]">No orders placed yet</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483B] hover:underline"
                  >
                    <span>Browse essentials to place your first order</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-card space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E7E4DC]">
                      <div className="space-y-0.5">
                        <span className="text-[0.625rem] uppercase font-bold tracking-wider text-[#7A807A]">
                          Order Placed
                        </span>
                        <div className="text-xs font-mono font-bold text-[#23483B]">
                          #{order.id} • {order.date}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#B9D5C4]/35 text-[#23483B]">
                          {order.status}
                        </span>
                        <span className="text-xs font-bold text-[#23483B]">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-[#7A807A] flex items-center justify-between">
                      <span>Delivery: {order.estimatedDelivery}</span>
                      <span>Payment: {order.paymentMethod} ({order.paymentStatus})</span>
                    </div>

                    {order.items && order.items.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-[#E7E4DC]/60">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between text-xs">
                            <span className="font-medium text-[#252822]">
                              {item.quantity} × {item.product.name}
                            </span>
                            <span className="text-[#7A807A]">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-card">
              <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B] mb-6">
                Parent Profile Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-xl">
                <div>
                  <label className="text-xs font-semibold text-[#252822] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#252822] block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#252822] block mb-1">Mobile Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
                >
                  Save Profile
                </button>
              </form>
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B] mb-2">
                Saved Addresses
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((a) => (
                  <div
                    key={a.id}
                    className="p-5 rounded-2xl bg-white border border-[#E7E4DC] shadow-card flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[#23483B]">{a.fullName}</span>
                        {a.isDefault && (
                          <span className="text-[0.625rem] font-semibold px-2 py-0.5 rounded-full bg-[#B9D5C4]/40 text-[#23483B]">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#7A807A] leading-relaxed">
                        {a.street}, {a.city}, {a.state} - {a.pincode}
                      </p>
                      <p className="text-[0.6875rem] text-[#7A807A] mt-2 font-mono">
                        Phone: {a.phone}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E7E4DC] flex justify-end">
                      <button
                        onClick={() => deleteAddress(a.id)}
                        className="text-xs text-red-500 hover:underline flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-card space-y-6 max-w-xl">
              <div>
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B]">
                  Child Milestones & Stage Personalization
                </h3>
                <p className="text-xs text-[#7A807A] mt-1">
                  We customize recommended toys, apparel sizes, and feeding guidance to match your child&apos;s current developmental window.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#252822] block mb-1">Child&apos;s Name</label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-[#252822] block mb-1">Age Milestone Stage</label>
                  <select
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  >
                    <option value="0–3 months">Newborn: 0–3 months</option>
                    <option value="3–6 months">Tummy Time: 3–6 months</option>
                    <option value="6–12 months">Sitting & Weaning: 6–12 months</option>
                    <option value="1–2 years">First Steps: 1–2 years</option>
                    <option value="2–4 years">Toddler Playroom: 2–4 years</option>
                    <option value="4–6 years">Active Explorer: 4–6 years</option>
                    <option value="6+ years">Big Wonder: 6+ years</option>
                  </select>
                </div>
                <button
                  onClick={() => {
                    updateProfile({ childName, childAge });
                    showToast('Child milestones saved!', 'success');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
                >
                  Save Child Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
