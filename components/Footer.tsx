import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

const socialNetworks = [
  { name: "Facebook", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "YouTube", href: "#" },
];

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();

  const quickLinks = [
    { key: "about", href: `/${locale}/about`, label: t("links.about") },
    { key: "contact", href: `/${locale}/contact`, label: t("links.contact") },
    { key: "blog", href: `/${locale}/blog`, label: t("links.blog") },
  ];

  const policyLinks = [
    { key: "warranty", href: `/${locale}/contact`, label: t("policyLinks.warranty") },
    { key: "exchange", href: `/${locale}/contact`, label: t("policyLinks.exchange") },
    { key: "privacy", href: `/${locale}/contact`, label: t("policyLinks.privacy") },
  ];

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <div className="text-lg font-semibold text-white">Lien Son</div>
          <p className="text-sm leading-relaxed text-slate-300">{t("slogan")}</p>
          <p className="text-sm text-slate-400">
            {t("store")}
            <br />
            {t("address")}
            <br />
            {t("hours")}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {quickLinks.map(({ key, href, label }) => (
              <li key={key}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
            {t("policies")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            {policyLinks.map(({ key, href, label }) => (
              <li key={key}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-200">
            {t("social")}
          </h3>
          <div className="flex gap-3">
            {socialNetworks.map(({ name, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-sky-500 hover:text-white"
              >
                {name[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-500 sm:px-6 lg:px-8">
        {t("copyright")}
      </div>
    </footer>
  );
}
