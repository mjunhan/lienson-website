import { getTranslations } from "next-intl/server";
import ProductGrid from "@/components/ProductGrid";
import { getProductCategories, listProducts } from "@/lib/content";

export const metadata = {
  title: "Products",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProductsPage({ params }: any) {
  const { locale } = params as { locale: string };
  const tProducts = await getTranslations({ locale, namespace: "Products" });
  const tCategories = await getTranslations({
    locale,
    namespace: "Categories",
  });

  const [products, categories] = await Promise.all([
    listProducts(),
    getProductCategories(),
  ]);

  const categoryMap = tCategories.raw("items") as Record<string, string>;
  const categoryOptions = categories.map((category) => ({
    key: category,
    label: categoryMap[category] ?? category,
  }));

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          {tProducts("title")}
        </h1>
        <p className="text-lg text-slate-600">{tProducts("description")}</p>
      </header>

      <ProductGrid
        products={products}
        categories={categoryOptions}
        locale={locale}
        allLabel={tProducts("filterAll")}
      />
    </div>
  );
}
