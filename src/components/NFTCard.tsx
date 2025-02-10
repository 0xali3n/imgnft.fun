import React from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

interface NFTCardProps {
  nft: {
    id: string;
    image: string;
    price: number;
    category: string;
    name: string;
    description: string;
    creator: string;
  };
  viewMode: "grid" | "list";
  onClick: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, viewMode, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 hover:shadow-2xl transition-all cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`relative ${
          viewMode === "list"
            ? "w-full sm:w-48 aspect-square sm:aspect-auto"
            : "aspect-square"
        }`}
      >
        <img
          src={nft.image}
          alt={nft.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text font-semibold">
            {nft.price} SUI
          </span>
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs px-3 py-1 bg-violet-50 text-violet-600 rounded-xl font-medium">
            {nft.category}
          </span>
          {nft.price > 3 && (
            <span className="text-xs px-3 py-1 bg-amber-50 text-amber-600 rounded-xl font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Trending
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-800 mb-2 truncate">
          {nft.name}
        </h3>
        <p className="text-sm text-slate-500 mb-4 line-clamp-2">
          {nft.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 font-medium">
            by {nft.creator}
          </span>
          <button className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NFTCard;
