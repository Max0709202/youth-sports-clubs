import Link from "next/link";

interface StorefrontNavProps {
  logoUrl: string | null;
  storeName: string;
}

export function StorefrontNav({ logoUrl, storeName }: StorefrontNavProps) {
  return (
    <header className="border-b border-[var(--color-primary)]/20 bg-[var(--color-background)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrl}
              alt={storeName}
              className="h-10 w-auto object-contain"
            />
          ) : (
            <span className="font-bold text-xl text-[var(--color-primary)]">
              {storeName}
            </span>
          )}
        </Link>
        <nav className="flex gap-6">
          <Link
            href="/collection/all"
            className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium"
          >
            Shop
          </Link>
          <Link
            href="/cart"
            className="text-[var(--color-text)] hover:text-[var(--color-accent)] font-medium"
          >
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
