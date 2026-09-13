export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'products' | 'repair' | 'orders';
}

export const faqs: FAQItem[] = [
  {
    question: "Do you supply office chairs in Unnao and nearby regions?",
    answer: "Yes. Balaji Chairs is conveniently located in Anwar Market, Daroga Bagh, Civil Lines, Unnao. We provide direct showroom viewing, delivery, and installation support across Unnao city, Shukla Ganj, and neighboring corporate corridors.",
    category: "general"
  },
  {
    question: "Can I test and try out chairs before placing an order?",
    answer: "Absolutely! We encourage you to visit our Unnao showroom (Mon–Sat 10:00 AM – 8:30 PM, Sun 11:00 AM – 6:00 PM) to sit on different ergonomic models, test lumbar fits, test hydraulic lifts, and examine leatherette or mesh finishes in person.",
    category: "products"
  },
  {
    question: "My existing revolving chair is sinking or has broken wheels. Can it be repaired?",
    answer: "Yes, don't discard your chair! We provide professional repair services including nitrogen hydraulic gas-lift replacement (Class 3 & 4), heavy-duty caster wheel replacement, tilt mechanism alignment, armrest repairs, and foam re-cushioning.",
    category: "repair"
  },
  {
    question: "Do you cater to bulk office furnishing and institutional orders?",
    answer: "Yes. We regularly supply corporate cabins, schools, hospitals, IT centers, and coaching academies with coordinated revolving chairs, visitor seating, executive desks, and team workstations at competitive commercial project rates.",
    category: "orders"
  },
  {
    question: "How do I request a quotation or price estimate?",
    answer: "Simply tap the 'Enquire Now' button on any product card, click the WhatsApp button to send an instant prefilled message with your requirements, or call us directly at +91 78803 53900.",
    category: "general"
  },
  {
    question: "What warranties or guarantees do your chairs come with?",
    answer: "Our premium revolving chairs feature industrial-grade components including Class 4 hydraulic cylinders and reinforced star bases engineered for long commercial lifespans. We stand behind our workmanship with direct local service support.",
    category: "products"
  }
];
