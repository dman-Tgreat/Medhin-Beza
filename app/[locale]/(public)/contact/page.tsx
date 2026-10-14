import type { Metadata } from "next";
import { PageHero } from "@/components/sections/Hero";
import { ContactFormClient } from "@/components/public/ContactFormClient";
import { getPublicDepartments, getPublicSiteSettings } from "@/lib/queries/public";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { isSupportedLocale, DEFAULT_LOCALE, type SupportedLocale } from "@/lib/i18n/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { contactPointJsonLd, HOSPITAL_SEO_KEYWORDS } from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await props.params;
  const locale: SupportedLocale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const [settings, dict] = await Promise.all([
    getPublicSiteSettings(locale),
    getDictionary(locale),
  ]);
  return {
    title: `${dict.contact?.title || "Contact & Location"} | ${settings.hospitalName}`,
    description:
      dict.contact?.subtitle ||
      `Get in touch with ${settings.hospitalName} in Adama, Ethiopia for general inquiries, clinical appointments, emergency admissions, and medical department contacts.`,
    keywords: [
      "Contact Medhen Beza Hospital",
      "Medhen Beza Hospital Adama location",
      "Medhen Beza Hospital phone number",
      "Hospital phone number Adama",
      ...HOSPITAL_SEO_KEYWORDS,
    ],
  };
}

export default async function ContactPage(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await props.params;
  const locale: SupportedLocale = isSupportedLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const [departments, settings, dict] = await Promise.all([
    getPublicDepartments(locale),
    getPublicSiteSettings(locale),
    getDictionary(locale),
  ]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <JsonLd data={contactPointJsonLd(settings)} />
      <PageHero
        title={`${dict.nav?.contact || "Contact"} ${settings.hospitalName}`}
        description={dict.contact?.subtitle || "Our patient helpdesk and medical administrative staff are available to assist with appointments, specialist inquiries, and admissions."}
        badge={dict.nav?.contact || "Get in Touch"}
        breadcrumbs={[{ label: dict.nav?.contact || "Contact" }]}
      />

      <ContactFormClient departments={departments} settings={settings} />
    </div>
  );
}
