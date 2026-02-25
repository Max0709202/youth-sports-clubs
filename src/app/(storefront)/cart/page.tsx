import Link from "next/link";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Cart</h1>
      <p className="text-[var(--color-secondary)] mb-6">
        Server-backed cart coming in Week 2. For now, add-to-cart will persist in session/DB.
      </p>
      <Link
        href="/collection/all"
        className="text-[var(--color-primary)] hover:underline font-medium"
      >
        Continue shopping
      </Link>
    </div>
  );
}
