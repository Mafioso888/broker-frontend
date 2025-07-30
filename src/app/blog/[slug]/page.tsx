// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blogData";

type Props = {
  params: {
    slug: string;
  };
};

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto py-12 px-4 text-white">
      <h1 className="text-4xl font-bold mb-4 text-pink-500">{post.title}</h1>
      <p className="text-sm text-zinc-400 mb-6">
        {post.date} · {post.author} · {post.category}
      </p>

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-64 object-cover rounded-xl mb-6"
      />

      <article
        className="prose prose-invert prose-p:text-zinc-200 prose-li:marker:text-pink-500 prose-a:text-pink-400"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
