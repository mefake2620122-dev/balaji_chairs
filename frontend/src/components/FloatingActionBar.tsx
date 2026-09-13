import React from 'react';
import { Phone, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl } from '../lib/whatsapp';

interface FloatingActionBarProps {
  onOpenEnquiry?: () => void;
}

export const FloatingActionBar: React.FC<FloatingActionBarProps> = ({
  onOpenEnquiry
}) => {
  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl({ requirement: "General Office Seating Inquiry" });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-white/90 backdrop-blur-xl border-t border-black/10 shadow-elevated">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Direct Call Button */}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-black text-white text-xs font-semibold tracking-tight active:scale-[0.98] transition-all shadow-sm"
        >
          <Phone className="w-4 h-4 text-emerald-400" />
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] text-white text-xs font-semibold tracking-tight active:scale-[0.98] transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>WhatsApp</span>
        </button>

        {/* Quick Enquiry Modal Trigger */}
        {onOpenEnquiry && (
          <button
            onClick={onOpenEnquiry}
            className="flex items-center justify-center p-3 rounded-xl bg-brand-red text-white active:scale-[0.98] transition-all shadow-sm"
            title="Send Quick Enquiry"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
