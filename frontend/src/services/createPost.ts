import { FetchReturnType } from "@/lib/types";
import axios from "axios";

export default async function CreatePost(
  title: string,
  content: string,
  userId: string
): Promise<FetchReturnType> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/post/create`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${userId}`,
        },
      }
    );

    if (response.status !== 201) {
      return {
        success: false,
        message: response.data.message || "Post creation failed",
      };
    }
    return { success: true };
  } catch (error) {
    console.error("Create post error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
