import React, { useState, useEffect } from 'react';
import { X, Phone, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from './Button';
import { generateWhatsAppUrl } from '../lib/whatsapp';
import { submitEnquiry } from '../lib/api';

export interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string;
  defaultRequirement?: string;
  onSuccess?: (msg: string) => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultProduct = '',
  defaultRequirement = 'Office Seating Enquiry',
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState(defaultRequirement);
  const [product, setProduct] = useState(defaultProduct);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProduct(defaultProduct);
      setRequirement(defaultRequirement);
      setIsSubmitted(false);
      setError('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, defaultProduct, defaultRequirement]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name,
        phone,
        requirement,
        product,
        message,
        source: 'website_modal'
      });
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess('Thank you! Your enquiry has been received. We will contact you promptly.');
      }
    } catch (err) {
      setError('Unable to submit enquiry. Please try WhatsApp or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDirectWhatsApp = () => {
    const url = generateWhatsAppUrl({
      customerName: name,
      productName: product || undefined,
      requirement: requirement || undefined
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-elevated border border-black/10 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-neutral-100 bg-brand-offwhite">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-1">
              Direct Business Enquiry
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight">
              {product ? `Enquire: ${product}` : "Request a Quotation"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full text-neutral-400 hover:text-brand-black hover:bg-black/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-brand-black">Enquiry Received</h4>
              <p className="text-sm text-brand-muted max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-semibold text-brand-black">{name}</span>. The Balaji Chairs team at Unnao will review your specifications and get in touch with pricing shortly.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" size="sm" onClick={onClose}>
                  Close Window
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleDirectWhatsApp}
                  icon={<MessageCircle className="w-4 h-4" />}
                >
                  Continue on WhatsApp
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-xs font-medium text-red-600 bg-red-50 rounded-xl border border-red-200">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (Calling & WhatsApp) *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-400">
                    +91
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Product / Interest
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Aura High-Back"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Requirement Type
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all text-sm bg-white"
                  >
                    <option value="Single Chair Purchase">Single Chair Purchase</option>
                    <option value="Bulk Office Setup (5+ Chairs)">Bulk Office Setup (5+ Chairs)</option>
                    <option value="Complete Office Furnishing">Complete Office Furnishing</option>
                    <option value="Chair Repair & Service">Chair Repair & Service</option>
                    <option value="Price & Catalog Inquiry">Price & Catalog Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                  Message / Quantity / Dimensions (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Mention number of chairs, office type, or specific questions..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none transition-all text-sm resize-none"
                />
              </div>

              {/* Form Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  isLoading={isSubmitting}
                  icon={<Send className="w-4 h-4" />}
                >
                  Send Enquiry
                </Button>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-neutral-200"></div>
                  <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">Or Instant Chat</span>
                  <div className="flex-grow border-t border-neutral-200"></div>
                </div>

                <button
                  type="button"
                  onClick={handleDirectWhatsApp}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366] text-white text-sm font-semibold tracking-tight hover:bg-[#20bd5a] transition-all shadow-sm active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire via WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
