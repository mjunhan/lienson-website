import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { locales } from "@/lib/i18n";
import { getPostBySlug, listPosts } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await listPosts();
  return locales.flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPostPage({ params }: any) {
  const { locale, slug } = params as { locale: string; slug: string };
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-500"
        >
          <span aria-hidden>&lt;</span> {tCommon("backToBlog")}
        </Link>
        <div className="space-y-2">
          <time
            dateTime={post.date}
            className="text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {post.displayDate}
          </time>
          <h1 className="text-3xl font-bold text-slate-900">{post.title}</h1>
          <p className="text-lg text-slate-600">{post.excerpt}</p>
        </div>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 60vw, 100vw"
          priority
        />
      </div>

      <div className="prose prose-lg prose-slate max-w-none">{post.body}</div>
    </article>
  );
}
