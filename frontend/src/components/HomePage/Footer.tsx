import {
  Twitter,
  Github,
  Linkedin,
  Mail,
  Heart,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900/50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              JJ Blogs
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A personal exploration of technology, creativity, and ideas that
              matter. Join me on this journey through code, cinema, and
              contemplation.
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <Heart className="w-4 h-4 mr-1 text-red-400" />
              Made with passion for sharing knowledge
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center">
              Connect
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="https://x.com/jjinendra3"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-400 transition-colors flex items-center group"
                >
                  <Twitter className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/jjinendra3"
                  target="_blank"
                  className="text-gray-400 hover:text-white transition-colors flex items-center group"
                >
                  <Github className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://linkedin.com/in/jjinendra3"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-300 transition-colors flex items-center group"
                >
                  <Linkedin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </h4>
            <div className="text-sm">
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=jjinendra3@gmail.com"
                className="text-gray-400 hover:text-white transition-colors flex items-center group"
              >
                <Mail className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                jjinendra3@gmail.com
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 JJ Blogs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
