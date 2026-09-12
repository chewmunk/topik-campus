import type { MetadataRoute } from "next";
import { absoluteUrl, isProductionIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const indexable = isProductionIndexable();

  return {
    rules: {
      userAgent: "*",
      allow: indexable ? "/" : undefined,
      disallow: indexable ? "/api/" : "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl(),
  };
}
