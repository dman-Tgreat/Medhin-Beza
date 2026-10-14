"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, PhoneCall } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ROOT_APPLICATION_ERROR]", error);
  }, [error]);

  const emergencyPhone = HOSPITAL_INFO.emergencyPhone;
  const emergencyPhoneRaw = emergencyPhone.replace(/\s/g, "");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold text-slate-900">
            System Notice
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            An unexpected error occurred while loading this page. Our technical team has been notified.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-left flex items-center justify-between gap-3 text-xs">
          <div>
            <p className="font-bold text-red-700">24/7 Emergency Line</p>
            <p className="text-slate-600">{emergencyPhone}</p>
          </div>
          <a
            href={`tel:${emergencyPhoneRaw}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 transition-colors shadow-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
