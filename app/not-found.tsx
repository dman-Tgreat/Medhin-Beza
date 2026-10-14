import Link from "next/link";
import { AlertTriangle, PhoneCall, Home, HelpCircle } from "lucide-react";
import { HOSPITAL_INFO } from "@/lib/constants";
import { LOCALES, LOCALE_METADATA } from "@/lib/i18n/config";

export default function RootNotFound() {
  const emergencyPhone = HOSPITAL_INFO.emergencyPhone;
  const emergencyPhoneRaw = emergencyPhone.replace(/\s/g, "");

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 text-slate-900 font-sans">
      <div className="max-w-lg w-full text-center space-y-8 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mx-auto flex items-center justify-center shadow-xs">
          <HelpCircle className="w-9 h-9" strokeWidth={1.75} />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
            404 • Page Not Found
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {HOSPITAL_INFO.name}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            The page you requested could not be found. Please choose your language or proceed to the main portal.
          </p>
        </div>

        {/* Emergency Callout */}
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-left flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
            <div className="text-xs">
              <p className="font-bold text-red-700">24/7 Emergency Line</p>
              <p className="text-slate-600">{emergencyPhone}</p>
            </div>
          </div>
          <a
            href={`tel:${emergencyPhoneRaw}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call</span>
          </a>
        </div>

        {/* Language Selection */}
        <div className="space-y-2 text-left">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Select Language / ቋንቋ ይምረጡ / Afaan Filadhaa
          </p>
          <div className="grid grid-cols-3 gap-2">
            {LOCALES.map((loc) => {
              const meta = LOCALE_METADATA[loc];
              return (
                <Link
                  key={loc}
                  href={`/${loc}`}
                  className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-center"
                >
                  <span className="text-lg">{meta.flag}</span>
                  <span className="text-xs font-bold text-slate-800 mt-1">
                    {meta.nativeName}
                  </span>
                  <span className="text-[10px] text-slate-500">{meta.name}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div>
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Home className="w-4 h-4" />
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
