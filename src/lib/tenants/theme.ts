import type { Team } from "../types";

export function teamToCssVars(team: Team) {
  const { primaryColor, secondaryColor, accentColor, backgroundGradient } =
    team.theme;

  return {
    "--bg": hexToRgbTuple(secondaryColor),
    "--bg-soft": hexToRgbTuple(secondaryColor),
    "--fg": "241 245 249",
    "--accent": hexToRgbTuple(primaryColor),
    "--accent-soft": hexToRgbTuple(accentColor),
    "--card": hexToRgbTuple(secondaryColor),
    "--card-border": hexToRgbTuple(primaryColor),
    "--team-gradient": backgroundGradient
  } as Record<string, string>;
}

function hexToRgbTuple(hex: string): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}
