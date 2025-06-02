import axios from "axios";

export default async function FetchUser(token: string) {
  if (!token) {
    throw new Error("You must be logged in to fetch user data");
  }

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch user data");
  }
  return response.data;
}
