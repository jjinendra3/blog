import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPosts } from "@/lib/types";

export const BlogCard = ({ post }: { post: BlogPosts }) => {
  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.content}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{post.createdAt.toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );
};
