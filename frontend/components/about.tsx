export function About() {
    return (
        <section id="about" className="py-24 px-6">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-heading mb-8">About</h2>
                <div className="space-y-4 text-sm text-muted leading-relaxed">
                    <p>
                        I&apos;m a sophomore at Michigan State University with a
                        4.0 GPA, looking to get into the Eli Broad College of
                        Business for Management with an Entrepreneurship &amp;
                        Innovation minor. I&apos;ve studied computer science,
                        taught myself full-stack development, and picked up
                        Python, TypeScript, React, Next.js, FastAPI, and SQL
                        along the way.
                    </p>
                    <p>
                        I started building software about a year ago and quickly
                        realized I wanted to do more than just write code — I
                        wanted to build things people actually use. That led me
                        to start Doran Digital, a small web development agency.
                        It&apos;s not the end goal — it&apos;s a stepping stone.
                        A way to sharpen my skills, learn how to deliver for
                        real clients, and build toward what I really want:
                        becoming a technical founder at a venture-backed
                        company.
                    </p>
                    <p>
                        When I&apos;m not working, you&apos;ll find me on the
                        golf course or behind my Sony A6700 shooting photos and
                        video.
                    </p>
                </div>

                <div className="mt-10 flex flex-wrap gap-3">
                    {[
                        "TypeScript",
                        "Python",
                        "React",
                        "Next.js",
                        "FastAPI",
                        "SQL",
                        "Tailwind CSS",
                        "Git",
                        "Vercel",
                    ].map((skill) => (
                        <span
                            key={skill}
                            className="px-3 py-1 text-xs border border-subtle rounded-full text-muted"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
