import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/timeUtils";
import { Post } from "@/lib/types";
import Link from "next/link";

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
      <Link href={`/post/${post.id}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-1">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
            {post.content}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Written by: {post.author?.email}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
