import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyActionBar } from "@/components/layout/MobileStickyActionBar";
import { getPublicSiteSettings } from "@/lib/queries/public";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { I18nProvider } from "@/components/i18n/I18nProvider";
import { isValidLocale, DEFAULT_LOCALE, LOCALES, type SupportedLocale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function PublicLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await props.params;
  const locale: SupportedLocale = isValidLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const [dictionary, settings] = await Promise.all([
    getDictionary(locale),
    getPublicSiteSettings(locale),
  ]);

  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <div className="flex flex-col min-h-screen">
        {/* Accessible skip link for keyboard & assistive technology users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-modal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary font-semibold text-sm transition-all"
        >
          {dictionary.common?.skipToContent || "Skip to main content"}
        </a>

        {/*
          Header is fixed-positioned and renders its own spacer div,
          so the page content naturally starts below it without extra padding here.
        */}
        <Header settings={settings} currentLocale={locale} />
        <main id="main-content" className="flex-1 pb-16 lg:pb-0 focus:outline-none" tabIndex={-1}>
          {props.children}
        </main>
        <Footer settings={settings} currentLocale={locale} />

        {/* Persistent Mobile Quick Actions (Emergency Call, Clinic Call, Directions, Contact) */}
        <MobileStickyActionBar settings={settings} currentLocale={locale} />
      </div>
    </I18nProvider>
  );
}
