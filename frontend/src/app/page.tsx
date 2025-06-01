import React from "react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { blogPosts } from "@/lib/constants";
import { Footer } from "@/components/HomePage/Footer";

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            Code, Cinema & <br />
            Contemplation
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Exploring the intersection of technology, creative storytelling, and
            philosophical inquiry. A space for deep dives into code, film, and
            the ideas that shape our digital world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="default"
            className="border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600"
          >
            Load More Posts
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
