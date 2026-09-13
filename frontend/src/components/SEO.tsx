import React, { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  schemaType?: 'website' | 'product' | 'faq' | 'contact' | 'service';
  productData?: {
    name: string;
    description: string;
    image: string;
    category: string;
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalPath = '/',
  ogImage = '/images/brand/balaji-chairs-card.jpg',
  schemaType = 'website',
  productData
}) => {
  const fullTitle = title
    ? `${title} | ${siteConfig.brandName} Unnao`
    : `${siteConfig.brandName} | Innovative Creations — Office Chairs & Furniture in Unnao`;

  const metaDesc = description ||
    "Balaji Chairs, Unnao — office chairs, revolving chairs, visitor chairs, stools and office furniture solutions. Visit our showroom at 941, Anwar Market, Daroga Bagh, Civil Lines or enquire today.";

  const canonicalUrl = `https://balajichairs.in${canonicalPath}`;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    setMetaTag('description', metaDesc);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', metaDesc, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', metaDesc);
    setMetaTag('twitter:image', ogImage);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Injected Structured Data
    const scriptId = 'dynamic-jsonld-schema';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }

    const schemas: any[] = [
      {
        "@context": "https://schema.org",
        "@type": "FurnitureStore",
        "name": siteConfig.brandLegal,
        "alternateName": siteConfig.brandName,
        "image": "https://balajichairs.in/images/brand/balaji-logo.png",
        "telephone": siteConfig.phoneRaw,
        "url": "https://balajichairs.in/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": `${siteConfig.address.line1}, ${siteConfig.address.locality}, ${siteConfig.address.area}`,
          "addressLocality": siteConfig.address.city,
          "addressRegion": siteConfig.address.state,
          "postalCode": siteConfig.address.pincode,
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": siteConfig.coordinates.lat,
          "longitude": siteConfig.coordinates.lng
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "20:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Sunday"],
            "opens": "11:00",
            "closes": "18:00"
          }
        ],
        "priceRange": "$$"
      }
    ];

    // BreadcrumbList Schema
    const pathParts = canonicalPath.split('/').filter(Boolean);
    const breadcrumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://balajichairs.in/"
        },
        ...pathParts.map((part, index) => ({
          "@type": "ListItem",
          "position": index + 2,
          "name": part.charAt(0).toUpperCase() + part.slice(1),
          "item": `https://balajichairs.in/${pathParts.slice(0, index + 1).join('/')}`
        }))
      ]
    };
    schemas.push(breadcrumbs);

    // Optional Product Schema
    if (productData) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "Product",
        "name": productData.name,
        "description": productData.description,
        "image": `https://balajichairs.in${productData.image}`,
        "category": productData.category,
        "brand": {
          "@type": "Brand",
          "name": siteConfig.brandName
        },
        "offers": {
          "@type": "Offer",
          "priceCurrency": "INR",
          "price": "0.00",
          "availability": "https://schema.org/InStock",
          "description": "Price on request upon customized office specification"
        }
      });
    }

    scriptElement.textContent = JSON.stringify(schemas);
  }, [fullTitle, metaDesc, canonicalUrl, ogImage, productData]);

  return null;
};
