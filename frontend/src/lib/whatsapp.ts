import { siteConfig } from '../data/siteConfig';

export interface WhatsAppIntentOptions {
  productName?: string;
  categoryName?: string;
  customerName?: string;
  requirement?: string;
  serviceType?: string;
  quantity?: number | string;
}

export function generateWhatsAppUrl(options: WhatsAppIntentOptions = {}): string {
  const phone = siteConfig.whatsappRaw;
  let message = `Hello Balaji Chairs,`;

  if (options.customerName) {
    message += ` my name is ${options.customerName.trim()}.`;
  }

  if (options.productName) {
    message += ` I am interested in inquiring about the "${options.productName}".`;
  } else if (options.serviceType) {
    message += ` I require repair service for "${options.serviceType}".`;
  } else if (options.categoryName) {
    message += ` I am looking for options in "${options.categoryName}".`;
  } else if (options.requirement) {
    message += ` I am inquiring regarding: ${options.requirement}.`;
  } else {
    message += ` I would like to inquire about office chairs and furniture solutions.`;
  }

  if (options.quantity) {
    message += ` (Estimated quantity: ${options.quantity})`;
  }

  message += ` Please share catalog details and best quotation. Thank you!`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
