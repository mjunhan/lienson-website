import { getTranslations } from "next-intl/server";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import PostCard from "@/components/PostCard";
import {
  getProductCategories,
  listFeaturedProducts,
  listRecentPosts,
} from "@/lib/content";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function HomePage({ params }: any) {
  const { locale } = params as { locale: string };
  const tHero = await getTranslations({ locale, namespace: "Hero" });
  const tCategories = await getTranslations({ locale, namespace: "Categories" });
  const tFeatured = await getTranslations({
    locale,
    namespace: "FeaturedProducts",
  });
  const tBlog = await getTranslations({ locale, namespace: "LatestBlog" });

  const [products, posts, categories] = await Promise.all([
    listFeaturedProducts(),
    listRecentPosts(3),
    getProductCategories(),
  ]);

  const categoryMap = tCategories.raw("items") as Record<string, string>;
  const translatedCategories = categories.map((category) => ({
    key: category,
    label: categoryMap[category] ?? category,
  }));

  return (
    <div className="space-y-16">
      <Hero
        title={tHero("title")}
        subtitle={tHero("subtitle")}
        ctaLabel={tHero("cta")}
        ctaHref={`/${locale}/products`}
        imageSrc="/uploads/hero-bedroom.jpg"
        imageAlt="Lien Son bedroom collection showcase"
      />

      <section className="space-y-6">
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            {tCategories("title")}
          </h2>
          <p className="text-slate-600">{tCategories("description")}</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {translatedCategories.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-slate-900">{label}</h3>
              <p className="mt-2 text-sm text-slate-600">
                {tCategories("description")}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            {tFeatured("title")}
          </h2>
          <p className="text-slate-600">{tFeatured("description")}</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} locale={locale} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <header className="space-y-3">
          <h2 className="text-2xl font-semibold text-slate-900">
            {tBlog("title")}
          </h2>
          <p className="text-slate-600">{tBlog("description")}</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
