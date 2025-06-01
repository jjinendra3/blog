import { Router } from "express";
import { createPost, getPosts, getPostsByAuthor } from "../helpers/postsDb";
import {
  checkRequestCreatePosts,
  checkRequestGetPostByAuthor,
} from "../middlewares/checkRequestMiddleware";
import { tokenAuth } from "../middlewares/authMiddleware";

const app = Router();

app.get("/posts", async (req: any, res: any) => {
  try {
    const posts = await getPosts();
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.get(
  "/post/:authorId",
  checkRequestGetPostByAuthor,
  async (req: any, res: any) => {
    try {
      const { authorId } = req.params;
      const posts = await getPostsByAuthor(authorId);

      if (!posts || posts.length === 0) {
        return res
          .status(404)
          .json({ error: "No posts found for this author" });
      }

      return res.status(200).json({
        success: true,
        data: posts,
      });
    } catch (error: any) {
      console.error("Error fetching posts by author:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }
);

app.post(
  "/create",
  tokenAuth,
  checkRequestCreatePosts,
  async (req: any, res: any) => {
    try {
      const { title, content, userId } = req.body;
      await createPost(title, content, userId);
      return res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      console.error("Error creating post:", error);
      return res.status(500).json({
        error: "Internal server error",
        message: error.message,
      });
    }
  }
);

export default app;
