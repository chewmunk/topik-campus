import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SITE_NAME,
  SLOGAN,
  absoluteUrl,
  getSiteUrl,
  isProductionIndexable,
  localizedPath,
  LOCALES,
  type AppLocale,
} from "@/lib/site";

type PageMetaInput = {
  locale: AppLocale | string;
  path?: string;
  title?: string;
  description?: string;
  absoluteTitle?: boolean;
};

export function languageAlternates(path = "") {
  const languages: Record<string, string> = {
    "x-default": localizedPath("en", path),
  };
  for (const locale of LOCALES) {
    languages[locale] = localizedPath(locale, path);
  }
  return languages;
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description = DEFAULT_DESCRIPTION,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const canonical = localizedPath(locale, path);
  const indexable = isProductionIndexable();

  return {
    title: absoluteTitle || !title ? { absolute: title ?? DEFAULT_TITLE } : title,
    description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: title ?? DEFAULT_TITLE,
      description,
      url: absoluteUrl(canonical),
      locale,
      alternateLocale: LOCALES.filter((item) => item !== locale),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? DEFAULT_TITLE,
      description,
    },
  };
}

export function rootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    applicationName: SITE_NAME,
    title: {
      default: DEFAULT_TITLE,
      template: `%s | ${SITE_NAME}`,
    },
    description: DEFAULT_DESCRIPTION,
    keywords: [
      "TOPIK",
      "Korean language",
      "TOPIK practice",
      "TOPIK mock test",
      "AI writing feedback",
    ],
    authors: [{ name: SITE_NAME, url: getSiteUrl() }],
    creator: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      url: getSiteUrl(),
    },
    twitter: {
      card: "summary_large_image",
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    },
    other: {
      slogan: SLOGAN,
    },
  };
}
