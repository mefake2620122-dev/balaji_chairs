import { siteConfig } from '../data/siteConfig';

export interface WhatsAppIntentOptions {
  productName?: string;
  categoryName?: string;
  customerName?: string;
  requirement?: string;
  serviceType?: string;
  quantity?: number | string;
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    (typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 768px)').matches);
}

export function generateWhatsAppMessage(options: WhatsAppIntentOptions = {}): string {
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
  return message;
}

export function generateWhatsAppUrl(options: WhatsAppIntentOptions = {}): string {
  const phone = siteConfig.whatsappRaw;
  const message = generateWhatsAppMessage(options);
  // Using api.whatsapp.com which is an officially verified Android App Link & iOS Universal Link
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppNativeUrl(options: WhatsAppIntentOptions = {}): string {
  const phone = siteConfig.whatsappRaw;
  const message = generateWhatsAppMessage(options);
  return `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(options: WhatsAppIntentOptions = {}): void {
  if (typeof window === 'undefined') return;

  const webUrl = generateWhatsAppUrl(options);
  const nativeUrl = generateWhatsAppNativeUrl(options);

  if (isMobileDevice()) {
    // Direct navigation in current window preserves touch gesture activation.
    // This allows Android / iOS to hand off to the native WhatsApp app directly
    // without opening an empty child tab or being blocked by in-app browser webviews.
    try {
      window.location.href = nativeUrl;
      setTimeout(() => {
        if (!document.hidden) {
          window.location.href = webUrl;
        }
      }, 1500);
    } catch {
      window.location.href = webUrl;
    }
  } else {
    window.open(webUrl, '_blank', 'noopener,noreferrer');
  }
}

export function openGoogleMaps(): void {
  if (typeof window === 'undefined') return;

  const isMobile = isMobileDevice();
  const mapsUrl = siteConfig.googleMapsUrl;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${siteConfig.coordinates.lat},${siteConfig.coordinates.lng}`;

  if (isMobile) {
    // On mobile devices, direct window.location.href launches the native Google Maps / Apple Maps app
    window.location.href = directionsUrl;
  } else {
    window.open(mapsUrl, '_blank', 'noopener,noreferrer');
  }
}

