import { Router } from "express";
import {
  createPost,
  getPostById,
  getPosts,
  getPostsByAuthor,
} from "../helpers/postsDb";
import {
  checkRequestCreatePosts,
  checkRequestGetPostByAuthor,
} from "../middlewares/checkRequestMiddleware";
import { tokenAuth } from "../middlewares/authMiddleware";
import { getUserById } from "../helpers/authDb";

const app = Router();

app.get("/", async (_: any, res: any) => {
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

app.get("/:id", async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const post = await getPostById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error: any) {
    console.error("Error fetching post by ID:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.get("/post/:authorId", async (req: any, res: any) => {
  try {
    const { authorId } = req.params;
    const authorWithPosts = await getUserById(authorId);
    if (!authorWithPosts) {
      return res.status(404).json({ error: "No such author found" });
    }

    return res.status(200).json({
      success: true,
      data: authorWithPosts,
    });
  } catch (error: any) {
    console.error("Error fetching posts by author:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.post(
  "/create",
  tokenAuth,
  checkRequestCreatePosts,
  async (req: any, res: any) => {
    try {
      const { title, content } = req.body;
      const post = await createPost(title, content, req.userId);
      return res.status(201).json({
        success: true,
        data: post,
        message: "Post created successfully",
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

module.exports = app;
