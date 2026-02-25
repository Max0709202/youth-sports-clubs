import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        Create your team store
      </h1>
      <p className="text-[var(--color-secondary)] mb-8">
        Step 1: Account → Step 2: Upload logo → Step 3: Confirm branding → Step 4: Go live
      </p>
      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Team name"
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-[var(--color-primary)]/30 bg-transparent"
        />
        <button
          type="button"
          className="w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90"
        >
          Continue →
        </button>
      </div>
      <Link href="/" className="mt-6 text-[var(--color-secondary)] hover:underline">
        Back to home
      </Link>
    </div>
  );
}
