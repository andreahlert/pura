// Single source of truth for the docs pillar taxonomy. Each of the 12 component
// categories belongs to exactly one pillar. Animations is a cross-cut FACET, not
// a pillar: a component keeps its home category/pillar and ALSO surfaces here when
// its meta sets animation: true.
export const PILLARS = [
  { key: "primitives", label: "Primitives", categories: ["Primitives", "Layout"] },
  { key: "forms", label: "Forms", categories: ["Form", "Date"] },
  { key: "display", label: "Display", categories: ["Display"] },
  { key: "navigation", label: "Navigation", categories: ["Navigation", "Overlay", "Disclosure"] },
  { key: "feedback", label: "Feedback", categories: ["Feedback", "Marketing"] },
  { key: "tools", label: "Agent + Utility", categories: ["Agent", "Utility"] },
];

export const ANIMATIONS = { key: "animations", label: "Animations" };

export const categoryToPillar = Object.fromEntries(
  PILLARS.flatMap((p) => p.categories.map((c) => [c, p]))
);

export function pillarOf(category) {
  return categoryToPillar[category] || null;
}
