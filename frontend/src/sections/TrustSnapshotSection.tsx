import React from 'react';
import { Armchair, Sparkles, MapPin, MessageSquareText } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const TrustSnapshotSection: React.FC = () => {
  const snapshots = [
    {
      icon: <Armchair className="w-5 h-5 text-brand-red" />,
      title: "Specialist Seating",
      description: "Revolving, executive & cantilever visitor chairs"
    },
    {
      icon: <Sparkles className="w-5 h-5 text-brand-black" />,
      title: "Workspace Furniture",
      description: "Modular workstations, office tables & stools"
    },
    {
      icon: <MapPin className="w-5 h-5 text-brand-red" />,
      title: "Local Expertise",
      description: "Showroom & repair center in Civil Lines, Unnao"
    },
    {
      icon: <MessageSquareText className="w-5 h-5 text-brand-black" />,
      title: "Direct Enquiries",
      description: "Fast quotes, customized orders & factory pricing"
    }
  ];

  return (
    <section id="trust-snapshot" className="border-y border-black/5 bg-white py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {snapshots.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-2xl bg-brand-offwhite border border-black/5 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-black tracking-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-brand-muted mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
