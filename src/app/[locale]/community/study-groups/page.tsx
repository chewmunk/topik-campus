import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community/study-groups">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/community/study-groups",
    title: t("studyTitle"),
    description: t("studyDescription"),
  });
}

export default async function StudyGroupsPage({
  params,
}: PageProps<"/[locale]/community/study-groups">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const community = await getTranslations({ locale, namespace: "Community" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("studyTitle")}
      description={t("studyDescription")}
      crumbs={[
        { name: community("title"), path: "/community" },
        { name: t("studyTitle"), path: "/community/study-groups" },
      ]}
    />
  );
}
