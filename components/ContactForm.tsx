"use client";

import { FormEvent, useState, useTransition } from "react";
import { useTranslations } from "next-intl";
import { contactSchema } from "@/lib/email";
import { motion, useReducedMotion } from "framer-motion";
import { scaleIn } from "@/components/Motion";

type ContactFormProps = {
  locale: string;
  defaultNote?: string;
};

type SubmitState = "idle" | "success" | "error";

export default function ContactForm({
  locale,
  defaultNote = "",
}: ContactFormProps) {
  const t = useTranslations("Contact");
  const placeholders = useTranslations("Form");
  const common = useTranslations("Common");
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    note: defaultNote,
  });
  const [status, setStatus] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null);

    const parsed = contactSchema.safeParse(formState);
    if (!parsed.success) {
      setErrorMessage(t("error"));
      setStatus("error");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...parsed.data, locale }),
        });
        if (!response.ok) {
          throw new Error(await response.text());
        }
        setStatus("success");
        setErrorMessage(null);
        setFormState({ name: "", phone: "", note: defaultNote ?? "" });
      } catch (error) {
        console.error(error);
        setErrorMessage(t("error"));
        setStatus("error");
      }
    });
  };

  return (
    <motion.form
      variants={scaleIn}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.2 }}
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl bg-white p-8 shadow-soft"
    >
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-semibold text-slate-700">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          required
          value={formState.name}
          onChange={(event) =>
            setFormState((prev) => {
              setStatus("idle");
              setErrorMessage(null);
              return { ...prev, name: event.target.value };
            })
          }
          placeholder={placeholders("namePlaceholder")}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-semibold text-slate-700">
          {t("phone")}
        </label>
        <input
          id="phone"
          name="phone"
          required
          value={formState.phone}
          onChange={(event) => {
            setStatus("idle");
            setErrorMessage(null);
            setFormState((prev) => ({
              ...prev,
              phone: event.target.value,
            }));
          }}
          placeholder={placeholders("phonePlaceholder")}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="note" className="text-sm font-semibold text-slate-700">
          {t("note")}
        </label>
        <textarea
          id="note"
          name="note"
          rows={4}
          value={formState.note}
          onChange={(event) => {
            setStatus("idle");
            setErrorMessage(null);
            setFormState((prev) => ({
              ...prev,
              note: event.target.value,
            }));
          }}
          placeholder={placeholders("notePlaceholder")}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-200"
        />
      </div>

      {status === "success" ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {t("success")}
        </p>
      ) : null}

      {status === "error" && errorMessage ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {errorMessage}
        </p>
      ) : null}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? common("loading") : t("send")}
        </button>
      </div>
    </motion.form>
  );
}
