export type Sport =
  | "soccer"
  | "basketball"
  | "baseball"
  | "volleyball"
  | "hockey";

export type StylePreset = "bold" | "classic" | "energy";

export interface TeamTheme {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundGradient: string;
  stylePreset: StylePreset;
}

export interface Team {
  id: string;
  slug: string;
  name: string;
  sport?: Sport;
  logoUrl?: string;
  theme: TeamTheme;
  createdAt: string;
}
