"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { fade, slideUp, scaleIn } from "@/components/Motion";

type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageSrc: string;
  imageAlt: string;
};

export default function Hero({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 via-white to-slate-100">
      <div className="absolute -left-24 -top-32 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-slate-200/60 blur-3xl" />

      <div className="relative z-10 grid gap-10 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:items-center lg:px-16">
        <motion.div
          variants={slideUp}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center rounded-full bg-sky-100 px-4 py-1 text-sm font-semibold text-sky-700">
            Lien Son Bedding
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl text-lg text-slate-600">{subtitle}</p>
          <motion.div
            variants={fade}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.3 }}
          >
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-sky-600/30 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
            >
              <motion.span
                whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
              >
                {ctaLabel}
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl"
          variants={scaleIn}
          initial={shouldReduceMotion ? undefined : "hidden"}
          whileInView={shouldReduceMotion ? undefined : "show"}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/10 via-transparent to-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
