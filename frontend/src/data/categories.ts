export interface ProductCategory {
  id: string;
  number: string;
  name: string;
  headline: string;
  shortDescription: string;
  image: string;
  highlight: string;
  features: string[];
}

export const categories: ProductCategory[] = [
  {
    id: "revolving-chairs",
    number: "01",
    name: "Revolving Chairs",
    headline: "Engineered for posture and fluid movement.",
    shortDescription: "High-back executive, breathable task mesh, and mid-back revolving chairs equipped with multi-tilt mechanisms and certified hydraulics.",
    image: "/images/categories/revolving-chairs.webp",
    highlight: "Class 4 Hydraulics & Lumbar Support",
    features: ["Pneumatic Height Adjustment", "Synchronous Tilt Mechanism", "360° Heavy-Duty Swivel", "Breathable Molded Cushions"]
  },
  {
    id: "visitor-chairs",
    number: "02",
    name: "Visitor Chairs",
    headline: "Quiet architectural elegance for every guest.",
    shortDescription: "Heavy-gauge cantilever chrome frames and tailored upholstery built for client cabins, conference rooms, and reception waiting spaces.",
    image: "/images/categories/visitor-chairs.webp",
    highlight: "Reinforced CRCA Steel Cantilever",
    features: ["Floor-Protective Glides", "High-Density Foam Seating", "Seamless Mirror Chrome", "Anti-Fatigue Back Rest"]
  },
  {
    id: "revolving-stools",
    number: "03",
    name: "Revolving Stools",
    headline: "Compact versatility for dynamic workspaces.",
    shortDescription: "Smooth pneumatic height-adjustable revolving stools with 360-degree rotation designed for labs, billing counters, and design desks.",
    image: "/images/categories/revolving-stools.webp",
    highlight: "Effortless Swivel & Compact Footprint",
    features: ["Quick-Lift Pneumatic Lever", "Durable PU / Vinyl Cushions", "5-Point Stability Base", "Optional Footrest Ring"]
  },
  {
    id: "office-tables",
    number: "04",
    name: "Office Tables",
    headline: "Substantial desks for focused productivity.",
    shortDescription: "Executive cabin tables, 4-person team workstations, conference tables, and reception desks with integrated cable conduits.",
    image: "/images/categories/office-tables.webp",
    highlight: "Engineered Prelam Board & Powder-Coated Metal",
    features: ["Concealed Wire Management", "Scratch-Resistant 25mm Top", "Lockable Pedestal Drawers", "Modular Expandability"]
  }
];
