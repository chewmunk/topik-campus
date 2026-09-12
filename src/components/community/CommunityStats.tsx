"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { getCommunityStats, type CommunityStats } from "@/lib/catalog";

async function fetchStats(): Promise<CommunityStats> {
  const response = await fetch("/api/community/stats");
  if (!response.ok) {
    throw new Error("Failed to load community stats");
  }
  return response.json();
}

export function CommunityStats() {
  const t = useTranslations("Community");
  const { data = getCommunityStats() } = useQuery({
    queryKey: ["community-stats"],
    queryFn: fetchStats,
    initialData: getCommunityStats(),
  });

  const cards = [
    { href: "/community/questions" as const, label: t("questions"), value: data.questions },
    { href: "/community/study-groups" as const, label: t("studyGroups"), value: data.studyGroups },
    { href: "/community/reviews" as const, label: t("reviews"), value: data.reviews },
  ];

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.href}
          href={card.href}
          className="rounded-2xl border border-line bg-paper p-6 hover:border-navy"
        >
          <p className="text-sm text-ink-soft">{card.label}</p>
          <p className="mt-2 text-3xl font-semibold text-navy">{card.value}</p>
        </Link>
      ))}
    </div>
  );
}
