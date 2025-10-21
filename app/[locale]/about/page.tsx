import Image from "next/image";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "About",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function AboutPage({ params }: any) {
  const { locale } = params as { locale: string };
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <div className="space-y-16">
      <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
          <p className="text-lg text-slate-600">{t("story")}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <Image
            src="/uploads/hero-bedroom.jpg"
            alt="Lien Son showroom display"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 40vw, 100vw"
          />
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl bg-white p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("missionTitle")}
          </h2>
          <p className="text-slate-600">{t("mission")}</p>
        </div>
        <div className="space-y-4 rounded-3xl bg-sky-50 p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-slate-900">
            {t("valuesTitle")}
          </h2>
          <ul className="space-y-2 text-slate-700">
            {(t.raw("values") as string[]).map((value) => (
              <li key={value} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
