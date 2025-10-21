import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { listPosts, listProducts } from "@/lib/content";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://lienson.vn";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    listProducts(),
    listPosts(),
  ]);

  const staticPages = locales.flatMap((locale) => [
    `${baseUrl}/${locale}`,
    `${baseUrl}/${locale}/products`,
    `${baseUrl}/${locale}/about`,
    `${baseUrl}/${locale}/blog`,
    `${baseUrl}/${locale}/contact`,
  ]);

  const productUrls = locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${baseUrl}/${locale}/products/${product.slug}`,
      lastModified: new Date().toISOString(),
    }))
  );

  const blogUrls = locales.flatMap((locale) =>
    posts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      lastModified: post.date,
    }))
  );

  return [
    ...staticPages.map((url) => ({
      url,
      lastModified: new Date().toISOString(),
    })),
    ...productUrls,
    ...blogUrls,
  ];
}
