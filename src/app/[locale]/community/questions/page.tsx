import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community/questions">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/community/questions",
    title: t("questionsTitle"),
    description: t("questionsDescription"),
  });
}

export default async function QuestionsPage({
  params,
}: PageProps<"/[locale]/community/questions">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const community = await getTranslations({ locale, namespace: "Community" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("questionsTitle")}
      description={t("questionsDescription")}
      crumbs={[
        { name: community("title"), path: "/community" },
        { name: t("questionsTitle"), path: "/community/questions" },
      ]}
    />
  );
}
