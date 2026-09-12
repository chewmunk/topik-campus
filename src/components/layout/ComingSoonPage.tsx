import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import type { AppLocale } from "@/lib/site";

type ComingSoonProps = {
  locale: AppLocale;
  title: string;
  description: string;
  crumbs: { name: string; path: string }[];
};

export async function ComingSoonPage({
  locale,
  title,
  description,
  crumbs,
}: ComingSoonProps) {
  setRequestLocale(locale);
  const t = await getTranslations("Hub");

  return (
    <PageShell locale={locale} title={title} lead={description} breadcrumbs={crumbs}>
      <div className="mt-10 rounded-2xl border border-line bg-paper-2/70 p-6">
        <p className="font-medium text-navy">{t("comingSoon")}</p>
        <p className="mt-2 text-sm leading-6 text-ink-soft">{t("comingSoonBody")}</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-navy px-4 py-2 text-sm text-paper"
        >
          {t("backHome")}
        </Link>
      </div>
    </PageShell>
  );
}
