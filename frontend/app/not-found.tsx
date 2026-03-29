import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-6xl font-bold text-heading mb-4">404</p>
        <p className="text-sm text-muted mb-8">This page doesn&apos;t exist.</p>
        <Link
          href="/"
          className="px-4 py-2 text-xs bg-[var(--color-accent)] text-black rounded-md hover:bg-[var(--color-accent-hover)] transition-colors font-bold"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
