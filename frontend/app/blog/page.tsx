import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on building software, startups, and learning in public.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-heading mb-4">Blog</h1>
        <p className="text-sm text-muted mb-12">
          Thoughts on building software, startups, and learning in public.
        </p>

        {posts.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted">
              No posts yet. Stay tuned — I&apos;m working on something.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block p-5 border border-subtle rounded-lg hover-surface transition-all duration-200 group"
              >
                <time className="text-xs text-muted">{post.date}</time>
                <h2 className="text-base font-bold text-heading mt-1 mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
