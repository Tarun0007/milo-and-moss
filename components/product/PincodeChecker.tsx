'use client';

import React, { useState } from 'react';
import { MapPin, CheckCircle2, AlertCircle, Truck, Clock } from 'lucide-react';

export function PincodeChecker() {
  const [pincode, setPincode] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
  const [city, setCity] = useState('');

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length !== 6 || !/^\d{6}$/.test(pincode)) {
      setStatus('invalid');
      return;
    }

    setStatus('checking');
    setTimeout(() => {
      // Realistic simulation based on first digit
      const digit = pincode.charAt(0);
      let detectedCity = 'Bengaluru & Metro Hub';
      if (digit === '1') detectedCity = 'Delhi NCR Hub';
      else if (digit === '4') detectedCity = 'Mumbai & Pune Zone';
      else if (digit === '6') detectedCity = 'Chennai & Kochi Region';
      else if (digit === '7') detectedCity = 'Kolkata & Eastern Hub';
      else if (digit === '5') detectedCity = 'Hyderabad & Bengaluru Hub';
      else if (digit === '3') detectedCity = 'Jaipur & Rajasthan Zone';

      setCity(detectedCity);
      setStatus('valid');
    }, 450);
  };

  return (
    <div className="p-4 rounded-2xl bg-white border border-[#E7E4DC] shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-xs font-semibold text-[#252822]">
        <MapPin className="w-4 h-4 text-[#23483B]" />
        <span>Check Delivery & Pincode Availability</span>
      </div>

      <form onSubmit={handleCheck} className="flex gap-2">
        <input
          type="text"
          maxLength={6}
          placeholder="Enter 6-digit Pincode (e.g. 560103)"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, ''));
            if (status !== 'idle') setStatus('idle');
          }}
          className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-[#E7E4DC] focus:outline-none focus:border-[#23483B] bg-[#FAF8F3] font-mono"
        />
        <button
          type="submit"
          disabled={status === 'checking'}
          className="px-4 py-2.5 rounded-xl bg-[#23483B] text-white text-xs font-semibold hover:bg-[#1A362C] transition-colors disabled:opacity-50"
        >
          {status === 'checking' ? 'Checking...' : 'Check'}
        </button>
      </form>

      {status === 'valid' && (
        <div className="space-y-1.5 pt-1 animate-in fade-in">
          <div className="flex items-center gap-1.5 text-xs text-[#23483B] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#23483B]" />
            <span>Delivers to {pincode} ({city})</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[0.6875rem] text-[#7A807A] pt-1">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3 text-[#23483B]" />
              <span>Free Delivery in 2-4 days</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#23483B]" />
              <span>Cash on Delivery Available</span>
            </div>
          </div>
        </div>
      )}

      {status === 'invalid' && (
        <div className="flex items-center gap-1.5 text-xs text-red-500 pt-1">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Please enter a valid 6-digit postal code.</span>
        </div>
      )}
    </div>
  );
}
