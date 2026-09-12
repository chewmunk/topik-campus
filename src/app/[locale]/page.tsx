import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/metadata";
import { getLocaleParam } from "@/lib/locale";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = await getLocaleParam(params);
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageMetadata({
    locale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
    absoluteTitle: true,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await getLocaleParam(params);
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <div>
      <section className="border-b border-line bg-[linear-gradient(180deg,#13294b_0%,#1b3a63_100%)] text-paper">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm uppercase tracking-[0.2em] text-accent-soft">
            {t("eyebrow")}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-tight sm:text-6xl">
            {t("slogan")}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-paper/80">{t("lead")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/topik"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-paper"
            >
              {t("primaryCta")}
            </Link>
            <Link
              href="/community"
              className="rounded-full border border-paper/30 px-5 py-2.5 text-sm font-medium text-paper"
            >
              {t("secondaryCta")}
            </Link>
          </div>
          <p className="mt-12 text-sm text-paper/60">{SITE_NAME} · topikcampus.com</p>
        </div>
      </section>
      <FeatureGrid />
    </div>
  );
}
