"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/src/store/onboarding-store";

export default function OnboardingPage() {
  const router = useRouter();
  const {
    teamName,
    sport,
    primaryColor,
    secondaryColor,
    logoDataUrl,
    stylePreset,
    setTeamName,
    setSport,
    setPrimaryColor,
    setSecondaryColor,
    setLogoDataUrl,
    setStylePreset
  } = useOnboardingStore();

  function handleGenerate() {
    // For the MVP demo: map presets to seeded teams.
    const presetToSlug: Record<string, string> = {
      bold: "storm",
      classic: "kestrels",
      energy: "wildcats"
    };

    const slug = presetToSlug[stylePreset] ?? "wildcats";

    // Add preview flag so the storefront can render with the uploaded logo
    // and colors on top of the seeded catalog for that team.
    router.push(`/t/${slug}?preview=1`);
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-8">
      <div className="space-y-3">
        <span className="surface-pill px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Store generator · Demo
        </span>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Create a team-branded merch store.
        </h1>
        <p className="text-sm text-slate-300 max-w-xl">
          This is a mocked onboarding flow for the MVP. In a real deployment,
          each step would connect to live catalog, fulfillment, and payout
          services.
        </p>
      </div>

      <form
        className="surface-card p-6 space-y-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Team name
            </label>
            <input
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-sm outline-none focus:border-[rgb(var(--accent))]"
              placeholder="Westside Wildcats"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Sport
            </label>
            <select
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-3 text-sm outline-none focus:border-[rgb(var(--accent))]"
              value={sport ?? ""}
              onChange={(e) =>
                setSport(
                  e.target.value
                    ? (e.target.value.toLowerCase() as any)
                    : null
                )
              }
            >
              <option value="">Select sport</option>
              <option value="soccer">Soccer</option>
              <option value="basketball">Basketball</option>
              <option value="baseball">Baseball</option>
              <option value="volleyball">Volleyball</option>
              <option value="hockey">Hockey</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.9fr)] items-end">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Logo upload
            </label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                className="block w-full text-xs text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-slate-800 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-slate-100 hover:file:bg-slate-700/90"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) {
                    setLogoDataUrl(null);
                    return;
                  }
                  const reader = new FileReader();
                  reader.onload = () => {
                    setLogoDataUrl(typeof reader.result === "string" ? reader.result : null);
                  };
                  reader.readAsDataURL(file);
                }}
              />
            </div>
            <p className="text-[0.7rem] text-slate-500">
              Images are kept in your browser only for this demo preview.
            </p>
          </div>
          {logoDataUrl && (
            <div className="flex flex-col items-end gap-1">
              <span className="text-[0.65rem] uppercase tracking-[0.16em] text-slate-500">
                Preview
              </span>
              <div className="h-12 w-12 rounded-xl border border-slate-700/80 bg-slate-900/80 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoDataUrl}
                  alt="Uploaded team logo preview"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Primary color
            </label>
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 p-1"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Secondary color
            </label>
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => setSecondaryColor(e.target.value)}
              className="h-10 w-full rounded-xl border border-slate-700/80 bg-slate-900/80 p-1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            Style preset
          </label>
          <div className="grid gap-3 sm:grid-cols-3">
            {["bold", "classic", "energy"].map((preset) => {
              const isActive = stylePreset === preset;
              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setStylePreset(preset as any)}
                  className={`group rounded-2xl border px-4 py-3 text-left hover:-translate-y-0.5 transition-all ${
                    isActive
                      ? "border-[rgb(var(--accent))] bg-slate-900/90"
                      : "border-slate-700/80 bg-slate-900/70 hover:border-[rgb(var(--accent))]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold capitalize">
                      {preset}
                    </span>
                    <span className="h-6 w-10 rounded-full bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(var(--accent-soft))] opacity-80 group-hover:opacity-100" />
                  </div>
                  <p className="text-[0.7rem] text-slate-400">
                    Mock preset – mapped to a demo team for this MVP.
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-[0.7rem] text-slate-500 max-w-xs">
            In this demo, your selections map onto one of the sample teams so
            you can immediately see a branded storefront and dashboard.
          </p>
          <div className="flex gap-2">
            <Button asChild variant="ghost">
              <Link href="/">Cancel</Link>
            </Button>
            <Button type="button" onClick={handleGenerate}>
              Generate store preview
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
