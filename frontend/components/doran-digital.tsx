export function DoranDigital() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="p-8 border border-subtle rounded-lg bg-surface">
          <p className="text-xs text-[var(--color-accent)] mb-2 tracking-widest uppercase">
            My Agency
          </p>
          <h2 className="text-2xl font-bold text-heading mb-4">
            Doran Digital
          </h2>
          <p className="text-sm text-muted leading-relaxed mb-6 max-w-lg">
            I run a web development agency helping local businesses in the
            Greater Lansing area build their online presence. From custom
            websites to full digital strategy — I handle the entire process.
          </p>
          <a
            href="https://dorandigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 text-xs bg-[var(--color-accent)] text-black rounded-md hover:bg-[var(--color-accent-hover)] transition-colors font-bold"
          >
            Visit Doran Digital
          </a>
        </div>
      </div>
    </section>
  );
}
