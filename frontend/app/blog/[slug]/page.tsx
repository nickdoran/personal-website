import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="pt-28 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="text-xs text-muted hover:text-heading transition-colors mb-8 inline-block"
        >
          &larr; Back to blog
        </Link>
        <header className="mb-10">
          <time className="text-xs text-muted">{post.date}</time>
          <h1 className="text-3xl font-bold text-heading mt-2">{post.title}</h1>
          {post.description && (
            <p className="text-sm text-muted mt-3">{post.description}</p>
          )}
        </header>
        <div className="prose-custom text-sm text-muted leading-relaxed whitespace-pre-wrap">
          {post.content}
        </div>
      </div>
    </article>
  );
}
