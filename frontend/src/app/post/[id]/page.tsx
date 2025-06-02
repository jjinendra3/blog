import React from "react";
import { Footer } from "@/components/HomePage/Footer";
import FetchPostById from "@/services/fetchPostById";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/timeUtils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await FetchPostById(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-gray-400 text-lg">
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Written by</span>
              <span className="text-white font-medium">
                {post.author?.email}
              </span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500">Published</span>
              <span className="text-white font-medium">
                {formatDate(post.createdAt)}
              </span>
            </div>
          </div>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all posts
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
