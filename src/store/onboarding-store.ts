import { create } from "zustand";
import type { Sport, StylePreset } from "@/src/lib/types";

interface OnboardingState {
  teamName: string;
  sport: Sport | null;
  primaryColor: string;
  secondaryColor: string;
  logoDataUrl: string | null;
  stylePreset: StylePreset;
  setTeamName: (name: string) => void;
  setSport: (sport: Sport | null) => void;
  setPrimaryColor: (hex: string) => void;
  setSecondaryColor: (hex: string) => void;
  setLogoDataUrl: (dataUrl: string | null) => void;
  setStylePreset: (preset: StylePreset) => void;
  reset: () => void;
}

const initialState: Pick<
  OnboardingState,
  | "teamName"
  | "sport"
  | "primaryColor"
  | "secondaryColor"
  | "stylePreset"
  | "logoDataUrl"
> = {
  teamName: "",
  sport: null,
  primaryColor: "#f97316",
  secondaryColor: "#020617",
  stylePreset: "energy",
  logoDataUrl: null
};

export const useOnboardingStore = create<OnboardingState>((set) => ({
  ...initialState,
  setTeamName: (teamName) => set({ teamName }),
  setSport: (sport) => set({ sport }),
  setPrimaryColor: (primaryColor) => set({ primaryColor }),
  setSecondaryColor: (secondaryColor) => set({ secondaryColor }),
  setLogoDataUrl: (logoDataUrl) => set({ logoDataUrl }),
  setStylePreset: (stylePreset) => set({ stylePreset }),
  reset: () => set({ ...initialState })
}));

