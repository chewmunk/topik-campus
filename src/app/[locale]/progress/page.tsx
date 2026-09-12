import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/progress">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/progress",
    title: t("progressTitle"),
    description: t("progressDescription"),
  });
}

export default async function ProgressPage({
  params,
}: PageProps<"/[locale]/progress">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("progressTitle")}
      description={t("progressDescription")}
      crumbs={[{ name: t("progressTitle"), path: "/progress" }]}
    />
  );
}
