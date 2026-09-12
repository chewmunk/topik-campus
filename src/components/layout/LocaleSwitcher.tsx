"use client";

import { useLocale, useTranslations } from "next-intl";
import { LOCALE_LABELS } from "@/lib/site";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1" aria-label={t("language")}>
      {routing.locales.map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          hrefLang={code}
          className={`rounded-full px-2.5 py-1 text-xs tracking-wide ${
            code === locale
              ? "bg-navy text-paper"
              : "text-ink-soft hover:bg-paper-2"
          }`}
        >
          <span title={LOCALE_LABELS[code]}>{code.toUpperCase()}</span>
        </Link>
      ))}
    </div>
  );
}
