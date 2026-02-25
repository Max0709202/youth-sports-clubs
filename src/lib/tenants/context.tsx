"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import type { Team } from "../types";
import { getTeamBySlug } from "./config";
import { teamToCssVars } from "./theme";

interface TenantContextValue {
  team: Team | null;
}

const TenantContext = createContext<TenantContextValue | undefined>(undefined);

export function TenantProvider({
  teamSlug,
  children
}: {
  teamSlug: string;
  children: ReactNode;
}) {
  const team = getTeamBySlug(teamSlug) ?? null;

  const cssVars = useMemo(
    () => (team ? teamToCssVars(team) : {}),
    [team]
  );

  return (
    <TenantContext.Provider value={{ team }}>
      <div
        style={cssVars}
        className="min-h-screen"
      >
        <div
          className="min-h-screen text-slate-50"
          style={
            team
              ? {
                  background:
                    (cssVars["--team-gradient"] as string) ??
                    "radial-gradient(circle at top left, #1e293b, #020617)"
                }
              : undefined
          }
        >
          {children}
        </div>
      </div>
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const ctx = useContext(TenantContext);
  if (!ctx) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return ctx;
}
