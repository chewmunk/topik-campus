export type FeatureId =
  | "practice"
  | "writing"
  | "progress"
  | "questions"
  | "study"
  | "reviews";

export type CatalogFeature = {
  id: FeatureId;
  href: string;
};

export type TopikLevelRow = {
  id: string;
  exam: string;
  levels: string;
  skills: string;
  format: string;
};

export type CommunityStats = {
  questions: number;
  studyGroups: number;
  reviews: number;
  status: "coming_soon";
};

export const CATALOG_FEATURES: CatalogFeature[] = [
  { id: "practice", href: "/practice" },
  { id: "writing", href: "/writing" },
  { id: "progress", href: "/progress" },
  { id: "questions", href: "/community/questions" },
  { id: "study", href: "/community/study-groups" },
  { id: "reviews", href: "/community/reviews" },
];

export const TOPIK_LEVEL_ROWS: TopikLevelRow[] = [
  {
    id: "topik-i",
    exam: "TOPIK I",
    levels: "1–2",
    skills: "Listening, Reading",
    format: "Multiple choice",
  },
  {
    id: "topik-ii",
    exam: "TOPIK II",
    levels: "3–6",
    skills: "Listening, Reading, Writing",
    format: "Multiple choice + writing",
  },
];

export function getCommunityStats(): CommunityStats {
  return {
    questions: 0,
    studyGroups: 0,
    reviews: 0,
    status: "coming_soon",
  };
}

export function getCatalogFeatures() {
  return CATALOG_FEATURES;
}

export function getTopikLevels() {
  return TOPIK_LEVEL_ROWS;
}
