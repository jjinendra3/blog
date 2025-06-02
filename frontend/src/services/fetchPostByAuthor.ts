import axios from "axios";

export async function FetchPostByAuthor(authorId: string) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/post/${authorId}`
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch posts by author");
    }
    return {
      authorPosts: response.data.data.posts,
      authorInfo: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    return {
      authorPosts: null,
      authorInfo: null,
    };
  }
}
