import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { LevelTable } from "@/components/topik/LevelTable";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({ params }: PageProps<"/[locale]/topik">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/topik",
    title: t("topikTitle"),
    description: t("topikDescription"),
  });
}

export default async function TopikPage({ params }: PageProps<"/[locale]/topik">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("Topik");

  return (
    <PageShell
      locale={locale}
      title={t("title")}
      lead={t("lead")}
      breadcrumbs={[{ name: t("title"), path: "/topik" }]}
    >
      <div className="mt-10">
        <LevelTable />
      </div>
      <p className="mt-6 text-sm leading-6 text-ink-soft">{t("note")}</p>
    </PageShell>
  );
}
