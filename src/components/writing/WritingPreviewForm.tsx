"use client";

import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { useTranslations } from "next-intl";

export function WritingPreviewForm() {
  const t = useTranslations("WritingPreview");
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    defaultValues: {
      text: "",
    },
    onSubmit: async () => {
      setSubmitted(true);
    },
  });

  return (
    <form
      className="mt-10 space-y-4 rounded-2xl border border-line bg-paper p-6"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit();
      }}
    >
      <h2 className="text-xl font-semibold text-navy">{t("title")}</h2>
      <p className="text-sm text-ink-soft">{t("lead")}</p>
      <form.Field
        name="text"
        validators={{
          onSubmit: ({ value }) => {
            if (!value.trim()) return t("required");
            if (value.trim().length < 20) return t("tooShort");
            return undefined;
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <textarea
              className="min-h-40 w-full rounded-xl border border-line bg-paper-2 px-4 py-3 text-sm outline-none focus:border-accent"
              placeholder={t("placeholder")}
              value={field.state.value}
              onChange={(event) => field.handleChange(event.target.value)}
              onBlur={field.handleBlur}
            />
            {field.state.meta.errors[0] ? (
              <p className="text-sm text-accent">{field.state.meta.errors[0]}</p>
            ) : null}
          </div>
        )}
      </form.Field>
      <button
        type="submit"
        className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper hover:bg-accent/90"
        onClick={() => {
          void form.handleSubmit();
        }}
      >
        {t("submit")}
      </button>
      {submitted ? <p className="text-sm text-ok">{t("success")}</p> : null}
    </form>
  );
}
