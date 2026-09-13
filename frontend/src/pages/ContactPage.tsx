import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, Send, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { siteConfig } from '../data/siteConfig';
import { faqs } from '../data/faqs';
import { submitEnquiry } from '../lib/api';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface ContactPageProps {
  onSuccess?: (msg: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requirement, setRequirement] = useState('General Enquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name,
        phone,
        requirement,
        message,
        source: 'contact_page'
      });
      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess('Thank you! Your message has been sent to our team.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const url = generateWhatsAppUrl({
      customerName: name || undefined,
      requirement: requirement || undefined
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <SectionHeading
          eyebrow="Connect with Balaji Chairs"
          title="We're here to help."
          description="Have questions regarding an upcoming office project, need immediate chair repair, or looking for quotation details? Contact our Unnao showroom directly."
          align="left"
        />

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
          {/* Direct Phone */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-black">
                <Phone className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Direct Phone Call
              </span>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="text-lg sm:text-xl font-bold text-brand-black hover:text-brand-red transition-colors block"
              >
                {siteConfig.phone}
              </a>
              <p className="text-xs text-brand-muted">
                Available during showroom business hours for immediate pricing and availability.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="text-xs font-bold text-brand-black hover:text-brand-red inline-flex items-center gap-1"
              >
                <span>Call +91 78803 53900</span>
              </a>
            </div>
          </div>

          {/* WhatsApp Direct */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                <MessageCircle className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Instant WhatsApp
              </span>
              <div className="text-lg sm:text-xl font-bold text-brand-black">
                +91 78803 53900
              </div>
              <p className="text-xs text-brand-muted">
                Send chair photos, ask for quotation PDFs, or request on-site measurements.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <a
                href={generateWhatsAppUrl({ requirement: "Contact Page Chat" })}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-[#25D366] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Open WhatsApp Chat</span>
              </a>
            </div>
          </div>

          {/* Showroom Location */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-black/5 shadow-subtle flex flex-col justify-between">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-brand-offwhite flex items-center justify-center text-brand-red">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider block">
                Showroom & Workshop
              </span>
              <p className="text-sm font-bold text-brand-black leading-snug">
                941, Anwar Market, Daroga Bagh, Civil Lines, Unnao
              </p>
              <p className="text-xs text-brand-muted">
                Uttar Pradesh – 209801, India
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100">
              <a
                href={siteConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-black hover:text-brand-red inline-flex items-center gap-1"
              >
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form & Map Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch my-12">
          {/* Form */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-10 rounded-3xl border border-black/5 shadow-card">
            <h3 className="text-xl font-bold text-brand-black tracking-tight mb-1">
              Send an Online Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted mb-6">
              Fill out your details below and we will contact you within a few business hours.
            </p>

            {isSubmitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-brand-black">Message Delivered</h4>
                <p className="text-xs sm:text-sm text-brand-muted max-w-xs mx-auto">
                  Thank you, {name}. Our team will review your inquiry and connect via {phone}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 78803 53900"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Requirement Type
                  </label>
                  <select
                    value={requirement}
                    onChange={(e) => setRequirement(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm bg-white"
                  >
                    <option value="Single Chair Purchase">Single Chair Purchase</option>
                    <option value="Bulk Office Furnishing (10+ Items)">Bulk Office Furnishing (10+ Items)</option>
                    <option value="Chair Repair & Component Replacement">Chair Repair & Component Replacement</option>
                    <option value="Custom Table / Workstation Setup">Custom Table / Workstation Setup</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Message / Specifications
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what you're looking for, quantity, or specific chair issues..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full justify-center"
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Map & Hours */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="rounded-3xl overflow-hidden border border-black/10 shadow-card flex-1 min-h-[300px]">
              <iframe
                src={siteConfig.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen={true}
                loading="lazy"
                title="Balaji Chairs Map"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-black/5 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-black">
                <Clock className="w-4 h-4 text-brand-red" />
                <span>Showroom Hours</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-400 block font-semibold">Monday to Saturday</span>
                  <span className="font-bold text-brand-black">10:00 AM – 8:30 PM</span>
                </div>
                <div>
                  <span className="text-neutral-400 block font-semibold">Sunday</span>
                  <span className="font-bold text-brand-black">11:00 AM – 6:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="my-16 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red block mb-1">
              Common Questions
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-black tracking-tight">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-black/5 shadow-subtle overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-brand-black tracking-tight">
                      {faq.question}
                    </span>
                    <div className="p-1 rounded-full bg-brand-offwhite text-neutral-600 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-neutral-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
