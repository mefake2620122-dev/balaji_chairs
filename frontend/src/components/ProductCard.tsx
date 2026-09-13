import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '../data/products';
import { generateWhatsAppUrl, openWhatsApp } from '../lib/whatsapp';

import { PerspectiveCard } from './PerspectiveCard';

export interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onEnquire
}) => {
  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    openWhatsApp({ productName: product.name });
  };

  return (
    <PerspectiveCard
      onClick={() => onSelectProduct?.(product)}
      className="h-full"
      maxTilt={6}
      glareOpacity={0.14}
    >
      <div className="group relative flex flex-col h-full bg-white rounded-3xl border border-black/5 overflow-hidden transition-all duration-300 hover:shadow-card hover:border-black/10 cursor-pointer">
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] w-full bg-brand-offwhite/60 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="max-h-full w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-white/90 text-brand-black backdrop-blur-md shadow-subtle border border-black/5">
            {product.categoryLabel}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <div className="text-xs font-semibold text-brand-red uppercase tracking-wider mb-1">
            {product.tagline}
          </div>
          <h3 className="text-lg font-bold text-brand-black tracking-tight group-hover:text-brand-red transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-5 mt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-neutral-500 tracking-tight">
            {product.priceLabel}
          </span>

          <div className="flex items-center gap-2">
            <a
              href={generateWhatsAppUrl({ productName: product.name })}
              onClick={handleWhatsApp}
              title="Quick WhatsApp Enquiry"
              className="p-2 rounded-full bg-neutral-100 text-neutral-700 hover:bg-[#25D366] hover:text-white transition-colors flex items-center justify-center cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onEnquire?.(product);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-black text-white text-xs font-semibold tracking-tight hover:bg-brand-red transition-colors group-hover:shadow-sm"
            >
              <span>Enquire</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </div>
      </div>
    </PerspectiveCard>
  );
};
