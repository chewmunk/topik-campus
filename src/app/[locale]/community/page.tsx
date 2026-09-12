import { getTranslations, setRequestLocale } from "next-intl/server";
import { CommunityStats } from "@/components/community/CommunityStats";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/community">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/community",
    title: t("communityTitle"),
    description: t("communityDescription"),
  });
}

export default async function CommunityPage({
  params,
}: PageProps<"/[locale]/community">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("Community");

  return (
    <PageShell
      locale={locale}
      title={t("title")}
      lead={t("lead")}
      breadcrumbs={[{ name: t("title"), path: "/community" }]}
    >
      <CommunityStats />
      <p className="mt-8 text-sm text-ink-soft">{t("empty")}</p>
    </PageShell>
  );
}
