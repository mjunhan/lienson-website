import { getTranslations } from "next-intl/server";
import PostCard from "@/components/PostCard";
import { listPosts } from "@/lib/content";

export const metadata = {
  title: "Blog",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BlogPage({ params }: any) {
  const { locale } = params as { locale: string };
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = await listPosts();

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
        <p className="text-lg text-slate-600">{t("description")}</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
