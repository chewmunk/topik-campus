import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageShell } from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <PageShell
      locale={locale}
      title={t("title")}
      lead={t("lead")}
      breadcrumbs={[{ name: t("title"), path: "/about" }]}
    >
      <div className="mt-8 space-y-4 text-base leading-8 text-ink-soft">
        <p>{t("body1")}</p>
        <p>{t("body2")}</p>
        <p>{t("body3")}</p>
      </div>
    </PageShell>
  );
}
