import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { CategoryCard } from '../components/CategoryCard';
import { categories, ProductCategory } from '../data/categories';

export interface ProductCategoriesSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const ProductCategoriesSection: React.FC<ProductCategoriesSectionProps> = ({
  onSelectCategory
}) => {
  return (
    <section className="py-20 sm:py-28 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Product Categories"
          title="Made for every seat at work."
          description="Engineered office seating and modular workspace furniture selected for stability, ergonomic alignment, and lasting commercial durability."
          align="left"
        />

        {/* Categories Grid: 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
