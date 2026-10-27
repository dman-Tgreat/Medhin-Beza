import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL, HOSPITAL_SEO_KEYWORDS, localizedAlternates } from "@/lib/seo";
import { getPublicSiteSettings } from "@/lib/queries/public";
import { isValidLocale, DEFAULT_LOCALE, type SupportedLocale } from "@/lib/i18n/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const rawLocale = headerList.get("x-locale");
  const locale: SupportedLocale = rawLocale && isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const settings = await getPublicSiteSettings(locale);
  const siteTitle = settings.seoTitle || `${settings.hospitalName} | ${settings.tagline}`;
  const siteDesc = settings.seoDescription || settings.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: siteTitle,
      template: `%s | ${settings.hospitalName}`,
    },
    description: siteDesc,
    keywords: HOSPITAL_SEO_KEYWORDS,
    authors: [{ name: settings.hospitalName, url: SITE_URL }],
    creator: settings.hospitalName,
    publisher: settings.hospitalName,
    formatDetection: {
      telephone: true,
      address: true,
      email: true,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: localizedAlternates(`/${locale}`),
    openGraph: {
      type: "website",
      siteName: settings.hospitalName,
      title: siteTitle,
      description: siteDesc,
      url: `${SITE_URL}/${locale}`,
      locale: locale === "am" ? "am_ET" : locale === "om" ? "om_ET" : "en_US",
      images: [
        {
          url: "/logo.png",
          width: 512,
          height: 512,
          alt: `${settings.hospitalName} Logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: siteDesc,
      images: ["/logo.png"],
    },
    icons: {
      icon: [
        { url: "/icon.png", type: "image/png" },
        { url: "/logo.png", type: "image/png" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    other: {
      "geo.region": "ET-OR",
      "geo.placename": "Adama",
      "geo.position": "8.5395;39.2731",
      "ICBM": "8.5395, 39.2731",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const rawLocale = headerList.get("x-locale");
  const locale: SupportedLocale = rawLocale && isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`h-full antialiased scroll-smooth ${inter.variable}`}>
      <body className="min-h-full flex flex-col bg-background text-text font-sans">
        {children}
      </body>
    </html>
  );
}
