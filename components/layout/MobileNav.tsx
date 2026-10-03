"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { MOBILE_NAV_LINKS } from "@/lib/constants";
import { EmergencyButton } from "@/components/ui/emergency-button";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { SupportedLocale } from "@/lib/i18n/config";
import type { PublicSiteSettings } from "@/lib/queries/public";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  settings?: PublicSiteSettings;
  currentLocale?: SupportedLocale;
}

const NAV_TRANSLATION_KEYS: Record<string, string> = {
  "/": "nav.home",
  "/services": "nav.services",
  "/departments": "nav.departments",
  "/doctors": "nav.doctors",
  "/facilities": "nav.facilities",
  "/about": "nav.about",
  "/news": "nav.news",
  "/events": "nav.events",
  "/careers": "nav.careers",
  "/gallery": "nav.gallery",
  "/faqs": "nav.faqs",
  "/contact": "nav.contact",
  "/emergency": "nav.emergency",
};

export function MobileNav({ isOpen, onClose, settings, currentLocale }: MobileNavProps) {
  const pathname = usePathname();
  const { t, locale } = useI18n();
  const effectiveLocale = currentLocale || locale;
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-text/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          "fixed top-0 right-0 bottom-0 z-50 w-[min(320px,90vw)]",
          "bg-surface flex flex-col shadow-modal",
          "transition-transform duration-300 ease-in-out lg:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer header with Hospital Logo */}
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border bg-surface">
          <Link
            href={`/${effectiveLocale}`}
            onClick={onClose}
            className="flex items-center gap-3 min-w-0 group"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border-2 border-primary/20 bg-white p-0.5 shadow-xs">
              <Image
                src="/logo.png"
                alt={settings?.hospitalName || "Hospital Logo"}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0 leading-tight">
              <span className="font-extrabold text-sm text-text truncate">
                {settings?.hospitalName || "Medhen Beza"}
              </span>
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                Hospital
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            aria-label={t("nav.closeMenu")}
            className={cn(
              "w-10 h-10 flex items-center justify-center rounded-lg shrink-0",
              "text-text-muted hover:text-text hover:bg-background transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            )}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Language selector in mobile drawer */}
        <div className="px-4 py-3 border-b border-border bg-surface/50">
          <LanguageSwitcher currentLocale={effectiveLocale} variant="mobile" />
        </div>

        {/* Nav links — scrollable */}
        <nav
          aria-label="Mobile navigation"
          className="flex-1 overflow-y-auto px-4 py-4"
        >
          <ul className="flex flex-col gap-1">
            {MOBILE_NAV_LINKS.map((link, i) => {
              const targetHref = `/${effectiveLocale}${link.href === "/" ? "" : link.href}`;
              const isActive =
                link.href === "/"
                  ? pathname === `/${effectiveLocale}` || pathname === "/"
                  : pathname.startsWith(targetHref);
              const label = NAV_TRANSLATION_KEYS[link.href] ? t(NAV_TRANSLATION_KEYS[link.href]) : link.name;

              return (
                <li key={link.href}>
                  <Link
                    href={targetHref}
                    ref={i === 0 ? firstLinkRef : undefined}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium",
                      "transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset",
                      isActive
                        ? "bg-primary-light text-primary font-semibold"
                        : "text-text-muted hover:bg-background hover:text-text"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Pinned Emergency action */}
        <div className="px-5 py-5 border-t border-border bg-emergency-light/40">
          <p className="text-xs text-text-muted mb-3 font-medium uppercase tracking-wider">
            {t("common.emergency247")}
          </p>
          <EmergencyButton
            phone={settings?.emergencyPhone}
            className="w-full justify-center"
            size="lg"
          />
        </div>
      </div>
    </>
  );
}
