import { OnboardingForm } from "./OnboardingForm";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">
        Create your team store
      </h1>
      <p className="text-[var(--color-secondary)] mb-8">
        Step 1: Account → Step 2: Upload logo → Step 3: Confirm branding → Step 4: Go live
      </p>
      <OnboardingForm />
    </div>
  );
}
