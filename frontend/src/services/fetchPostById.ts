import { Post } from "@/lib/types";
import axios from "axios";

export default async function FetchPostById(id: string): Promise<Post | null> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch post");
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return null;
  }
}
