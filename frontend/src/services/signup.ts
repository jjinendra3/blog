import { FetchReturnType } from "@/lib/types";
import axios from "axios";

export default async function Signup(
  email: string,
  password: string
): Promise<FetchReturnType> {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        email,
        password,
      }
    );

    if (response.status !== 201) {
      return {
        success: false,
        message: response.data.message || "Signup failed",
      };
    }
    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
}
