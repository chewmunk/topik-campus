import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { WritingPreviewForm } from "@/components/writing/WritingPreviewForm";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/writing">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/writing",
    title: t("writingTitle"),
    description: t("writingDescription"),
  });
}

export default async function WritingPage({
  params,
}: PageProps<"/[locale]/writing">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("Metadata");

  return (
    <PageShell
      locale={locale}
      title={t("writingTitle")}
      lead={t("writingDescription")}
      breadcrumbs={[{ name: t("writingTitle"), path: "/writing" }]}
    >
      <WritingPreviewForm />
    </PageShell>
  );
}
