"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ProductSummary } from "@/lib/content";
import { slideUp } from "@/components/Motion";

type ProductCardProps = {
  product: ProductSummary;
  locale: string;
};

export default function ProductCard({
  product,
  locale,
}: ProductCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Common");

  return (
    <motion.article
      variants={slideUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-56">
        <Image
          src={product.coverImage}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <span className="inline-flex w-fit rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
          {product.category}
        </span>
        <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
        <p className="flex-1 text-sm text-slate-600">{product.excerpt}</p>
        <Link
          href={`/${locale}/products/${product.slug}`}
          className="inline-flex items-center justify-between rounded-full bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          <span>{t("viewProduct")}</span>
          <span aria-hidden className="text-base">&gt;</span>
        </Link>
      </div>
    </motion.article>
  );
}
