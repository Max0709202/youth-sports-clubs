"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTenant } from "@/src/lib/tenants/context";
import { Button } from "@/components/ui/button";
import { useOnboardingStore } from "@/src/store/onboarding-store";

function hexToRgbTuple(hex: string): string {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}

export function TenantShell({ children }: { children: React.ReactNode }) {
  const { team } = useTenant();
  const searchParams = useSearchParams();
  const isPreview = searchParams.get("preview") === "1";
  const { logoDataUrl, primaryColor } = useOnboardingStore();

  const previewCssVars = isPreview
    ? {
        "--accent": hexToRgbTuple(primaryColor),
        "--accent-soft": hexToRgbTuple(primaryColor),
        "--card-border": hexToRgbTuple(primaryColor)
      }
    : {};

  const effectiveLogo = isPreview && logoDataUrl ? logoDataUrl : team?.logoUrl;

  return (
    <div className="flex min-h-screen flex-col" style={previewCssVars as React.CSSProperties}>
      <header className="flex items-center justify-between px-6 py-4 backdrop-blur border-b border-slate-800/70 bg-slate-950/50">
        <div className="flex items-center gap-3">
          {effectiveLogo ? (
            <div className="h-10 w-10 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={effectiveLogo}
                alt={`${team?.name ?? "Team"} logo`}
                className="h-full w-full object-contain"
              />
            </div>
          ) : (
            <div className="h-9 w-9 rounded-xl bg-slate-900/80 border border-slate-700/70 flex items-center justify-center text-xs font-bold uppercase tracking-tight">
              {team?.name
                ?.split(" ")
                .map((w) => w[0])
                .join("") ?? "YS"}
            </div>
          )}
          <div className="flex flex-col">
            <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-400">
              Youth Merch Studio
            </span>
            <span className="text-base font-semibold">
              {team?.name ?? "Demo Team"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isPreview && (
            <span className="rounded-full border border-[rgb(var(--accent))]/70 bg-slate-900/70 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-slate-200">
              Preview mode
            </span>
          )}
          <Button asChild variant="ghost" size="sm">
            <Link href="/">All teams</Link>
          </Button>
          <Button asChild size="sm">
            <Link href={`/t/${team?.slug ?? "wildcats"}/dashboard`}>
              Team dashboard
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex-1 px-6 py-8">{children}</main>
      <footer className="px-6 py-4 text-xs text-slate-500/80">
        Built for demo – all data is mocked.
      </footer>
    </div>
  );
}
