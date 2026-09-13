export interface Product {
  id: string;
  name: string;
  category: 'revolving-chairs' | 'visitor-chairs' | 'revolving-stools' | 'office-tables';
  categoryLabel: string;
  tagline: string;
  description: string;
  priceLabel: string;
  image: string;
  isFeatured: boolean;
  idealFor: string[];
  specs: {
    [key: string]: string;
  };
  variants: string[];
  dimensions: string;
}

export const products: Product[] = [
  {
    id: "bc-exec-01",
    name: "Aura High-Back Executive Chair",
    category: "revolving-chairs",
    categoryLabel: "Revolving Chair",
    tagline: "Flagship Presidential Seating",
    description: "The premier executive seating experience from Balaji Chairs. Features deep ergonomic contouring, multi-position synchronous tilt lock, certified Class 4 nitrogen pneumatic lift, and a mirror-polished chrome star base.",
    priceLabel: "Price on Request",
    image: "/images/products/aura-executive-highback.webp",
    isFeatured: true,
    idealFor: ["Executive Director Cabins", "CEO & Founder Desks", "Senior Management Cabins"],
    specs: {
      "Tilt Mechanism": "Synchronous Multi-position Tilt Lock with Tension Regulator",
      "Base Structure": "Die-cast Heavy-gauge Metal Star Base (Tested to 150 kg)",
      "Castor Wheels": "60mm Anti-friction Twin Nylon & PU Castors",
      "Pneumatic Lift": "Class 4 Nitrogen Gas-lift Cylinder with ISO Certification",
      "Seat & Back": "High-density 50-density Molded Polyurethane Foam",
      "Upholstery": "Breathable Commercial Grade Vegan Leatherette",
      "Armrests": "Cushioned Soft-touch Ergonomic Fixed Armrests"
    },
    variants: ["Executive Dark Brown", "Obsidian Black", "Cognac Tan"],
    dimensions: "Total Height: 118–128 cm | Seat Width: 52 cm | Overall Width: 65 cm | Depth: 68 cm"
  },
  {
    id: "bc-mesh-02",
    name: "Verve Ergonomic Mesh Task Chair",
    category: "revolving-chairs",
    categoryLabel: "Revolving Chair",
    tagline: "All-Day Breathable Workstation Seating",
    description: "Engineered for 8+ hours of intensive workspace focus. Features high-tensile breathable back mesh, adjustable lumbar bridge, waterfall seat cushion, and smooth pneumatic height adjustment.",
    priceLabel: "Price on Request",
    image: "/images/products/verve-mesh-task.webp",
    isFeatured: true,
    idealFor: ["IT & Corporate Workstations", "Accounting & Finance Desks", "Home Offices"],
    specs: {
      "Tilt Mechanism": "Push-back Tilt Mechanism with Center Tilt Lock",
      "Base Structure": "Reinforced Glass-filled High-tensile Nylon 5-Star Base",
      "Castor Wheels": "50mm Smooth Gliding Dual-wheel Castors",
      "Pneumatic Lift": "Class 3 Gas-lift Cylinder (120 kg Load Rating)",
      "Seat Cushion": "45-density High Resilience Molded Foam with Waterfall Edge",
      "Backrest": "Airflow Korean Micro-weave High-tensile Mesh",
      "Armrests": "Adjustable Height T-Armrests with Polyurethane Pads"
    },
    variants: ["Classic Black", "White Frame & Cool Grey Mesh", "Slate Blue"],
    dimensions: "Total Height: 98–108 cm | Seat Width: 50 cm | Overall Width: 60 cm | Depth: 58 cm"
  },
  {
    id: "bc-visit-01",
    name: "Matrix Cantilever Visitor Chair",
    category: "visitor-chairs",
    categoryLabel: "Visitor Chair",
    tagline: "Architectural Durability & Comfort",
    description: "Sleek tubular CRCA mild steel cantilever architecture that delivers gentle flex and dependable support. Designed for executive consultation cabins, conference chambers, and reception seating.",
    priceLabel: "Price on Request",
    image: "/images/products/matrix-cantilever-visitor.webp",
    isFeatured: true,
    idealFor: ["Doctor & Lawyer Cabins", "Boardroom Visitor Seating", "Executive Meeting Desks"],
    specs: {
      "Cantilever Frame": "Heavy-gauge Seamless CRCA Steel Oval Tubing with Mirror Chrome Finish",
      "Floor Protection": "Four Impact-resistant Non-marking Floor Protectors",
      "Cushion Foam": "45-density Virgin Molded PU Cushion with Dual Lumbar Curve",
      "Armrests": "Integrated Steel Tubular Arms with Padded Sleeve Overlays",
      "Stability": "Self-balancing Cantilever Geometry with Anti-tip Footpads"
    },
    variants: ["Corporate Jet Black", "Deep Navy Blue", "Charcoal Grey"],
    dimensions: "Total Height: 92 cm | Seat Height: 46 cm | Width: 55 cm | Depth: 58 cm"
  },
  {
    id: "bc-visit-02",
    name: "Linea Ribbed Leatherette Cabin Chair",
    category: "visitor-chairs",
    categoryLabel: "Visitor Chair",
    tagline: "Refined Executive Conference Seating",
    description: "Low-profile horizontal ribbed padding creates a slender, contemporary profile for modern conference rooms, legal consultation spaces, and interview suites.",
    priceLabel: "Price on Request",
    image: "/images/products/linea-cabin-visitor.webp",
    isFeatured: false,
    idealFor: ["Corporate Meeting Rooms", "Interview Chambers", "Executive Lounges"],
    specs: {
      "Frame Construction": "Solid Chrome-plated One-piece S-Cantilever Frame",
      "Seat & Back Stitching": "Precision Horizontal Ribbed Cushion Panels",
      "Arm Sleeves": "Removable Leatherette Arm Padding with Hidden Zippers",
      "Weight Capacity": "Tested for up to 135 kg Static Load"
    },
    variants: ["Executive Black", "Warm Camel", "Pure White"],
    dimensions: "Total Height: 90 cm | Seat Height: 45 cm | Width: 54 cm | Depth: 56 cm"
  },
  {
    id: "bc-stool-01",
    name: "Apex Pneumatic Swivel Stool",
    category: "revolving-stools",
    categoryLabel: "Revolving Stool",
    tagline: "Dynamic 360° Counter & Lab Stool",
    description: "High-density cushioned round revolving stool featuring 360-degree ball-bearing swivel, pneumatic height regulation lever, and chrome-plated heavy-duty star base.",
    priceLabel: "Price on Request",
    image: "/images/products/apex-swivel-stool.webp",
    isFeatured: true,
    idealFor: ["Retail & Pharmacy Billing Counters", "Diagnostic Labs", "Architectural Drafting Desks"],
    specs: {
      "Swivel System": "Full 360° Free Fluid Ball-bearing Rotation",
      "Height Travel": "45 cm to 62 cm Pneumatic Travel via Hand Lever",
      "Seat Cushion": "75mm Thick High-resilience Molded Foam Cushion",
      "Base Construction": "Polished Chrome 5-prong Star Base with Smooth Wheels",
      "Footring Option": "Circular Chrome Footrest Ring Available on Request"
    },
    variants: ["Commercial Black", "Maroon Red", "Royal Blue"],
    dimensions: "Seat Diameter: 36 cm | Seat Height: 45–62 cm Adjustable"
  },
  {
    id: "bc-table-01",
    name: "Prism Executive Desk System",
    category: "office-tables",
    categoryLabel: "Office Table",
    tagline: "Architectural Executive Workspace",
    description: "Substantial executive office desk crafted with 25mm Action TESA pre-laminated board and heavy 50x50mm powder-coated steel legs. Includes cable management port and a matching 3-drawer lockable mobile pedestal.",
    priceLabel: "Price on Request",
    image: "/images/products/prism-executive-table.webp",
    isFeatured: true,
    idealFor: ["Executive Cabins", "Corporate MD Desks", "Principal Desks"],
    specs: {
      "Tabletop Material": "25mm Prelaminated Engineered Board with 2mm Machine Edge Bending",
      "Metal Frame": "Heavy-duty CRCA MS Square Tube with Electrostatic Powder Coating",
      "Cable Routing": "Integrated Aluminum Flip-top Brush Wire Management Box",
      "Storage Included": "Mobile 3-drawer Pedestal with Central Key Lock and Telescopic Slides"
    },
    variants: ["Natural Walnut & Matte Black", "Bavarian Beech & Chrome Silver", "Smoked Oak & Charcoal"],
    dimensions: "Standard: 150 x 75 x 75 cm | Large: 180 x 90 x 75 cm"
  },
  {
    id: "bc-table-02",
    name: "Nexus Modular 4-Person Workstation",
    category: "office-tables",
    categoryLabel: "Office Table",
    tagline: "Collaborative Team Cluster",
    description: "Space-efficient back-to-back 4-user cluster workstation with acoustic pin-up divider panels and dual-tier wire management raceways for modern office teams.",
    priceLabel: "Price on Request",
    image: "/images/products/nexus-workstation.webp",
    isFeatured: false,
    idealFor: ["Open Office Teams", "Call Centers & BPOs", "Creative & Design Studios"],
    specs: {
      "Configuration": "4-User Modular Cluster (Back-to-Back Layout)",
      "Privacy Screen": "Fabric Wrapped Acoustic Pin-up / Magnetic Screen",
      "Wire Raceways": "Twin-level Metal Raceway for Clean Power & LAN Separation",
      "Leveling Legs": "Adjustable Floor Glides for Uneven Flooring"
    },
    variants: ["Warm White & Charcoal Gray", "Light Maple & White Frame"],
    dimensions: "Each Seat: 120 x 60 cm | Overall Desk Height: 75 cm | Screen Height: 105 cm"
  }
];
