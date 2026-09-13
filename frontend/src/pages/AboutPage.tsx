import React from 'react';
import { MapPin, Phone, MessageCircle, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface AboutPageProps {
  onOpenEnquiry: () => void;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEnquiry, onNavigate }) => {
  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl({ requirement: "About Balaji Chairs & Showroom Visit" });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Our Story & Philosophy"
          title="Local roots. Modern ambitions."
          description="Crafting comfortable, durable, and posture-friendly office seating solutions for businesses, institutions, and professionals across Unnao and Uttar Pradesh."
          align="left"
        />

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-12">
          
          <div className="lg:col-span-6 space-y-5 text-sm sm:text-base text-brand-muted leading-relaxed">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-black tracking-tight">
              A dedicated focus on the everyday workspace.
            </h3>
            <p>
              In a furniture market often dominated by fragile flat-pack chairs that wear down within months, Balaji Chairs was established with a singular standard: providing commercial-grade seating that supports human posture reliably day in and day out.
            </p>
            <p>
              Situated at <strong className="text-brand-black">941, Anwar Market, Daroga Bagh, Civil Lines, Unnao</strong>, our showroom and assembly workshop serve as a direct bridge between rigorous seating manufacturing and local businesses.
            </p>
            <p>
              We believe great seating should not be a luxury reserved only for multinational corporate headquarters. Whether it is an individual doctor's consultation desk, a legal chamber, a school computer lab, or an expanding company floor, every professional deserves seating engineered for health and durability.
            </p>
          </div>

          <div className="lg:col-span-6 rounded-3xl overflow-hidden shadow-card border border-black/10 aspect-[4/3] bg-neutral-200">
            <img
              src="/images/brand/showroom-unnao.webp"
              alt="Balaji Chairs Showroom Environment"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* 3 Core Commitments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-red">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-brand-black tracking-tight">
              Industrial Components
            </h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We exclusively use certified Class 4 hydraulics, high-density molded virgin foam, and reinforced metal/nylon bases tested for heavy continuous commercial weight.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-black">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-brand-black tracking-tight">
              Local Accountability
            </h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              When you choose Balaji Chairs, you have a physical address and dedicated phone number in Unnao. You never have to deal with automated chatbots or untraceable returns.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-subtle space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-red">
              <Award className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-brand-black tracking-tight">
              Restoration Culture
            </h4>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We advocate for chair longevity. Our repair workshop stocks genuine replacement cylinders, wheels, and mechanisms to keep chairs functioning for a decade.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-brand-black text-white p-8 sm:p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-2xl font-bold tracking-tight">
              Visit our Civil Lines showroom today
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400">
              Open Monday to Saturday (10:00 AM – 8:30 PM) and Sunday (11:00 AM – 6:00 PM).
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => onNavigate('/contact')}
            >
              Get Showroom Directions
            </Button>
            <Button
              variant="dark"
              size="md"
              onClick={handleWhatsApp}
              icon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
            >
              Chat on WhatsApp
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
