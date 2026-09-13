export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  requirement: string;
  product?: string;
  message?: string;
  source: 'website_modal' | 'contact_page' | 'whatsapp_intent' | 'product_page';
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface RepairRequest {
  id: string;
  name: string;
  phone: string;
  chairType: string;
  issueTypes: string[];
  quantity: number;
  location: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'scheduled' | 'completed';
}

export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappMessagePrefill: string;
  address: {
    line1: string;
    locality: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  googleMapsLink: string;
  businessHours: {
    days: string;
    hours: string;
  }[];
}
