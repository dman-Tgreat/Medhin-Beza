"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, PhoneCall, AlertTriangle } from "lucide-react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/button";
import { HOSPITAL_INFO } from "@/lib/constants";

export default function PublicError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t, locale } = useI18n();

  useEffect(() => {
    // Log unexpected errors for operational tracking
    console.error("[HOSPITAL_PAGE_ERROR]", error);
  }, [error]);

  const emergencyPhone = HOSPITAL_INFO.emergencyPhone;
  const emergencyPhoneRaw = emergencyPhone.replace(/\s/g, "");

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-background">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 mx-auto flex items-center justify-center shadow-xs">
            <AlertCircle className="w-9 h-9" strokeWidth={1.75} />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-surface border border-border text-amber-700">
            System Notice
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-text tracking-tight">
            {t("common.somethingWentWrong") || "Temporary Service Interruption"}
          </h1>
          <p className="text-small text-text-muted max-w-md mx-auto leading-relaxed">
            {t("common.errorNotice") ||
              "We encountered an unexpected technical issue loading this clinical page. Our administrative and technical team has been notified."}
          </p>
        </div>

        {/* 🚨 Emergency Notice Box */}
        <div className="p-5 rounded-2xl bg-emergency-light/60 border border-emergency/30 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-emergency shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-emergency uppercase tracking-wider">
                Critical Medical Notice
              </p>
              <p className="text-xs text-text-muted mt-0.5 leading-snug">
                {t("common.urgentHelpNotice") ||
                  "If this is an acute emergency, please call our 24/7 hotline directly or proceed to Gate 1."}
              </p>
            </div>
          </div>
          <a
            href={`tel:${emergencyPhoneRaw}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-emergency text-white font-bold text-xs uppercase tracking-wider hover:bg-emergency-dark transition-colors shrink-0 shadow-xs w-full sm:w-auto"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>{emergencyPhone}</span>
          </a>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            {t("common.tryAgain") || "Try Again"}
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            <Link href={`/${locale}`}>
              <Home className="w-4 h-4 mr-2" />
              {t("common.returnHome") || "Return to Homepage"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
