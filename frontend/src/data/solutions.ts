export interface OfficeSolution {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  recommendedChairs: string[];
  recommendedTables: string[];
  image: string;
}

export const solutions: OfficeSolution[] = [
  {
    id: "executive-spaces",
    title: "Executive Spaces",
    category: "Director & Leadership Cabins",
    tagline: "Presence, comfort, and architectural precision.",
    description: "Designed for leaders who spend demanding hours making pivotal decisions. Balaji executive high-back seating delivers unmatched ergonomic posture support, paired with substantial tables.",
    recommendedChairs: ["Aura High-Back Executive Chair", "Linea Ribbed Leatherette Cabin Chair"],
    recommendedTables: ["Prism Executive Desk System"],
    image: "/images/solutions/executive-spaces.webp"
  },
  {
    id: "workstations",
    title: "Open Workstations",
    category: "Team & Staff Seating",
    tagline: "Breathable comfort that keeps teams energized.",
    description: "Equip your core workspace with high-tensile mesh task seating that stays cool throughout the workday. Paired with modular clusters, integrated cable raceways, and privacy dividers.",
    recommendedChairs: ["Verve Ergonomic Mesh Task Chair"],
    recommendedTables: ["Nexus Modular 4-Person Workstation"],
    image: "/images/solutions/workstations.webp"
  },
  {
    id: "meeting-areas",
    title: "Meeting & Boardrooms",
    category: "Conference & Client Discussions",
    tagline: "Where collaboration meets focused composure.",
    description: "Conference and discussion spaces demand balanced, non-distracting seating. Our cantilever and mid-back chairs keep visitors and board members relaxed and attentive throughout long sessions.",
    recommendedChairs: ["Matrix Cantilever Visitor Chair", "Linea Ribbed Leatherette Cabin Chair"],
    recommendedTables: ["Prism Executive Desk System"],
    image: "/images/solutions/meeting-areas.webp"
  },
  {
    id: "reception-waiting",
    title: "Reception & Waiting",
    category: "Visitor Lounges & Counters",
    tagline: "The definitive first impression of your organization.",
    description: "Welcome guests with dependable, beautifully finished cantilever visitor seating and high-swivel counter stools designed to withstand heavy everyday commercial footfall.",
    recommendedChairs: ["Matrix Cantilever Visitor Chair", "Apex Pneumatic Swivel Stool"],
    recommendedTables: ["Nexus Modular 4-Person Workstation"],
    image: "/images/solutions/reception-waiting.webp"
  }
];
