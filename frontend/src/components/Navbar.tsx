import { Home, PlusCircle, User2Icon } from "lucide-react";
import Link from "next/link";
export const Navbar = () => {
  return (
    <header className="border-b border-gray-800 bg-black backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              JJ Blogs
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition-colors"
                title="Home"
              >
                <Home className="inline-block" />
              </Link>

              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
                title="Login"
              >
                <User2Icon className="inline-block" />
              </Link>
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors"
                title="Dashboard"
              >
                <PlusCircle className="inline-block" />
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
