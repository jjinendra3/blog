import { Post } from "@/lib/types";
import axios from "axios";

export async function FetchPosts(): Promise<Post[]> {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts`,
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
        params: {
          _t: Date.now(),
        },
      }
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
