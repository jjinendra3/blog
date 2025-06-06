import prisma from "../utils/prisma";

export async function getUserByEmail(email: string) {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Database query failed");
  }
}

export async function createUser(email: string, passwordHash: string) {
  try {
    return await prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Database query failed");
  }
}

export const getUserById = async (id: string) => {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        posts: true,
      },
    });
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw new Error("Database query failed");
  }
};
