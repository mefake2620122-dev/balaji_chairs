export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  badge: string;
}

export const reviews: ReviewItem[] = [
  {
    id: "rev-01",
    author: "Dr. R. K. Srivastava",
    role: "Senior Consultant & Clinic Director",
    location: "Civil Lines, Unnao",
    comment: "Furnished our consultation room and patient waiting area with Balaji Chairs. The cantilever visitor chairs and doctor's revolving chair have superb lumbar support. Very polite and prompt local service right here in Unnao.",
    rating: 5,
    badge: "Verified Client"
  },
  {
    id: "rev-02",
    author: "Sunil Verma",
    role: "Chartered Accountant & Tax Firm Principal",
    location: "Daroga Bagh, Unnao",
    comment: "Instead of buying cheap chairs online that get wobbly within 3 months, we visited the Balaji Chairs showroom at Anwar Market. The build quality of their high-back executive chair is outstanding, and they personally installed it.",
    rating: 5,
    badge: "Verified Purchase"
  },
  {
    id: "rev-03",
    author: "Mohd. Tariq",
    role: "Institute Coordinator",
    location: "Civil Lines, Unnao",
    comment: "Had 15 computer lab revolving chairs repaired with new hydraulic cylinders and wheels. Saved our institute nearly 60% compared to buying new chairs. Quick turnaround and genuine heavy-duty components.",
    rating: 5,
    badge: "Verified Repair Client"
  }
];
