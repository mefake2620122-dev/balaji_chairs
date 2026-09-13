export interface ChairService {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  turnaround: string;
  commonIssues: string[];
  icon: string;
}

export const services: ChairService[] = [
  {
    id: "hydraulic-replacement",
    title: "Hydraulic Gas-Lift Replacement",
    subtitle: "Class 3 & 4 Certified Cylinders",
    description: "If your chair gradually sinks or won't raise, the internal seal has expired. We install precision-fit heavy-duty nitrogen cylinders rated up to 150 kg.",
    turnaround: "Same-Day / Next-Day in Unnao",
    commonIssues: ["Chair sinks upon sitting", "Height adjustment lever feels loose", "Gas cylinder oil leakage"],
    icon: "Gauge"
  },
  {
    id: "caster-wheels",
    title: "Caster Wheel Replacement",
    subtitle: "Twin-Wheel PU & Nylon Castors",
    description: "Replace jammed, broken, or floor-scratching wheels with smooth-gliding nylon or soft PU twin castors that protect tile and hardwood floors.",
    turnaround: "Immediate Replacement",
    commonIssues: ["Wheels broken or seized", "Floor scratching / hard rolling", "Stem popped out of star base"],
    icon: "RotateCw"
  },
  {
    id: "armrest-replacement",
    title: "Armrest Assembly & Repairs",
    subtitle: "Fixed & Height-Adjustable T-Arms",
    description: "Repair broken arm brackets, loose bolts, or worn-out pads with durable OEM-grade fixed or 1D/2D adjustable armrests.",
    turnaround: "1–2 Days",
    commonIssues: ["Armrest cracked or snapped", "Padding torn or peeling", "Height lock mechanism broken"],
    icon: "Shield"
  },
  {
    id: "cushion-upholstery",
    title: "Foam Cushioning & Upholstery",
    subtitle: "45+ Density Molded Polyurethane",
    description: "Revitalize flat, compressed foam cushions with virgin 45+ density molded PU foam and fresh breathable mesh or executive leatherette.",
    turnaround: "2–3 Days",
    commonIssues: ["Wood base felt through foam", "Torn fabric or leatherette peeling", "Stained or worn seat base"],
    icon: "Sparkles"
  },
  {
    id: "mechanism-base",
    title: "Tilt Mechanism & Star Base Repair",
    subtitle: "Multi-Lock Plates & Chrome Bases",
    description: "Fix dangerous tilt wobble, weld-cracks, or split plastic bases by replacing with die-cast chrome or heavy reinforced nylon bases.",
    turnaround: "1–2 Days",
    commonIssues: ["Chair wobbles or leans sideways", "Tilt lock does not hold upright", "Base prong cracked"],
    icon: "Wrench"
  },
  {
    id: "amc-service",
    title: "Office Annual Maintenance (AMC)",
    subtitle: "Bulk Seating Care for Companies",
    description: "Periodic preventative inspection, lubricating, bolt re-torquing, and hygiene care for institutions and corporate offices with 10+ chairs.",
    turnaround: "Quarterly or Annual Schedules",
    commonIssues: ["Squeaking noise in office", "Preventative life extension", "Standardized fleet audit"],
    icon: "Building"
  }
];
