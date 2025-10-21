import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ContactPage({ params }: any) {
  const { locale } = params as { locale: string };
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <div className="space-y-12">
      <div className="max-w-2xl space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">{t("title")}</h1>
        <p className="text-lg text-slate-600">{t("intro")}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6 rounded-3xl border border-slate-100 bg-white p-8 shadow-soft">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Showroom
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              123 Hoa Sen Street, District 7, Ho Chi Minh City
            </p>
            <p className="text-sm text-slate-600">09:00 - 21:00 (daily)</p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Hotline
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              0901 234 567
            </p>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Email
            </h2>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              hello@lienson.vn
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100">
            <iframe
              title="Lien Son Showroom"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2002457417943!2d106.72164217610384!3d10.79719458935661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f243e90b195%3A0x6f1e788d1b4a06fd!2zVmluY29tIENpdHkgTWFsbCBQcm96ZW4!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm locale={locale} />
      </div>
    </div>
  );
}
