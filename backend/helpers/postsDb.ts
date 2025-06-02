import prisma from "../utils/prisma";

export const getPosts = async () => {
  try {
    return await prisma.post.findMany({
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Database query failed");
  }
};

export const getPostsByAuthor = async (authorId: string) => {
  try {
    return await prisma.post.findMany({
      where: { authorId },
    });
  } catch (error) {
    console.error("Error fetching posts by author:", error);
    throw new Error("Database query failed");
  }
};

export const getPostById = async (id: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            email: true,
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    throw new Error("Database query failed");
  }
};

export const createPost = async (
  title: string,
  content: string,
  authorId: string
) => {
  try {
    return await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
  } catch (error) {
    console.error("Error creating post:", error);
    throw new Error("Database query failed");
  }
};
