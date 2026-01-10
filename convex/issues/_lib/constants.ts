export const PREDEFINED_LABELS = [
  "bug",
  "enhancement",
  "question",
  "documentation",
] as const;

export type PredefinedLabel = (typeof PREDEFINED_LABELS)[number];
