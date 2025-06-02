import React from "react";
import { BlogCard } from "@/components/BlogCard";
import { Footer } from "@/components/HomePage/Footer";
import { FetchPosts } from "@/services/fetchPosts";
import { Post } from "@/lib/types";
import Link from "next/link";
export const revalidate = 0; 

export default async function Page() {
  const posts = await FetchPosts();
  const authors = posts.map((post: Post) => ({
    email: post.author?.email,
    id: post.authorId,
  }));
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            Code, Cinema & Contemplation
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Exploring the intersection of technology, creative storytelling, and
            philosophical inquiry. A space for deep dives into code, film, and
            the ideas that shape our digital world.
          </p>
        </div>

        <div className="mb-12">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">
              Browse by Author
            </h3>
            <p className="text-gray-400">
              Discover posts from our talented writers
            </p>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {authors.map((author) => (
              <Link
                key={author.id}
                href={`/author/${author.id}`}
                className="flex-shrink-0 bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                {author.email}
              </Link>
            ))}
          </div>
        </div>

        {posts.length !== 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {posts.map((post: Post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div>
            <p className="text-center text-gray-500 text-lg">
              No posts available at the moment. Please check back later!
            </p>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
