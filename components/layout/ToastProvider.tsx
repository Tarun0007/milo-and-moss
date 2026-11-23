'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export function ToastProvider() {
  const { toasts, removeToast } = useUIStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#23483B] text-[#FAF8F3] shadow-float border border-[#FAF8F3]/10 animate-in slide-in-from-bottom-3 duration-300"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-4 h-4 text-[#B9D5C4] flex-shrink-0" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-4 h-4 text-[#F3C6B3] flex-shrink-0" />
            )}
            {toast.type === 'info' && (
              <Info className="w-4 h-4 text-[#D8E5F0] flex-shrink-0" />
            )}
            <span className="text-xs font-medium leading-snug line-clamp-2">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            aria-label="Dismiss toast"
            className="p-1 rounded-full text-white/60 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
