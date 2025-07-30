'use client';

import { blogPosts } from '@/lib/blogData';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BlogPage() {
  const [search, setSearch] = useState('');

  const filteredPosts = blogPosts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10 max-w-7xl mx-auto">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">InsightPip Blog</h1>
        <p className="text-zinc-400 text-lg">
          Stay updated with the latest insights, comparisons, and strategies in the trading world.
        </p>
      </section>

      <div className="mb-8 max-w-md mx-auto">
        <Input
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-zinc-900 text-white border border-zinc-700"
        />
      </div>

      <section className="grid md:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <motion.div
            key={post.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg"
          >
            <Card>
              <img src={post.imageUrl} alt={post.title} className="h-48 w-full object-cover" />
              <CardContent className="p-4">
                <span className="text-xs text-pink-500">{post.category}</span>
                <h2 className="text-xl font-bold my-2">{post.title}</h2>
                <p className="text-sm text-zinc-400">{post.summary}</p>
                <div className="flex justify-between items-center mt-4 text-sm text-zinc-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block mt-4 text-pink-500 hover:underline"
                >
                  Read more →
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
