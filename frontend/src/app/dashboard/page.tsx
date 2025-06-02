"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Calendar, User, Send, FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Post } from "@/lib/types";
import { useRouter } from "next/navigation";
import FetchUser from "@/services/fetchUser";
import CreatePost from "@/services/createPost";
import { toast } from "sonner";
import { BlogCard } from "@/components/BlogCard";

const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2000, "Content must be less than 2000 characters"),
});

type PostFormData = z.infer<typeof postSchema>;

const DashboardPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = sessionStorage.getItem("authToken");
        if (!token) {
          throw new Error("You must be logged in to view posts");
        }
        const fetchedUser = await FetchUser(token);
        if (!fetchedUser.success) {
          throw new Error(fetchedUser.message || "Failed to fetch user data");
        }
        setPosts(fetchedUser.data.posts ?? []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        toast.error(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
    mode: "onChange",
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = form;

  const onSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        throw new Error("You must be logged in to create a post");
      }
      const newPost = await CreatePost(data.title, data.content, token);

      setPosts([newPost.data as Post, ...posts]);
      toast.success("Post created successfully!");
      reset();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
      toast.error(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative max-w-4xl mx-auto px-4 py-8 space-y-8">
        <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-white">
              <Plus className="w-5 h-5" />
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="border-red-800 bg-red-900/20 mb-6">
                <AlertDescription className="text-red-300">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">
                        Post Title
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            {...field}
                            type="text"
                            placeholder="Enter your post title..."
                            className="pl-10 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-300">Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write your post content here..."
                          className="min-h-32 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 transition-all duration-200 disabled:opacity-50"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Publishing...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Publish Post
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Your Posts</h2>
            <span className="text-sm text-gray-400">({posts.length})</span>
          </div>

          {posts.length === 0 ? (
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-md">
              <CardContent className="py-12 text-center">
                <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">
                  No posts yet. Create your first post above!
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
