"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { fade } from "@/components/Motion";
import { locales } from "@/lib/i18n";

const labels: Record<string, string> = {
  vi: "VI",
  zh: "ZH",
  ko: "KO",
};

function buildHref(
  pathname: string | null,
  searchParams: ReturnType<typeof useSearchParams>,
  targetLocale: string
) {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  if (segments.length === 0) {
    return `/${targetLocale}`;
  }
  segments[0] = targetLocale;
  const path = `/${segments.join("/")}`;
  const query = searchParams?.toString();
  return query ? `${path}?${query}` : path;
}

export default function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const shouldReduceMotion = useReducedMotion();

  const buttons = useMemo(
    () =>
      locales.map((code) => ({
        code,
        label: labels[code] ?? code.toUpperCase(),
      })),
    []
  );

  return (
    <motion.nav
      aria-label="Language switcher"
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "show"}
      variants={fade}
      className="flex items-center gap-1 rounded-full bg-slate-100 p-1"
    >
      {buttons.map(({ code, label }) => {
        const active = code === locale;
        const href = buildHref(pathname, searchParams, code);

        return (
          <Link
            key={code}
            href={href}
            className={[
              "rounded-full px-3 py-1 text-sm font-semibold transition",
              active
                ? "bg-sky-600 text-white shadow-md"
                : "text-slate-600 hover:bg-white hover:text-slate-900",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </Link>
        );
      })}
    </motion.nav>
  );
}
