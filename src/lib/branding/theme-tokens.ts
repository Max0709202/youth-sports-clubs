export type ThemeTokens = {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
};

export const DEFAULT_THEME: ThemeTokens = {
  primary: "#0A3D91",
  secondary: "#F5C542",
  accent: "#D7263D",
  background: "#FFFFFF",
  text: "#111827",
};

/**
 * Converts theme tokens to CSS custom properties for the storefront.
 */
export function themeToCssVariables(tokens: Partial<ThemeTokens>): Record<string, string> {
  const t = { ...DEFAULT_THEME, ...tokens };
  return {
    "--color-primary": t.primary,
    "--color-primary-foreground": ensureContrast(t.primary),
    "--color-secondary": t.secondary,
    "--color-secondary-foreground": ensureContrast(t.secondary),
    "--color-accent": t.accent,
    "--color-accent-foreground": ensureContrast(t.accent),
    "--color-background": t.background,
    "--color-text": t.text,
  };
}

function ensureContrast(hex: string): string {
  const luminance = hexToLuminance(hex);
  return luminance > 0.4 ? "#111827" : "#ffffff";
}

function hexToLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const [rs, gs, bs] = [r, g, b].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
