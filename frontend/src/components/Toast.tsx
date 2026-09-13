import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  show: boolean;
  type?: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  show,
  type = 'success',
  message,
  onClose
}) => {
  if (!show) return null;

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-brand-black text-white shadow-elevated border border-white/10 animate-slide-up max-w-md">
      {type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertCircle className="w-5 h-5 text-brand-red shrink-0" />}
      <span className="text-sm font-medium leading-snug">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto p-1 text-neutral-400 hover:text-white rounded-lg transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
