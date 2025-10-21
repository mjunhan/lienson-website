"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import ContactForm from "@/components/ContactForm";
import { scaleIn } from "@/components/Motion";

type ProductInquiryProps = {
  locale: string;
  productName: string;
};

export default function ProductInquiry({
  locale,
  productName,
}: ProductInquiryProps) {
  const t = useTranslations("Products");
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const notePrefix = useMemo(() => t("notePrefix"), [t]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
      >
        {t("request")}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4 py-8 backdrop-blur-sm"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              variants={scaleIn}
              initial={shouldReduceMotion ? undefined : "hidden"}
              animate={shouldReduceMotion ? undefined : "show"}
              exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-md hover:text-slate-700"
              >
                <span aria-hidden>X</span>
              </button>
              <ContactForm
                locale={locale}
                defaultNote={`${notePrefix}: ${productName}`}
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
