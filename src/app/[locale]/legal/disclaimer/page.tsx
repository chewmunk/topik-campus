import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/legal/disclaimer">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/legal/disclaimer",
    title: t("disclaimerTitle"),
    description: t("disclaimerDescription"),
  });
}

export default async function DisclaimerPage({
  params,
}: PageProps<"/[locale]/legal/disclaimer">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("Legal");

  return (
    <PageShell
      locale={locale}
      title={t("disclaimerTitle")}
      lead={t("disclaimerBody")}
      breadcrumbs={[{ name: t("disclaimerTitle"), path: "/legal/disclaimer" }]}
    />
  );
}
