"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createTeamAndSignUp } from "./actions";

export function OnboardingForm() {
  const [state, formAction] = useActionState(createTeamAndSignUp, null);

  return (
    <div className="w-full max-w-md space-y-4">
      <form action={formAction} className="space-y-4">
        {state?.error && (
          <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            {state.error}
          </p>
        )}
        <input
          type="text"
          name="teamName"
          placeholder="Team name"
          required
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90"
        >
          Continue →
        </button>
      </form>
      <Link href="/" className="mt-6 block text-center text-[var(--color-secondary)] hover:underline">
        Back to home
      </Link>
    </div>
  );
}
