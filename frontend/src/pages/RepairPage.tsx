import React, { useState } from 'react';
import { Wrench, Phone, CheckCircle, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
import { services, ChairService } from '../data/services';
import { siteConfig } from '../data/siteConfig';
import { submitRepairRequest } from '../lib/api';
import { generateWhatsAppUrl } from '../lib/whatsapp';

export interface RepairPageProps {
  onSuccess?: (msg: string) => void;
}

export const RepairPage: React.FC<RepairPageProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [chairType, setChairType] = useState('High-Back Revolving Chair');
  const [quantity, setQuantity] = useState(1);
  const [selectedIssues, setSelectedIssues] = useState<string[]>(['Hydraulic Gas-Lift Sinking']);
  const [location, setLocation] = useState('Unnao');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const availableIssues = [
    'Hydraulic Gas-Lift Sinking / Not Raising',
    'Wheels / Castors Jammed or Broken',
    'Armrests Broken or Shaking',
    'Seat Foam Flattened / Re-cushioning Required',
    'Tilt Mechanism Wobbling / Loose',
    'Star Base Prong Cracked',
    'General Fleet Inspection / Servicing'
  ];

  const toggleIssue = (issue: string) => {
    if (selectedIssues.includes(issue)) {
      if (selectedIssues.length > 1) {
        setSelectedIssues(selectedIssues.filter(i => i !== issue));
      }
    } else {
      setSelectedIssues([...selectedIssues, issue]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitRepairRequest({
        name,
        phone,
        chairType,
        issueTypes: selectedIssues,
        quantity,
        location,
        notes
      });
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess('Repair booking received! Our technician will call you to schedule.');
      }
    } catch (err) {
      setError('Could not process online booking. Please call or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsApp = () => {
    const issuesText = selectedIssues.join(', ');
    const url = generateWhatsAppUrl({
      customerName: name,
      serviceType: `${chairType} repair (${issuesText}, Qty: ${quantity})`
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-24 bg-brand-offwhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <SectionHeading
          eyebrow="Restoration & Parts"
          title="Chair Repair & Maintenance"
          description="Don't discard an otherwise solid chair. We repair sinking hydraulics, broken wheels, wobbly bases, and sagging cushions right here in Unnao with genuine commercial replacement components."
          align="left"
        />

        {/* 2 Column Layout: Repair Form & Services Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mt-8">
          
          {/* Left Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-black/5 shadow-card">
            <div className="border-b border-neutral-100 pb-5 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-red block mb-1">
                Book Repair or Part Replacement
              </span>
              <h3 className="text-2xl font-bold text-brand-black tracking-tight">
                Tell us about your chair issue
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted mt-1">
                Bring your chair to 941 Anwar Market or schedule a pickup / on-site evaluation for 5+ chairs.
              </p>
            </div>

            {isSuccess ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-brand-black">Repair Request Logged</h4>
                <p className="text-sm text-brand-muted max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-brand-black">{name}</span>. Our technician will review your reported issues ({selectedIssues.length} parts selected) and contact you at <span className="font-semibold text-brand-black">{phone}</span> to confirm parts availability and turnaround time.
                </p>
                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsSuccess(false)}
                  >
                    Submit Another Request
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleWhatsApp}
                    icon={<MessageCircle className="w-4 h-4" />}
                  >
                    Follow up on WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-3 text-xs font-medium text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 78803 53900"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black focus:ring-1 focus:ring-brand-black outline-none text-sm font-medium"
                    />
                  </div>
                </div>

                {/* Chair Type & Quantity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Chair Type
                    </label>
                    <select
                      value={chairType}
                      onChange={(e) => setChairType(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm bg-white"
                    >
                      <option value="High-Back Revolving Chair">High-Back Revolving Chair</option>
                      <option value="Medium-Back Task Chair">Medium-Back Task Chair</option>
                      <option value="Ergonomic Mesh Chair">Ergonomic Mesh Chair</option>
                      <option value="Visitor Cantilever Chair">Visitor Cantilever Chair</option>
                      <option value="Revolving Counter Stool">Revolving Counter Stool</option>
                      <option value="Multiple Chair Types">Multiple Chair Types (Batch)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Number of Chairs
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Issues Checkbox Selector */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-2">
                    Select Faulty / Damaged Parts:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableIssues.map((issue) => {
                      const isChecked = selectedIssues.includes(issue);
                      return (
                        <button
                          type="button"
                          key={issue}
                          onClick={() => toggleIssue(issue)}
                          className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 ${
                            isChecked
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                              : 'bg-brand-offwhite text-neutral-700 border-black/5 hover:border-black/20'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${
                            isChecked ? 'bg-brand-red border-brand-red text-white' : 'border-neutral-300'
                          }`}>
                            {isChecked && <CheckCircle className="w-3 h-3" />}
                          </div>
                          <span>{issue}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Location / Notes */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5">
                    Location in Unnao & Any Specific Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Civil Lines near Gandhi Nagar, chair sinks immediately when sitting..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-brand-black outline-none text-sm resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    isLoading={isSubmitting}
                    icon={<Wrench className="w-4 h-4" />}
                    className="flex-1"
                  >
                    Submit Repair Request
                  </Button>

                  <button
                    type="button"
                    onClick={handleWhatsApp}
                    className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-xs font-bold hover:bg-[#20bd5a] transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Quick WhatsApp Help</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Info: Services List & Direct Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-brand-black text-white p-7 sm:p-8 rounded-3xl border border-white/10 shadow-card space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red block">
                Direct Workshop Contact
              </span>
              <h4 className="text-xl font-bold tracking-tight">
                Need urgent chair repairs in Unnao?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Bring your chair directly to our workshop at 941 Anwar Market, Daroga Bagh, Civil Lines. Most hydraulic cylinders and castor wheels can be replaced on the same day.
              </p>

              <div className="pt-2 space-y-3 text-xs text-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">Direct Line</span>
                    <a href={`tel:${siteConfig.phoneRaw}`} className="text-neutral-400 hover:text-white">
                      {siteConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#25D366] shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block font-bold text-white">WhatsApp Photos</span>
                    <span className="text-neutral-400">Send photos of broken chair base/cylinder for instant diagnosis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Pricing / Turnaround Overview */}
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-black/5 shadow-subtle space-y-4">
              <h4 className="text-sm font-bold text-brand-black uppercase tracking-wider">
                Turnaround & Genuine Spares
              </h4>
              <ul className="space-y-3 text-xs text-brand-muted">
                {services.map((s) => (
                  <li key={s.id} className="flex items-center justify-between pb-2 border-b border-neutral-100 last:border-0 last:pb-0">
                    <span className="font-semibold text-brand-black">{s.title}</span>
                    <span className="text-[11px] font-mono text-brand-red">{s.turnaround}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
