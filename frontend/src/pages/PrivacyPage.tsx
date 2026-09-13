import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { siteConfig } from '../data/siteConfig';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Legal & Data Policy"
          title="Privacy Policy"
          description="How Balaji Chairs handles your contact information and quotation requests."
          align="left"
        />

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-black/5 shadow-subtle space-y-6 text-sm sm:text-base text-brand-muted leading-relaxed">
          <p>
            At <strong className="text-brand-black">{siteConfig.brandName}</strong>, we respect your privacy and are committed to protecting the contact details you share with us through our website, WhatsApp channels, or phone calls.
          </p>

          <h3 className="text-lg font-bold text-brand-black">1. Information We Collect</h3>
          <p>
            When you submit an enquiry, request a chair repair, or contact us via WhatsApp, we collect basic communication details such as your name, mobile number, requirement type, and any notes regarding the furniture items you require.
          </p>

          <h3 className="text-lg font-bold text-brand-black">2. How We Use Your Information</h3>
          <p>
            Your information is used strictly to provide you with product quotations, confirm repair appointments, arrange on-site deliveries in Unnao and nearby areas, and provide post-purchase warranty assistance. We never sell, lease, or share your contact data with third-party marketing brokers.
          </p>

          <h3 className="text-lg font-bold text-brand-black">3. Contact Us</h3>
          <p>
            If you have any questions regarding your data or wish to have your contact details updated, please call us at {siteConfig.phone} or visit us at {siteConfig.address.fullText}.
          </p>
        </div>
      </div>
    </div>
  );
};
