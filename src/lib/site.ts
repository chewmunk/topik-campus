export const SITE_NAME = "TOPIK Campus";
export const SITE_URL = "https://topikcampus.com";
export const VERCEL_URL = "https://topikcampus.vercel.app";
export const SLOGAN = "Learn. Practice. Pass Together.";
export const TAGLINE = "The global learning community for TOPIK learners.";
export const DEFAULT_TITLE = "TOPIK Campus — Learn, Practice and Pass TOPIK";
export const DEFAULT_DESCRIPTION =
  "Prepare for TOPIK with practice questions, mock tests, AI writing feedback and a global learner community.";

export const LOCALES = ["en", "ko", "vi", "id", "zh"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "en";

export const LOCALE_LABELS: Record<AppLocale, string> = {
  en: "English",
  ko: "한국어",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
  zh: "中文",
};

export const DISCLAIMER_EN =
  "TOPIK Campus is an independent learning platform and is not affiliated with, endorsed by, or connected to the official TOPIK administering organization.";

export const STATIC_PATHS = [
  "",
  "/about",
  "/topik",
  "/practice",
  "/mock-test",
  "/writing",
  "/progress",
  "/community",
  "/community/questions",
  "/community/study-groups",
  "/community/reviews",
  "/blog",
  "/legal/terms",
  "/legal/privacy",
  "/legal/disclaimer",
] as const;

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
}

export function absoluteUrl(pathname = "") {
  const base = getSiteUrl().replace(/\/$/, "");
  if (!pathname || pathname === "/") return base;
  return `${base}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export function localizedPath(locale: string, pathname = "") {
  const suffix = !pathname || pathname === "/" ? "" : pathname;
  return `/${locale}${suffix}`;
}

export function isProductionIndexable() {
  return process.env.VERCEL_ENV !== "preview";
}
