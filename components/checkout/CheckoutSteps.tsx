'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Plus,
  ShoppingBag,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAccountStore } from '@/store/accountStore';
import { useUIStore } from '@/store/uiStore';
import { Order } from '@/types/cart';
import { formatPrice } from '@/lib/utils';

export function CheckoutSteps() {
  const { items, getSubtotal, getDiscount, getShippingFee, clearCart } = useCartStore();
  const { addresses, addAddress, addOrder } = useAccountStore();
  const { showToast } = useUIStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses.length > 0 ? addresses[0].id : ''
  );
  const [deliveryOption, setDeliveryOption] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('parent@okaxis');
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  // New address form state
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrStreet, setNewAddrStreet] = useState('');
  const [newAddrCity, setNewAddrCity] = useState('');
  const [newAddrState, setNewAddrState] = useState('Karnataka');
  const [newAddrPincode, setNewAddrPincode] = useState('');

  const subtotal = getSubtotal();
  const discount = getDiscount();
  const baseShipping = getShippingFee();
  const expressFee = deliveryOption === 'express' ? 149 : 0;
  const shippingTotal = baseShipping + expressFee;
  const finalTotal = Math.max(0, subtotal - discount + shippingTotal);

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrStreet || !newAddrPincode) return;

    addAddress({
      fullName: newAddrName,
      phone: newAddrPhone,
      street: newAddrStreet,
      city: newAddrCity || 'Bengaluru',
      state: newAddrState || 'Karnataka',
      pincode: newAddrPincode,
      isDefault: false,
      type: 'home',
    });

    setShowNewAddressForm(false);
    showToast('Address added successfully', 'success');
  };

  const handlePlaceOrder = () => {
    const orderId = `MM-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...items],
      subtotal,
      discount,
      shippingFee: shippingTotal,
      total: finalTotal,
      shippingAddress: selectedAddress || {
        id: 'mock',
        fullName: 'Aanya Sharma',
        phone: '+91 98765 43210',
        street: '402, Green Glen Layout',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560103',
        isDefault: true,
        type: 'home',
      },
      paymentMethod,
      paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
      status: 'Confirmed',
      estimatedDelivery: deliveryOption === 'express' ? 'Tomorrow, by 8 PM' : 'In 3 business days',
    };

    addOrder(newOrder);
    setCreatedOrderId(orderId);
    clearCart();
    setIsSuccess(true);

    // Burst celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#23483B', '#B9D5C4', '#F3C6B3', '#F4E4A5'],
      });
    } catch {
      // safe fallback
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center animate-in zoom-in-95 duration-300">
        <div className="w-20 h-20 rounded-full bg-[#B9D5C4]/40 text-[#23483B] flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="text-xs font-semibold uppercase tracking-wider text-[#7A807A]">
          Demo Checkout Complete
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-[#23483B] mt-1.5 mb-2">
          Thank you for your order!
        </h2>
        <p className="text-sm text-[#7A807A] max-w-md mx-auto mb-6">
          Order reference <strong className="text-[#23483B]">{createdOrderId}</strong> has been confirmed. A confirmation receipt has been simulated to your email.
        </p>

        <div className="p-6 rounded-3xl bg-white border border-[#E7E4DC] shadow-card text-left space-y-4 mb-8">
          <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E7E4DC]">
            <span className="text-[#7A807A]">Order ID:</span>
            <span className="font-mono font-bold text-[#23483B]">{createdOrderId}</span>
          </div>
          <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E7E4DC]">
            <span className="text-[#7A807A]">Delivery Address:</span>
            <span className="text-right font-medium text-[#252822]">
              {selectedAddress ? `${selectedAddress.fullName}, ${selectedAddress.city} (${selectedAddress.pincode})` : 'Bengaluru Hub'}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs pb-3 border-b border-[#E7E4DC]">
            <span className="text-[#7A807A]">Payment Method:</span>
            <span className="font-semibold text-[#23483B]">{paymentMethod} (Demo Processed)</span>
          </div>
          <div className="flex justify-between items-center text-sm font-semibold text-[#23483B]">
            <span>Total Paid:</span>
            <span>{formatPrice(finalTotal)}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/account"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors shadow-sm"
          >
            View in Account & Orders
          </Link>
          <Link
            href="/shop"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white border border-[#E7E4DC] text-xs font-semibold text-[#252822] hover:bg-[#FAF8F3] transition-colors"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#B9D5C4]/30 flex items-center justify-center text-[#23483B] mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-heading text-2xl font-bold tracking-tight text-[#23483B]">Your bag is empty</h2>
        <p className="text-xs text-[#7A807A]">
          Please add products to your shopping bag before proceeding to checkout.
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors"
        >
          <span>Explore Catalog</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Demo Notice Banner */}
      <div className="mb-8 p-3.5 rounded-2xl bg-[#F4E4A5]/30 border border-[#F4E4A5] flex items-center justify-between text-xs text-[#23483B]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#23483B]" />
          <span><strong>Prototype Notice:</strong> This is a frontend demo checkout. No real cards or actual money are charged.</span>
        </div>
        <span className="font-mono text-[0.6875rem] bg-white px-2 py-0.5 rounded-md border border-[#F4E4A5]">
          TEST MODE
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 Cols: Multi-step checkout form */}
        <div className="lg:col-span-8 space-y-6">
          {/* Step 1: Shipping Address */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#23483B] text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B]">
                  Delivery Address
                </h3>
              </div>
              <button
                onClick={() => setShowNewAddressForm(!showNewAddressForm)}
                className="text-xs font-semibold text-[#23483B] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showNewAddressForm ? 'Cancel' : 'Add New'}</span>
              </button>
            </div>

            {/* Saved addresses list */}
            {!showNewAddressForm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-colors ${
                      selectedAddressId === addr.id
                        ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                        : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-[#252822] mb-1">
                      <span>{addr.fullName}</span>
                      <span className="text-[0.625rem] uppercase px-2 py-0.5 rounded-full bg-white border border-[#E7E4DC] text-[#7A807A]">
                        {addr.type}
                      </span>
                    </div>
                    <p className="text-xs text-[#7A807A] leading-relaxed">
                      {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-[0.6875rem] text-[#7A807A] mt-2 font-mono">
                      Phone: {addr.phone}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSaveAddress} className="space-y-3 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Parent Full Name"
                    value={newAddrName}
                    onChange={(e) => setNewAddrName(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={newAddrPhone}
                    onChange={(e) => setNewAddrPhone(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Street Address, Flat / Apartment No."
                  value={newAddrStreet}
                  onChange={(e) => setNewAddrStreet(e.target.value)}
                  className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                />
                <div className="grid grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={newAddrCity}
                    onChange={(e) => setNewAddrCity(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                  <input
                    type="text"
                    required
                    placeholder="State"
                    value={newAddrState}
                    onChange={(e) => setNewAddrState(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="6-digit Pincode"
                    value={newAddrPincode}
                    onChange={(e) => setNewAddrPincode(e.target.value)}
                    className="text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] bg-[#FAF8F3]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C]"
                >
                  Save Address
                </button>
              </form>
            )}
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-card">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#23483B] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B]">
                Delivery Option
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  deliveryOption === 'standard'
                    ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                    : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                }`}
              >
                <input
                  type="radio"
                  name="deliverySpeed"
                  checked={deliveryOption === 'standard'}
                  onChange={() => setDeliveryOption('standard')}
                  className="mt-0.5 text-[#23483B] focus:ring-[#23483B]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#252822]">Standard Doorstep Delivery</span>
                    <span className="text-[0.625rem] font-bold text-[#23483B] px-2 py-0.5 rounded-full bg-[#B9D5C4]/40">
                      {baseShipping === 0 ? 'FREE' : formatPrice(baseShipping)}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A807A] mt-0.5">Estimated 2 to 4 business days in eco-packaging</p>
                </div>
              </label>

              <label
                className={`p-4 rounded-2xl border cursor-pointer flex items-start gap-3 transition-colors ${
                  deliveryOption === 'express'
                    ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                    : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                }`}
              >
                <input
                  type="radio"
                  name="deliverySpeed"
                  checked={deliveryOption === 'express'}
                  onChange={() => setDeliveryOption('express')}
                  className="mt-0.5 text-[#23483B] focus:ring-[#23483B]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#252822]">Priority Next-Day Air</span>
                    <span className="text-[0.625rem] font-bold text-[#23483B] px-2 py-0.5 rounded-full bg-[#F4E4A5]/60">
                      +₹149
                    </span>
                  </div>
                  <p className="text-xs text-[#7A807A] mt-0.5">Delivered tomorrow by 8 PM for urgent essentials</p>
                </div>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7E4DC] shadow-card">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-full bg-[#23483B] text-white text-xs font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-heading text-xl font-bold tracking-tight text-[#23483B]">
                Payment Method (Demo)
              </h3>
            </div>

            <div className="space-y-3">
              {/* Option 1: Demo UPI */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer block transition-colors ${
                  paymentMethod === 'UPI'
                    ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                    : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'UPI'}
                      onChange={() => setPaymentMethod('UPI')}
                      className="text-[#23483B] focus:ring-[#23483B]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#252822]">Instant UPI (GPay / PhonePe / Paytm)</span>
                      <p className="text-[0.6875rem] text-[#7A807A]">Zero surcharge, instant confirmation</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#23483B] bg-white px-2 py-1 rounded-md border border-[#E7E4DC]">
                    UPI
                  </span>
                </div>
                {paymentMethod === 'UPI' && (
                  <div className="mt-3 pt-3 border-t border-[#E7E4DC] flex items-center gap-2">
                    <input
                      type="text"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="demo@upi"
                      className="text-xs px-3 py-2 rounded-xl border border-[#E7E4DC] bg-white text-[#252822] w-64"
                    />
                    <span className="text-[0.6875rem] text-[#7A807A]">Auto-verified demo VPA</span>
                  </div>
                )}
              </label>

              {/* Option 2: Demo Card */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer block transition-colors ${
                  paymentMethod === 'Card'
                    ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                    : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="text-[#23483B] focus:ring-[#23483B]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#252822]">Credit / Debit Card (Demo)</span>
                      <p className="text-[0.6875rem] text-[#7A807A]">Visa, Mastercard, RuPay, Amex</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#23483B] bg-white px-2 py-1 rounded-md border border-[#E7E4DC]">
                    CARD
                  </span>
                </div>
                {paymentMethod === 'Card' && (
                  <div className="mt-3 pt-3 border-t border-[#E7E4DC] grid grid-cols-2 gap-2 text-xs">
                    <input
                      type="text"
                      disabled
                      value="•••• •••• •••• 4242 (Demo)"
                      className="px-3 py-2 rounded-xl border border-[#E7E4DC] bg-white text-[#7A807A]"
                    />
                    <input
                      type="text"
                      disabled
                      value="Expires 12/28"
                      className="px-3 py-2 rounded-xl border border-[#E7E4DC] bg-white text-[#7A807A]"
                    />
                  </div>
                )}
              </label>

              {/* Option 3: COD */}
              <label
                className={`p-4 rounded-2xl border cursor-pointer block transition-colors ${
                  paymentMethod === 'Cash on Delivery'
                    ? 'border-[#23483B] bg-[#FAF8F3] ring-1 ring-[#23483B]'
                    : 'border-[#E7E4DC] hover:border-[#B9D5C4]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="text-[#23483B] focus:ring-[#23483B]"
                    />
                    <div>
                      <span className="text-xs font-semibold text-[#252822]">Cash on Delivery</span>
                      <p className="text-[0.6875rem] text-[#7A807A]">Pay with cash or QR scan at doorstep</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#23483B] bg-white px-2 py-1 rounded-md border border-[#E7E4DC]">
                    COD
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Order Summary & Place Order */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-3xl p-6 border border-[#E7E4DC] shadow-card sticky top-24 space-y-4">
            <h3 className="font-heading text-lg font-bold text-[#23483B] pb-3 border-b border-[#E7E4DC]">
              Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Thumbnail items list preview */}
            <div className="max-h-56 overflow-y-auto space-y-3 no-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#FAF8F3] flex-shrink-0">
                    <Image src={item.product.images[0]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-medium text-[#252822] truncate">{item.product.name}</h5>
                    <span className="text-[0.6875rem] text-[#7A807A]">Qty: {item.quantity}</span>
                  </div>
                  <span className="text-xs font-semibold text-[#23483B]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="pt-3 border-t border-[#E7E4DC] space-y-2 text-xs text-[#7A807A]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#252822]">{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[#23483B]">
                  <span>Promotional Discount</span>
                  <span className="font-medium">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-medium text-[#252822]">
                  {shippingTotal === 0 ? <span className="text-[#23483B] font-semibold">FREE</span> : formatPrice(shippingTotal)}
                </span>
              </div>
              <div className="flex justify-between text-base font-bold text-[#23483B] pt-2 border-t border-[#E7E4DC]">
                <span>Total Payable</span>
                <span>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-full bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors shadow-md flex items-center justify-center gap-2 group"
            >
              <span>Place Demo Order ({formatPrice(finalTotal)})</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <div className="text-center pt-1 text-[0.6875rem] text-[#7A807A] flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#23483B]" />
              <span>Safe & simulated 256-bit SSL encrypted demo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
