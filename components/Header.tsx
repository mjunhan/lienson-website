"use client";

import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import LangSwitch from "@/components/LangSwitch";
import { fade } from "@/components/Motion";

const navKeys = ["products", "about", "blog", "contact"] as const;

export default function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const navItems = useMemo(
    () =>
      navKeys.map((key) => ({
        key,
        label: t(key),
        href: `/${locale}/${key === "products" ? "products" : key}`,
      })),
    [t, locale]
  );

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <motion.header
      variants={fade}
      initial={shouldReduceMotion ? undefined : "hidden"}
      animate={shouldReduceMotion ? undefined : "show"}
      className="sticky top-0 z-30 w-full bg-white/80 shadow-sm backdrop-blur"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 text-lg font-semibold text-slate-900 transition hover:text-sky-700"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sky-600">
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                d="M12 3c4.5 2.4 7 5.6 7 9.8 0 4.2-2.8 8.2-7 8.2s-7-4-7-8.2C5 8.6 7.5 5.4 12 3Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 7.5c1.4 1.7 2 3.5 2 5.3 0 1.8-.8 3.6-2 4.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-base font-bold uppercase tracking-wide">
              Lien Son
            </span>
            <span className="text-xs text-slate-500">
              Bedding &amp; Lifestyle
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            {navItems.map(({ key, href, label }) => (
              <Link
                key={key}
                href={href}
                className={[
                  "relative transition hover:text-sky-700",
                  isActive(href) ? "text-sky-600" : "",
                ].join(" ")}
              >
                {label}
                {isActive(href) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-sky-500"
                  />
                )}
              </Link>
            ))}
          </nav>
          <LangSwitch />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangSwitch />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-sky-200 hover:text-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  open
                    ? "M6 6l12 12M6 18L18 6"
                    : "M4 7h16M4 12h16M4 17h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="mobile-nav"
            initial={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden"
          >
            <div className="space-y-2 border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-inner">
              {navItems.map(({ key, href, label }) => (
                <Link
                  key={key}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center justify-between rounded-xl px-3 py-3 text-base font-semibold transition",
                    isActive(href)
                      ? "bg-sky-50 text-sky-600"
                      : "text-slate-700 hover:bg-slate-100",
                  ].join(" ")}
                >
                  <span>{label}</span>
                  <span aria-hidden className="text-slate-400">
                    &gt;
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
