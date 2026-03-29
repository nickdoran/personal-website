import { EXPERIENCE } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-heading mb-8">Experience</h2>
        <div className="space-y-8">
          {EXPERIENCE.map((exp) => (
            <div key={`${exp.company}-${exp.role}`} className="group">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="text-base font-bold text-heading">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-[var(--color-accent)]">
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs text-muted shrink-0">
                  {exp.period}
                </span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {exp.description.map((line, i) => (
                  <li key={i} className="text-sm text-muted leading-relaxed flex gap-2">
                    <span className="text-[var(--color-accent)] shrink-0 mt-1">
                      &rsaquo;
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <a
            href="/Nicklas_Doran_Resume_v5.pdf"
            download="Nicklas_Doran_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs border border-subtle rounded-md text-muted hover:text-heading hover-surface transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
