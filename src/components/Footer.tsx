import React from "react";
import { BiBrain } from "react-icons/bi";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

interface FooterProps {
  categories: string[];
}

const Footer: React.FC<FooterProps> = ({ categories }) => {
  return (
    <footer className="bg-white/70 backdrop-blur-lg border-t border-slate-100 mt-12 sm:mt-20">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-2">
                <BiBrain className="h-7 w-7 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                ImagineNFT
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              Discover, collect, and sell extraordinary AI-generated NFTs on the
              Sui blockchain.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-slate-400 hover:text-violet-600 transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.com"
                className="text-slate-400 hover:text-violet-600 transition-colors"
              >
                <FaDiscord className="h-5 w-5" />
              </a>
              <a
                href="https://github.com"
                className="text-slate-400 hover:text-violet-600 transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="hidden sm:block">
            <h3 className="font-semibold text-slate-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category}>
                  <a
                    href="#"
                    className="text-slate-500 hover:text-violet-600 transition-colors text-sm"
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2">
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-violet-600 transition-colors text-sm"
                >
                  Explore
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-violet-600 transition-colors text-sm"
                >
                  How it Works
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-violet-600 transition-colors text-sm"
                >
                  Create NFT
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-slate-500 hover:text-violet-600 transition-colors text-sm"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">
              Join Newsletter
            </h3>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all bg-white/50 text-sm"
              />
              <button className="w-full px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-slate-500">
          <p>© 2024 ImagineNFT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
