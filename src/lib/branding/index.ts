export { DEFAULT_THEME, themeToCssVariables, type ThemeTokens } from "./theme-tokens";

/**
 * Logo pipeline placeholder: in Week 1 you'll add:
 * - Upload to Supabase Storage
 * - sharp for resize/format
 * - Dominant color extraction (e.g. node-vibrant or get-image-colors)
 * - Contrast-safe palette generation
 * - Favicon generation
 * Then call this with the extracted colors to create tenant_themes row.
 */

export function createThemeFromColors(colors: {
  primary?: string;
  secondary?: string;
  accent?: string;
}): Record<string, string> {
  return {
    primary: colors.primary ?? "#0A3D91",
    secondary: colors.secondary ?? "#F5C542",
    accent: colors.accent ?? "#D7263D",
    background: "#FFFFFF",
    text: "#111827",
  };
}
