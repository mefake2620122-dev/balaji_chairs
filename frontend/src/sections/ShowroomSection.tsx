import React from 'react';
import { MapPin, Phone, MessageCircle, Navigation, Clock } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { generateWhatsAppUrl, openWhatsApp, openGoogleMaps } from '../lib/whatsapp';

export const ShowroomSection: React.FC = () => {
  const handleWhatsApp = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openWhatsApp({ requirement: "Visiting Showroom Inquiry" });
  };

  const handleDirections = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    openGoogleMaps();
  };

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="Visit Balaji Chairs"
          title="Come see it in person."
          description="Nothing replaces testing an ergonomic chair with your own posture. Visit our showroom in Unnao to experience cushioning, lumbar fits, and finishes firsthand."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Info Card */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-brand-offwhite border border-black/5 shadow-subtle">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-brand-red shrink-0 shadow-subtle">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Showroom Address
                  </span>
                  <p className="text-base font-bold text-brand-black leading-snug">
                    {siteConfig.address.line1}, {siteConfig.address.locality}
                  </p>
                  <p className="text-sm text-brand-muted mt-0.5">
                    {siteConfig.address.area}, {siteConfig.address.city}, {siteConfig.address.state} – {siteConfig.address.pincode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-brand-black shrink-0 shadow-subtle">
                  <Phone className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Direct Phone Line
                  </span>
                  <a
                    href={`tel:${siteConfig.phoneRaw}`}
                    className="text-base font-bold text-brand-black hover:text-brand-red transition-colors block"
                  >
                    {siteConfig.phone}
                  </a>
                  <span className="text-xs text-brand-muted">Instant customer & bulk inquiry support</span>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white border border-black/5 flex items-center justify-center text-neutral-600 shrink-0 shadow-subtle">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block mb-1">
                    Opening Hours
                  </span>
                  {siteConfig.businessHours.map((item, idx) => (
                    <div key={idx} className="text-xs text-brand-muted flex justify-between gap-4 py-0.5">
                      <span className="font-semibold text-brand-black">{item.days}:</span>
                      <span>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Directions, Call, WhatsApp */}
            <div className="pt-8 border-t border-black/10 flex flex-col sm:flex-row gap-3">
              <a
                href={siteConfig.googleMapsUrl}
                onClick={handleDirections}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-brand-black text-white text-xs font-bold tracking-tight hover:bg-brand-graphite transition-all shadow-sm cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-brand-red" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white text-brand-black border border-black/10 text-xs font-bold tracking-tight hover:bg-neutral-50 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Now</span>
              </a>

              <a
                href={generateWhatsAppUrl({ requirement: "Showroom Visit & Directions" })}
                onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-[#25D366] text-white text-xs font-bold tracking-tight hover:bg-[#20bd5a] transition-all shadow-sm cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Interactive Map Frame */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-black/10 shadow-card min-h-[380px] sm:min-h-[440px] relative bg-neutral-100">
            <iframe
              src={siteConfig.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '380px' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Balaji Chairs Showroom Location Map"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

      </div>
    </section>
  );
};
