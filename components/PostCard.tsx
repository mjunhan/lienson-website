"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { PostSummary } from "@/lib/content";
import { slideUp } from "@/components/Motion";

type PostCardProps = {
  post: PostSummary;
  locale: string;
};

export default function PostCard({ post, locale }: PostCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const t = useTranslations("Common");

  return (
    <motion.article
      variants={slideUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 py-6">
        <time
          dateTime={post.date}
          className="text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          {post.displayDate}
        </time>
        <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
        <p className="flex-1 text-sm text-slate-600">{post.excerpt}</p>
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="inline-flex items-center justify-between rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
        >
          <span>{t("readMore")}</span>
          <span aria-hidden className="text-base">&gt;</span>
        </Link>
      </div>
    </motion.article>
  );
}
