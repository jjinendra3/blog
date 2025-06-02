import { FetchReturnType } from "@/lib/types";
import axios from "axios";

export default async function Login(
  email: string,
  password: string,
): Promise<FetchReturnType> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      },
    );

    if (response.status !== 200) {
      return {
        success: false,
        message: response.data.message || "Login failed",
      };
    }
    return {
      success: true,
      token: response.data.token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
