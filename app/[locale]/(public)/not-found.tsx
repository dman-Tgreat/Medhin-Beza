"use client";

import Link from "next/link";
import {
  AlertTriangle,
  PhoneCall,
  UserSearch,
  Stethoscope,
  Building2,
  Home,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { HOSPITAL_INFO } from "@/lib/constants";

export default function PublicNotFound() {
  const { t, locale } = useI18n();

  const emergencyPhone = HOSPITAL_INFO.emergencyPhone;
  const emergencyPhoneRaw = emergencyPhone.replace(/\s/g, "");

  const quickLinks = [
    {
      icon: UserSearch,
      label: t("home.findDoctor") || "Find a Doctor",
      desc: t("home.findDoctorDesc") || "Browse our specialist physicians",
      href: `/${locale}/doctors`,
    },
    {
      icon: Stethoscope,
      label: t("home.ourServices") || "Clinical Services",
      desc: t("home.ourServicesDesc") || "Explore multidisciplinary treatments",
      href: `/${locale}/services`,
    },
    {
      icon: Building2,
      label: t("home.departments") || "Departments",
      desc: t("home.departmentsDesc") || "Explore specialized clinical units",
      href: `/${locale}/departments`,
    },
    {
      icon: ShieldAlert,
      label: t("home.emergencyCare") || "Emergency Services",
      desc: "24/7 critical trauma dispatch and response",
      href: `/${locale}/emergency`,
    },
  ];

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16 px-4 bg-background">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Top Icon & Badge */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary-light text-primary mx-auto flex items-center justify-center shadow-xs">
            <HelpCircle className="w-9 h-9" strokeWidth={1.75} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface border border-border text-text-muted">
            404 • Resource Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight">
            {t("common.pageNotFound") || "Page Not Found"}
          </h1>
          <p className="text-base text-text-muted max-w-lg mx-auto leading-relaxed">
            {t("common.pageNotFoundDesc") ||
              "The page, medical specialist profile, or hospital service you are looking for may have been relocated or is currently unavailable."}
          </p>
        </div>

        {/* 🚨 High-Priority Emergency Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-emergency-light/60 border border-emergency/30 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emergency text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-bold text-emergency">
                Is this an urgent medical situation?
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-snug">
                {t("common.urgentHelpNotice") ||
                  "Do not delay care. Call our 24/7 emergency dispatch immediately."}
              </p>
            </div>
          </div>

          <a
            href={`tel:${emergencyPhoneRaw}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emergency text-white font-bold text-xs uppercase tracking-wider hover:bg-emergency-dark transition-colors shrink-0 shadow-xs w-full sm:w-auto"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{emergencyPhone}</span>
          </a>
        </div>

        {/* Helpful Patient Quick Links */}
        <div className="space-y-3 text-left">
          <p className="text-xs font-bold uppercase tracking-wider text-text-muted px-1">
            Explore Hospital Resources
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 p-4 rounded-xl bg-surface border border-border hover:border-primary/40 hover:shadow-sm transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text group-hover:text-primary transition-colors flex items-center gap-1">
                      {item.label}
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                    </p>
                    <p className="text-xs text-text-muted truncate mt-0.5">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Return to Home CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
            <Link href={`/${locale}`}>
              <Home className="w-4 h-4 mr-2" />
              {t("common.returnHome") || "Return to Homepage"}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
            <Link href={`/${locale}/contact`}>
              {t("nav.contact") || "Contact Information Desk"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
