"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  CATALOG_FEATURES,
  type CatalogFeature,
  type FeatureId,
} from "@/lib/catalog";

async function fetchFeatures(): Promise<CatalogFeature[]> {
  const response = await fetch("/api/catalog/features");
  if (!response.ok) {
    throw new Error("Failed to load features");
  }
  return response.json();
}

export function FeatureGrid() {
  const t = useTranslations("Features");
  const home = useTranslations("Home");
  const { data = CATALOG_FEATURES, isPending } = useQuery({
    queryKey: ["catalog-features"],
    queryFn: fetchFeatures,
    initialData: CATALOG_FEATURES,
  });

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="max-w-2xl">
        <h2 className="font-display text-3xl text-navy">{home("featuresTitle")}</h2>
        <p className="mt-3 text-ink-soft">{home("featuresLead")}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((feature) => (
          <Link
            key={feature.id}
            href={feature.href}
            className="rounded-2xl border border-line bg-paper-2/60 p-6 transition hover:border-navy hover:bg-paper"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-navy">
                {t(`${feature.id}.title` as `${FeatureId}.title`)}
              </h3>
              {isPending ? null : (
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] uppercase tracking-wide text-accent">
                  {home("comingSoon")}
                </span>
              )}
            </div>
            <p className="mt-3 text-sm leading-6 text-ink-soft">
              {t(`${feature.id}.body` as `${FeatureId}.body`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
