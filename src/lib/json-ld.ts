import {
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  TAGLINE,
  absoluteUrl,
  getSiteUrl,
} from "@/lib/site";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function websiteJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: getSiteUrl(),
    description: TAGLINE,
    inLanguage: locale,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: getSiteUrl(),
    logo: absoluteUrl("/icon"),
    description: DEFAULT_DESCRIPTION,
    disambiguatingDescription:
      "Independent TOPIK learning platform, not affiliated with the official TOPIK administering organization.",
  };
}

export function breadcrumbJsonLd(locale: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: absoluteUrl(`/${locale}`),
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.name,
        item: absoluteUrl(`/${locale}${item.path}`),
      })),
    ],
  };
}

export { serializeJsonLd };
