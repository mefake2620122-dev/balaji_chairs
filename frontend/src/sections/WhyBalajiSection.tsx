import React from 'react';
import { ShieldCheck, Compass, Sliders, HeartHandshake } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';

export const WhyBalajiSection: React.FC = () => {
  const pillars = [
    {
      label: "01 / QUALITY",
      icon: <ShieldCheck className="w-6 h-6 text-brand-red" />,
      title: "Thoughtfully Selected Components",
      description: "From certified Class 4 nitrogen gas-lifts to high-density molded virgin polyurethane foams and reinforced star bases, we use parts engineered to endure daily commercial stress."
    },
    {
      label: "02 / EXPERIENCE",
      icon: <Compass className="w-6 h-6 text-brand-black" />,
      title: "Practical Knowledge of Seating",
      description: "Every desk setup is unique. We understand ergonomic lumbar curvature, tilt-lock mechanics, and weight distributions to recommend seating that truly supports physical well-being."
    },
    {
      label: "03 / CHOICE",
      icon: <Sliders className="w-6 h-6 text-brand-red" />,
      title: "Tailored Workspace Solutions",
      description: "Whether you need a single executive director chair, 30 mesh workstation clusters, cantilever waiting seats, or custom-sized conference tables, we offer versatile options."
    },
    {
      label: "04 / SERVICE",
      icon: <HeartHandshake className="w-6 h-6 text-brand-black" />,
      title: "Direct Local Support & AMC",
      description: "Based locally in Anwar Market, Civil Lines, Unnao. You deal directly with our experienced team for demonstrations, fast delivery, component spares, and long-term service."
    }
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          eyebrow="The Balaji Standard"
          title="Built around better workspaces."
          description="We combine thoughtful seating ergonomics, dependable materials, and direct local accountability to furnish productive working environments."
          align="left"
        />

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-7 rounded-3xl bg-brand-offwhite border border-black/5 transition-all duration-300 hover:shadow-card hover:bg-white"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-black/5 flex items-center justify-center shadow-subtle">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-neutral-400">
                    {pillar.label}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-brand-black tracking-tight mb-2.5">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
