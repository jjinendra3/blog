import { Router } from "express";
import { createUser, getUserByEmail, getUserById } from "../helpers/authDb";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { checkRequestAuth } from "../middlewares/checkRequestMiddleware";
import { tokenAuth } from "../middlewares/authMiddleware";

const app = Router();

app.post("/signup", checkRequestAuth, async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await createUser(email, hashedPassword);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error: any) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.post("/login", checkRequestAuth, async (req: any, res: any) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email / No user Found!" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error: any) {
    console.error("Error during login:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

app.get("/user", tokenAuth, async (req: any, res: any) => {
  try {
    const user = await getUserById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});

module.exports = app;
