import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/mock-test">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/mock-test",
    title: t("mockTitle"),
    description: t("mockDescription"),
  });
}

export default async function MockTestPage({
  params,
}: PageProps<"/[locale]/mock-test">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("mockTitle")}
      description={t("mockDescription")}
      crumbs={[{ name: t("mockTitle"), path: "/mock-test" }]}
    />
  );
}
