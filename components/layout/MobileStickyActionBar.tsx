"use client";

import React from "react";
import Link from "next/link";
import { PhoneCall, Phone, Navigation, Mail, AlertTriangle } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { HOSPITAL_INFO } from "@/lib/constants";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicSiteSettings } from "@/lib/queries/public";

interface MobileStickyActionBarProps {
  settings?: PublicSiteSettings;
  currentLocale?: SupportedLocale;
}

export function MobileStickyActionBar({
  settings,
  currentLocale,
}: MobileStickyActionBarProps) {
  const { t, locale } = useI18n();
  const effectiveLocale = currentLocale || locale;

  const emergencyPhone = settings?.emergencyPhone || HOSPITAL_INFO.emergencyPhone;
  const emergencyPhoneRaw = emergencyPhone.replace(/\s/g, "");

  const generalPhone = settings?.generalPhone || HOSPITAL_INFO.generalPhone;
  const generalPhoneRaw = generalPhone.replace(/\s/g, "");

  // Coordinates for Adama Campus navigation
  const latitude = 8.5395;
  const longitude = 39.2731;
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <nav
      aria-label="Mobile quick actions"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-surface/95 backdrop-blur-md border-t border-border shadow-[0_-4px_20px_rgba(15,23,42,0.08)] px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]"
    >
      <div className="grid grid-cols-4 gap-1.5 items-center max-w-md mx-auto">
        {/* 1. Emergency Call (High contrast red) */}
        <a
          href={`tel:${emergencyPhoneRaw}`}
          aria-label={`Call 24/7 Emergency Hotline at ${emergencyPhone}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl bg-emergency/10 border border-emergency/30 text-emergency font-bold text-center active:scale-95 transition-transform"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 animate-bounce text-emergency" strokeWidth={2.5} />
            <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-emergency text-white text-[9px] rounded-full font-black leading-none">
              24/7
            </span>
          </div>
          <span className="text-[11px] font-extrabold mt-0.5 tracking-tight text-emergency line-clamp-1">
            {t("common.emergencyCall") || "Emergency"}
          </span>
        </a>

        {/* 2. Clinic Switchboard Call */}
        <a
          href={`tel:${generalPhoneRaw}`}
          aria-label={`Call Hospital Switchboard at ${generalPhone}`}
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-text hover:bg-background text-center active:scale-95 transition-transform min-h-[48px]"
        >
          <Phone className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="text-[11px] font-semibold mt-0.5 tracking-tight text-text line-clamp-1">
            {t("common.switchboard") || "Call Us"}
          </span>
        </a>

        {/* 3. Turn-by-Turn Directions in Google Maps */}
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get turn-by-turn driving directions to hospital"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-text hover:bg-background text-center active:scale-95 transition-transform min-h-[48px]"
        >
          <Navigation className="w-5 h-5 text-secondary" strokeWidth={2} />
          <span className="text-[11px] font-semibold mt-0.5 tracking-tight text-text line-clamp-1">
            {t("common.directions") || "Directions"}
          </span>
        </a>

        {/* 4. Contact & Inquiries */}
        <Link
          href={`/${effectiveLocale}/contact`}
          aria-label="Contact hospital information desk"
          className="flex flex-col items-center justify-center p-1.5 rounded-xl text-text hover:bg-background text-center active:scale-95 transition-transform min-h-[48px]"
        >
          <Mail className="w-5 h-5 text-primary" strokeWidth={2} />
          <span className="text-[11px] font-semibold mt-0.5 tracking-tight text-text line-clamp-1">
            {t("nav.contact") || "Contact"}
          </span>
        </Link>
      </div>
    </nav>
  );
}
