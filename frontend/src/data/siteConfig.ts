export interface SiteConfig {
  brandName: string;
  brandLegal: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: {
    line1: string;
    locality: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    fullText: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleMapsUrl: string;
  googleMapsEmbed: string;
  businessHours: {
    days: string;
    hours: string;
  }[];
  trustBadges: {
    title: string;
    subtitle: string;
  }[];
}

export const siteConfig: SiteConfig = {
  brandName: "BALAJI CHAIRS™",
  brandLegal: "Balaji Chairs - Innovative Creations",
  tagline: "INNOVATIVE CREATIONS",
  phone: "+91 78803 53900",
  phoneRaw: "+917880353900",
  whatsapp: "+91 78803 53900",
  whatsappRaw: "917880353900",
  email: "contact@balajichairs.in",
  address: {
    line1: "941, Anwar Market",
    locality: "Daroga Bagh",
    area: "Civil Lines",
    city: "Unnao",
    state: "Uttar Pradesh",
    pincode: "209801",
    country: "India",
    fullText: "941, Anwar Market, Daroga Bagh, Civil Lines, Unnao, Uttar Pradesh – 209801, India"
  },
  coordinates: {
    lat: 26.5444,
    lng: 80.4878
  },
  googleMapsUrl: "https://maps.google.com/?q=941+Anwar+Market+Daroga+Bagh+Civil+Lines+Unnao+Uttar+Pradesh+209801",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.2!2d80.4878!3d26.5444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399c470000000001%3A0x1!2sCivil%20Lines%2C%20Unnao%2C%20Uttar%20Pradesh%20209801!5e0!3m2!1sen!2sin!4v1700000000000",
  businessHours: [
    { days: "Monday – Saturday", hours: "10:00 AM – 8:30 PM" },
    { days: "Sunday", hours: "11:00 AM – 6:00 PM" }
  ],
  trustBadges: [
    { title: "Specialist Seating", subtitle: "Revolving & Visitor Chairs" },
    { title: "Direct Showroom", subtitle: "Civil Lines, Unnao" },
    { title: "Local Service", subtitle: "On-site Chair Repairs & AMC" },
    { title: "Tailored Enquiries", subtitle: "Instant Quotations" }
  ]
};
