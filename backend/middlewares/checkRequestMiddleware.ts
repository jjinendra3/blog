import { Request, Response, NextFunction } from "express";

export const checkRequestAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ error: "Please provide a valid email address" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
    return;
  }

  next();
};

export const checkRequestGetPostByAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorId } = req.params;

  if (!authorId) {
    res.status(400).json({ error: "Author ID is required" });
    return;
  }

  next();
};

export const checkRequestCreatePosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    res.status(400).json({ error: "Title, content, and user ID are required" });
    return;
  }
  next();
};
