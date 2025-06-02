import { Post } from "@/lib/types";
import axios from "axios";

export async function FetchPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts");
    }
    return response.data.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}
