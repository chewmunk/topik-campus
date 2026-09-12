import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/practice">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/practice",
    title: t("practiceTitle"),
    description: t("practiceDescription"),
  });
}

export default async function PracticePage({
  params,
}: PageProps<"/[locale]/practice">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("practiceTitle")}
      description={t("practiceDescription")}
      crumbs={[{ name: t("practiceTitle"), path: "/practice" }]}
    />
  );
}
