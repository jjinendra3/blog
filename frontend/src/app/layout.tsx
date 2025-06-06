import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JJ Blogs - Code, Cinema & Contemplation",
  description:
    "Exploring the intersection of technology, creative storytelling, and philosophical inquiry. A space for deep dives into code, film, and the ideas that shape our digital world.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster
          expand
          position="bottom-right"
          richColors
          theme="dark"
        />
      </body>
    </html>
  );
}
