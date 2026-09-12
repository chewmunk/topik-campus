import { getTranslations } from "next-intl/server";
import { ComingSoonPage } from "@/components/layout/ComingSoonPage";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community/reviews">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/community/reviews",
    title: t("reviewsTitle"),
    description: t("reviewsDescription"),
  });
}

export default async function ReviewsPage({
  params,
}: PageProps<"/[locale]/community/reviews">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const community = await getTranslations({ locale, namespace: "Community" });
  return (
    <ComingSoonPage
      locale={locale}
      title={t("reviewsTitle")}
      description={t("reviewsDescription")}
      crumbs={[
        { name: community("title"), path: "/community" },
        { name: t("reviewsTitle"), path: "/community/reviews" },
      ]}
    />
  );
}
