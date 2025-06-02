import { Post } from "@/lib/types";
import axios from "axios";

export async function FetchPostByAuthor(authorId: string): Promise<Post[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${authorId}`,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts by author");
    }
    return response.data.posts;
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return [];
  }
}
