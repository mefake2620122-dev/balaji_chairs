import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { siteConfig } from '../data/siteConfig';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Commercial Terms"
          title="Terms & Conditions"
          description="Guidelines governing quotations, product warranties, and repairs at Balaji Chairs."
          align="left"
        />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-subtle space-y-6 text-sm sm:text-base text-brand-muted leading-relaxed">
          <h3 className="text-lg font-bold text-brand-black">1. Quotations and Pricing</h3>
          <p>
            All quotations provided by <strong className="text-brand-black">{siteConfig.brandName}</strong> via our website, WhatsApp, or in person are valid for the timeframe specified on the proforma estimate. Final commercial pricing reflects fabric selections, quantity tiers, and delivery arrangements.
          </p>

          <h3 className="text-lg font-bold text-brand-black">2. Delivery and Assembly</h3>
          <p>
            We provide delivery and on-site assembly across Unnao and nearby industrial corridors. The customer is responsible for ensuring clear access to the installation area.
          </p>

          <h3 className="text-lg font-bold text-brand-black">3. Repair & Replacement Components</h3>
          <p>
            Replaced hydraulic cylinders, castors, and mechanisms carry component warranties against manufacturing defects. Normal physical tear or deliberate overload is excluded.
          </p>

          <h3 className="text-lg font-bold text-brand-black">4. Governing Jurisdiction</h3>
          <p>
            Any disputes arising from business transactions with Balaji Chairs shall be subject to the exclusive jurisdiction of the competent courts in Unnao, Uttar Pradesh.
          </p>
        </div>
      </div>
    </div>
  );
};
