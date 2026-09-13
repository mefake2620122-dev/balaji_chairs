export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  image: string;
  itemCount: string;
}

export const projects: ProjectItem[] = [
  {
    id: "proj-01",
    title: "Executive Medical Chamber Suite",
    category: "Healthcare & Clinics",
    location: "Civil Lines, Unnao",
    description: "Equipped senior doctor consultation chambers with high-back lumbar executive chairs and heavy-gauge chrome cantilever visitor seating.",
    image: "/images/solutions/executive-spaces.webp",
    itemCount: "6 Executive Chairs, 18 Visitor Chairs"
  },
  {
    id: "proj-02",
    title: "Legal & Corporate Consultancy Office",
    category: "Professional Services",
    location: "Daroga Bagh, Unnao",
    description: "Designed a balanced workspace layout with executive boss desks, matching credenzas, and all-black ribbed conference seating.",
    image: "/images/solutions/meeting-areas.webp",
    itemCount: "1 Boardroom Table, 12 Cabin Chairs"
  },
  {
    id: "proj-03",
    title: "Commercial IT & Digital Hub",
    category: "Workstations",
    location: "Unnao Industrial Corridor",
    description: "Supplied 24 high-airflow mesh ergonomic task chairs and modular 4-cluster desks with integrated raceways for continuous coding shifts.",
    image: "/images/solutions/workstations.webp",
    itemCount: "24 Ergonomic Mesh Chairs, 6 Modular Desks"
  },
  {
    id: "proj-04",
    title: "Commercial Retail Counter & Reception",
    category: "Retail & Reception",
    location: "Anwar Market, Unnao",
    description: "Fitted 360-degree pneumatic revolving stools for billing staff along with sleek cantilever waiting seats for incoming customers.",
    image: "/images/solutions/reception-waiting.webp",
    itemCount: "8 Revolving Stools, 10 Visitor Seats"
  }
];
