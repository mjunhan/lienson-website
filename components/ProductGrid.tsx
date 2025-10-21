"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { ProductSummary } from "@/lib/content";
import ProductCard from "@/components/ProductCard";
import { stagger } from "@/components/Motion";

type ProductGridProps = {
  products: ProductSummary[];
  categories: { key: string; label: string }[];
  locale: string;
  allLabel: string;
};

export default function ProductGrid({
  products,
  categories,
  locale,
  allLabel,
}: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter(
      (product) =>
        product.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [activeCategory, products]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory("all")}
          className={[
            "rounded-full border px-4 py-2 text-sm font-semibold transition",
            activeCategory === "all"
              ? "border-sky-500 bg-sky-500 text-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-600",
          ].join(" ")}
        >
          {allLabel}
        </button>
        {categories.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveCategory(key)}
            className={[
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              activeCategory === key
                ? "border-sky-500 bg-sky-500 text-white"
                : "border-slate-200 bg-white text-slate-700 hover:border-sky-200 hover:text-sky-600",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      <motion.div
        variants={stagger}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "show"}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((product) => (
          <ProductCard key={product.slug} product={product} locale={locale} />
        ))}
      </motion.div>
    </div>
  );
}
