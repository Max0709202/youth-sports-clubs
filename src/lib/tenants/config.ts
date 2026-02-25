import type { Team } from "../types";

export const seededTeams: Team[] = [
  {
    id: "team_wildcats",
    slug: "wildcats",
    name: "Westside Wildcats",
    sport: "soccer",
    logoUrl: "/logos/wildcats.svg",
    createdAt: new Date().toISOString(),
    theme: {
      primaryColor: "#f97316",
      secondaryColor: "#020617",
      accentColor: "#facc15",
      backgroundGradient:
        "radial-gradient(circle at top left, #f97316 0, #1e293b 40%, #020617 80%)",
      stylePreset: "energy"
    }
  },
  {
    id: "team_storm",
    slug: "storm",
    name: "Northside Storm",
    sport: "basketball",
    logoUrl: "/logos/storm.svg",
    createdAt: new Date().toISOString(),
    theme: {
      primaryColor: "#38bdf8",
      secondaryColor: "#020617",
      accentColor: "#a855f7",
      backgroundGradient:
        "radial-gradient(circle at top right, #38bdf8 0, #0f172a 40%, #020617 80%)",
      stylePreset: "bold"
    }
  },
  {
    id: "team_kestrels",
    slug: "kestrels",
    name: "Harbor Kestrels",
    sport: "baseball",
    logoUrl: "/logos/kestrels.svg",
    createdAt: new Date().toISOString(),
    theme: {
      primaryColor: "#22c55e",
      secondaryColor: "#020617",
      accentColor: "#e5e7eb",
      backgroundGradient:
        "radial-gradient(circle at center, #22c55e 0, #0f172a 45%, #020617 85%)",
      stylePreset: "classic"
    }
  }
];

export function getTeamBySlug(slug: string) {
  return seededTeams.find((team) => team.slug === slug);
}
