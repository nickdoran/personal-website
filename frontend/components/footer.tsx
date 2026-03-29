import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-subtle py-8 px-6">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted">
          &copy; {new Date().getFullYear()} {SITE.name}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-heading transition-colors"
          >
            GitHub
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted hover:text-heading transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="text-xs text-muted hover:text-heading transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
