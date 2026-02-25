import Link from "next/link";

export default function OnboardingLogoPage({
  searchParams,
}: {
  searchParams: Promise<{ tenant?: string }>;
}) {
  const params = await searchParams;
  const tenantSlug = params.tenant ?? "your-team";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        Step 2: Upload your logo
      </h1>
      <p className="text-[var(--color-secondary)] mb-8">
        Team: {tenantSlug}
      </p>
      <div className="w-full max-w-md space-y-4">
        <p className="text-sm text-[var(--color-secondary)]">
          Logo upload and theme extraction will be wired here. For now you can continue to the dashboard.
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
