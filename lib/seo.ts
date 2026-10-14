import type { Metadata } from "next";
import { HOSPITAL_INFO } from "@/lib/constants";

export const SITE_URL = (
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://medhenbeza.com")
).replace(/\/$/, "");

export function absoluteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

function descriptionFallback(value: string | undefined, fallback: string) {
  const text = (value || fallback).replace(/\s+/g, " ").trim();
  return text.length > 170 ? `${text.slice(0, 167).trimEnd()}...` : text;
}

// ─── Search Engine Optimization: Brand Alternate Spellings ───────────────────
// Captures phonetic, transliteration, and localized variations across search engines
export const HOSPITAL_ALTERNATE_NAMES = [
  "Medhen Beza Hospital",
  "Medhin Beza Hospital",
  "Medhen Beza General Hospital",
  "Medhin Beza General Hospital",
  "Medhen Beza",
  "Medhin Beza",
  "Medhenbeza Hospital",
  "Medhinbeza Hospital",
  "Medhenbeza",
  "Medhinbeza",
  "መድህን ቤዛ ሆስፒታል",
  "መድህን ቤዛ",
  "መድኀን ቤዛ ሆስፒታል",
  "መድኀን ቤዛ",
  "Hospitaala Medhin Beza",
  "Hospitaala Medhen Beza",
  "Hospitaala Madda Medhin Beza",
] as const;

export const HOSPITAL_SEO_KEYWORDS = [
  "Medhen Beza Hospital",
  "Medhin Beza Hospital",
  "Medhen Beza",
  "Medhin Beza",
  "መድህን ቤዛ ሆስፒታል",
  "መድህን ቤዛ",
  "Hospitaala Medhin Beza",
  "Hospital in Adama",
  "Best Hospital in Adama",
  "Adama General Hospital",
  "Emergency Hospital Adama",
  "24/7 Emergency Care Adama",
  "Doctors in Adama",
  "Adama Healthcare Ethiopia",
  "Private Hospital Adama",
  "Maternity Hospital Adama",
  "Pediatric Care Adama",
  "Surgical Specialist Adama",
  "Cardiology Adama Ethiopia",
];

export function contentMetadata(input: {
  title: string;
  description?: string;
  path: string;
  image?: string;
  canonicalUrl?: string | null;
  type?: "website" | "article";
  siteName?: string;
  keywords?: string[];
}): Metadata {
  const description = descriptionFallback(input.description, HOSPITAL_INFO.description);
  const url = absoluteUrl(input.canonicalUrl || input.path);
  const image = input.image ? absoluteUrl(input.image) : absoluteUrl("/logo.png");
  const siteName = input.siteName || HOSPITAL_INFO.name;

  return {
    title: input.title,
    description,
    keywords: input.keywords || HOSPITAL_SEO_KEYWORDS,
    alternates: { canonical: url },
    openGraph: {
      type: input.type || "website",
      url,
      title: input.title,
      description,
      siteName,
      images: [
        {
          url: image,
          alt: `${input.title} | ${siteName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description,
      images: [image],
    },
  };
}

// ─── Schema.org Structured Data ───────────────────────────────────────────────

/**
 * 1. Hospital Knowledge Graph & Local SEO Schema
 * Direct signals to Google Knowledge Panel, Google Maps / Local 3-Pack
 */
export function hospitalJsonLd(settings?: {
  hospitalName?: string;
  description?: string;
  generalPhone?: string;
  emergencyPhone?: string;
  ambulancePhone?: string;
  email?: string;
  address?: string;
  city?: string;
  country?: string;
  telegram?: string;
}) {
  const name = settings?.hospitalName || HOSPITAL_INFO.name;
  const description = settings?.description || HOSPITAL_INFO.description;
  const generalPhone = settings?.generalPhone || HOSPITAL_INFO.generalPhone;
  const emergencyPhone = settings?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;
  const address = settings?.address || HOSPITAL_INFO.address;
  const email = settings?.email || HOSPITAL_INFO.email;
  const city = settings?.city || "Adama";
  const country = settings?.country || "ET";

  // GPS coordinates for Adama campus
  const latitude = 8.5395;
  const longitude = 39.2731;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "@id": `${SITE_URL}/#hospital`,
    name,
    legalName: "Medhen Beza Hospital",
    alternateName: HOSPITAL_ALTERNATE_NAMES,
    description,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/logo.png"),
      width: 512,
      height: 512,
    },
    image: [
      absoluteUrl("/logo.png"),
      absoluteUrl("/icon.png"),
    ],
    telephone: generalPhone,
    email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address,
      addressLocality: city,
      addressRegion: "Oromia",
      postalCode: "1000",
      addressCountry: country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    hasMap: googleMapsUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    ],
    emergencyService: {
      "@type": "EmergencyService",
      name: `${name} 24/7 Emergency & Trauma Center`,
      telephone: emergencyPhone,
      openingHours: "Mo-Su 00:00-23:59",
      areaServed: "Adama and Oromia Region",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: emergencyPhone,
        contactType: "emergency",
        availableLanguage: ["English", "Amharic", "Oromo"],
        areaServed: "ET",
      },
      {
        "@type": "ContactPoint",
        telephone: generalPhone,
        contactType: "customer service",
        availableLanguage: ["English", "Amharic", "Oromo"],
        areaServed: "ET",
      },
    ],
    medicalSpecialty: [
      "EmergencyMedicine",
      "Cardiovascular",
      "Obstetrics",
      "Gynecology",
      "Pediatrics",
      "Surgical",
      "InternalMedicine",
      "Radiology",
      "Orthopedics",
      "Neurology",
      "Gastroenterology",
    ],
    priceRange: "$$",
    currenciesAccepted: "ETB",
    paymentAccepted: "Cash, Telebirr, CBE Birr, Debit Cards",
    sameAs: [
      settings?.telegram || HOSPITAL_INFO.telegram,
      googleMapsUrl,
    ].filter(Boolean),
  };
}

/**
 * 2. Google Sitelinks SearchBox & WebSite Authority Schema
 * Enables the prominent Google Sitelinks Search box and sitelink shortcuts
 */
export function websiteJsonLd(locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "Medhen Beza Hospital",
    alternateName: HOSPITAL_ALTERNATE_NAMES,
    publisher: {
      "@id": `${SITE_URL}/#hospital`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/${locale}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: ["en", "am", "om"],
  };
}

/**
 * 3. Emergency Service Rich Schema
 * Specific markup for the 24/7 trauma & emergency department
 */
export function emergencyServiceJsonLd(settings?: {
  hospitalName?: string;
  emergencyPhone?: string;
  address?: string;
  city?: string;
}) {
  const name = settings?.hospitalName || HOSPITAL_INFO.name;
  const emergencyPhone = settings?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;

  return {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: `${name} 24/7 Emergency & Critical Response`,
    telephone: emergencyPhone,
    url: `${SITE_URL}/en/emergency`,
    openingHours: "Mo-Su 00:00-23:59",
    parentOrganization: {
      "@id": `${SITE_URL}/#hospital`,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || HOSPITAL_INFO.address,
      addressLocality: settings?.city || "Adama",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 8.5395,
      longitude: 39.2731,
    },
    hasMap: "https://www.google.com/maps/dir/?api=1&destination=8.5395,39.2731",
  };
}

/**
 * 4. Contact & Location Schema
 */
export function contactPointJsonLd(settings?: {
  hospitalName?: string;
  generalPhone?: string;
  emergencyPhone?: string;
  email?: string;
  address?: string;
  city?: string;
}) {
  const name = settings?.hospitalName || HOSPITAL_INFO.name;
  const phone = settings?.generalPhone || HOSPITAL_INFO.generalPhone;
  const emergency = settings?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;

  return {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name,
    telephone: phone,
    email: settings?.email || HOSPITAL_INFO.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || HOSPITAL_INFO.address,
      addressLocality: settings?.city || "Adama",
      addressRegion: "Oromia",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 8.5395,
      longitude: 39.2731,
    },
    hasMap: "https://www.google.com/maps/dir/?api=1&destination=8.5395,39.2731",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: emergency,
        contactType: "emergency",
        availableLanguage: ["English", "Amharic", "Oromo"],
      },
      {
        "@type": "ContactPoint",
        telephone: phone,
        contactType: "customer service",
        availableLanguage: ["English", "Amharic", "Oromo"],
      },
    ],
  };
}

export function hospitalReference(settings?: { hospitalName?: string } | string) {
  const name = typeof settings === "string" ? settings : settings?.hospitalName || HOSPITAL_INFO.name;
  return { "@type": "Hospital", name, url: SITE_URL };
}
