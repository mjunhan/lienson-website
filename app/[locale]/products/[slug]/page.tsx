import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import ProductInquiry from "@/components/ProductInquiry";
import { locales } from "@/lib/i18n";
import { getProductBySlug, listProducts } from "@/lib/content";

export async function generateStaticParams() {
  const products = await listProducts();
  return locales.flatMap((locale) =>
    products.map((product) => ({ locale, slug: product.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return {};
  }

  return {
    title: product.name,
    description: product.excerpt,
    openGraph: {
      title: product.name,
      description: product.excerpt,
      images: [{ url: product.coverImage }],
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductPage({ params }: any) {
  const { locale, slug } = params as { locale: string; slug: string };
  const t = await getTranslations({ locale, namespace: "Products" });
  const tCommon = await getTranslations({ locale, namespace: "Common" });
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-12">
      <Link
        href={`/${locale}/products`}
        className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-500"
      >
        <span aria-hidden>&lt;</span> {tCommon("backToProducts")}
      </Link>

      <header className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-6 rounded-3xl bg-white p-6 shadow-soft sm:px-10 sm:py-10">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <Image
              src={product.coverImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
          {product.gallery.length > 1 ? (
            <div className="grid grid-cols-2 gap-4">
              {product.gallery.slice(1).map((image) => (
                <div
                  key={image}
                  className="relative aspect-video overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image}
                    alt={`${product.name} gallery image`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 25vw, 50vw"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
          <div className="space-y-2">
            <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            <p className="text-slate-600">{product.excerpt}</p>
          </div>

          <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <div>
              <span className="font-semibold">{t("price")}:</span>
              <p className="mt-1 text-base font-semibold text-sky-700">
                {t("price")}
              </p>
            </div>
            {product.materials ? (
              <div>
                <span className="font-semibold">{t("materials")}:</span>
                <p>{product.materials}</p>
              </div>
            ) : null}
            {product.dimensions ? (
              <div>
                <span className="font-semibold">{t("dimensions")}:</span>
                <p>{product.dimensions}</p>
              </div>
            ) : null}
            {product.warranty ? (
              <div>
                <span className="font-semibold">{t("warranty")}:</span>
                <p>{product.warranty}</p>
              </div>
            ) : null}
          </div>

          <ProductInquiry locale={locale} productName={product.name} />
        </aside>
      </header>

      <section className="prose prose-slate max-w-none">
        {product.specs ? (
          <div className="rounded-3xl bg-sky-50 p-6">
            <h2 className="text-xl font-semibold text-slate-900">
              {t("specs")}
            </h2>
            <div className="mt-3 text-slate-700">
              <p>{product.specs}</p>
            </div>
          </div>
        ) : null}

        <div className="mt-8 space-y-6">{product.body}</div>
      </section>
    </div>
  );
}
