import React from "react";
import { BlogCard } from "@/components/BlogCard";
import { Footer } from "@/components/HomePage/Footer";
import { FetchPostByAuthor } from "@/services/fetchPostByAuthor";
import { Post } from "@/lib/types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthorPageProps {
  params: {
    authorId: string;
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { authorPosts, authorInfo } = await FetchPostByAuthor(params.authorId);

  return !authorInfo ? (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
          {"Author Doesn't Exist"}
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          {"The author you're looking for doesn't exist or has been removed."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white hover:text-gray-300 transition-colors duration-200 text-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Browse all posts
        </Link>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="min-h-screen bg-black text-white">
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            {authorInfo.name}
          </h1>
          <div className="flex flex-col items-center gap-4 mb-8">
            <p className="text-xl text-gray-400">{authorInfo.email}</p>
            <div className="text-gray-500">
              {authorPosts.length} {authorPosts.length === 1 ? "post" : "posts"}{" "}
              published
            </div>
          </div>
        </div>

        {authorPosts.length != 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {authorPosts.map((post: Post) => (
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

        <div className="text-center mt-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to all posts
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
