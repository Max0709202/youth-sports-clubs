import Link from "next/link";

export default async function OnboardingLogoPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string; pending?: string }>;
}) {
  const params = await searchParams;
  const tenantSlug = params.tenant ?? "your-team";
  const isPending = params.pending === "1";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        {isPending ? "Account created" : "Step 2: Upload your logo"}
      </h1>
      <p className="text-[var(--color-secondary)] mb-8">
        {isPending
          ? "Your account is ready. Connect the database (use the pooler URL in DATABASE_URL) to create your team store and finish setup."
          : `Team: ${tenantSlug}`}
      </p>
      <div className="w-full max-w-md space-y-4">
        <p className="text-sm text-[var(--color-secondary)]">
          {isPending
            ? "Once the database is connected, you can sign in again and complete onboarding to get a branded store."
            : "Logo upload and theme extraction will be wired here. For now you can continue to the dashboard."}
        </p>
        <Link
          href="/dashboard"
          className="block w-full py-3 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:opacity-90 text-center"
        >
          Go to dashboard →
        </Link>
      </div>
    </div>
  );
}
