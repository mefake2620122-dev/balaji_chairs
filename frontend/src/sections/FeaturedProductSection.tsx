import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { products, Product } from '../data/products';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface FeaturedProductSectionProps {
  onOpenEnquiry: (productName: string) => void;
}

export const FeaturedProductSection: React.FC<FeaturedProductSectionProps> = ({
  onOpenEnquiry
}) => {
  // Use flagship Aura High-back chair
  const featuredProduct: Product = products[0];
  const [selectedVariant, setSelectedVariant] = useState(featuredProduct.variants[0]);

  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl({
      productName: `${featuredProduct.name} (${selectedVariant})`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Large Product Showcase Image Stage */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-lg rounded-3xl bg-brand-offwhite p-10 flex items-center justify-center border border-black/5 shadow-subtle group">
              <div className="absolute inset-0 bg-radial-gradient from-white to-transparent opacity-50 rounded-3xl" />
              
              {/* Product Visual */}
              <img
                src={featuredProduct.image}
                alt={featuredProduct.name}
                loading="lazy"
                className="relative z-10 max-h-[85%] w-auto object-contain transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Floating Certification Badge */}
              <div className="absolute top-6 left-6 z-20 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-black/10 text-[11px] font-bold uppercase tracking-wider text-brand-black shadow-sm">
                Flagship Series
              </div>
            </div>
          </div>

          {/* Right: Architectural Product Story */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-2">
                {featuredProduct.categoryLabel} Spotlight
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-black tracking-tight leading-tight">
                Comfort meets <br className="hidden sm:inline" /> function.
              </h2>
              <p className="mt-4 text-base text-brand-muted leading-relaxed">
                {featuredProduct.description}
              </p>
            </div>

            {/* Key Engineering Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-y border-neutral-100">
              {Object.entries(featuredProduct.specs).slice(0, 4).map(([key, val]) => (
                <div key={key} className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                    {key}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-brand-black block">
                    {val}
                  </span>
                </div>
              ))}
            </div>

            {/* Available Variants */}
            <div>
              <span className="text-xs font-semibold text-neutral-700 uppercase tracking-wider block mb-2.5">
                Available Finishes:
              </span>
              <div className="flex flex-wrap gap-2">
                {featuredProduct.variants.map((variant) => {
                  const isSelected = selectedVariant === variant;
                  return (
                    <button
                      key={variant}
                      onClick={() => setSelectedVariant(variant)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all ${
                        isSelected
                          ? 'bg-brand-black text-white shadow-sm'
                          : 'bg-brand-offwhite text-neutral-700 hover:bg-neutral-200'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-brand-red" />}
                      <span>{variant}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => onOpenEnquiry(`${featuredProduct.name} (${selectedVariant})`)}
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Enquire about this
              </Button>

              <Button
                variant="outline"
                size="md"
                href={generateWhatsAppUrl({ productName: `${featuredProduct.name} (${selectedVariant})` })}
                target="_blank"
                icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
                className="w-full sm:w-auto cursor-pointer"
              >
                Instant WhatsApp Quote
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
