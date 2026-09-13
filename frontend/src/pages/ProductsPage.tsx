import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, MessageCircle, ArrowRight, Check, X } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { products, Product } from '../data/products';
import { categories } from '../data/categories';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface ProductsPageProps {
  initialCategory?: string;
  onOpenEnquiry: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  initialCategory = 'all',
  onOpenEnquiry
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Products' },
    ...categories.map(c => ({ id: c.id, label: c.name }))
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleOpenDetail = (prod: Product) => {
    setActiveProductModal(prod);
    setSelectedVariant(prod.variants[0] || '');
  };

  const handleWhatsAppModal = () => {
    if (!activeProductModal) return;
    const url = generateWhatsAppUrl({
      productName: `${activeProductModal.name} (${selectedVariant})`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Commercial Seating & Tables"
          title="Engineered Furniture Catalogue"
          description="Explore our complete line of revolving chairs, visitor seating, stools, and executive tables. Every model is built with commercial-grade mechanisms and available directly from our Unnao showroom."
          align="left"
        />

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-black/5 shadow-subtle mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chairs, mesh, executive desks..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-brand-offwhite border border-transparent focus:border-brand-black focus:bg-white text-xs sm:text-sm font-medium outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Results count */}
            <div className="text-xs font-semibold text-neutral-500 font-mono">
              Showing {filteredProducts.length} of {products.length} models
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-2 border-t border-neutral-100">
            {filterTabs.map((tab) => {
              const isSelected = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-tight whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-brand-black text-white shadow-sm'
                      : 'bg-brand-offwhite text-neutral-700 hover:bg-neutral-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/5 p-8">
            <h3 className="text-lg font-bold text-brand-black">No products found</h3>
            <p className="text-xs text-brand-muted mt-1">
              Try adjusting your search query or select another category.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={handleOpenDetail}
                onEnquire={(p) => onOpenEnquiry(p.name)}
              />
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {activeProductModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveProductModal(null)}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-3xl shadow-elevated border border-black/10 overflow-hidden animate-slide-up max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-100 bg-brand-offwhite">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-red">
                  {activeProductModal.categoryLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-brand-black tracking-tight">
                  {activeProductModal.name}
                </h3>
              </div>
              <button
                onClick={() => setActiveProductModal(null)}
                className="p-2 rounded-full text-neutral-400 hover:text-black hover:bg-black/5"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="aspect-[4/3] rounded-2xl bg-brand-offwhite p-6 flex items-center justify-center">
                  <img
                    src={activeProductModal.image}
                    alt={activeProductModal.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wider">
                      {activeProductModal.tagline}
                    </span>
                    <p className="mt-2 text-xs sm:text-sm text-brand-muted leading-relaxed">
                      {activeProductModal.description}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-semibold text-neutral-600 uppercase tracking-wider block mb-1.5">
                      Finish / Color Variants:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProductModal.variants.map((v) => (
                        <button
                          key={v}
                          onClick={() => setSelectedVariant(v)}
                          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                            selectedVariant === v
                              ? 'bg-brand-black text-white'
                              : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-neutral-500">
                    <strong>Dimensions:</strong> {activeProductModal.dimensions}
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <div className="pt-4 border-t border-neutral-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 mb-3">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {Object.entries(activeProductModal.specs).map(([specKey, specVal]) => (
                    <div key={specKey} className="p-2.5 rounded-xl bg-brand-offwhite">
                      <span className="text-neutral-400 block font-semibold">{specKey}</span>
                      <span className="text-brand-black font-medium">{specVal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal Workspaces */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-700 block mb-2">
                  Ideal For:
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProductModal.idealFor.map((item, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Modal Action Footer */}
            <div className="p-4 sm:p-6 border-t border-neutral-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs font-bold text-neutral-600 font-mono">
                {activeProductModal.priceLabel}
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleWhatsAppModal}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20bd5a] transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Quote</span>
                </button>

                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setActiveProductModal(null);
                    onOpenEnquiry(`${activeProductModal.name} (${selectedVariant})`);
                  }}
                  icon={<ArrowRight className="w-4 h-4" />}
                  className="flex-1 sm:flex-none"
                >
                  Enquire Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
