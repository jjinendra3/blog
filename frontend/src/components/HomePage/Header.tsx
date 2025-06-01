import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const Header = () => {
  return (
    <header className="border-b border-gray-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              JJ Blogs
            </h1>
            <nav className="hidden md:flex items-center gap-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Archive
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search posts..."
                className="pl-10 pr-4 py-2 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400 focus:border-blue-500 w-64"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
