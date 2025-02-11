import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Wallet } from "lucide-react";

interface NFTCardProps {
  nft: {
    id: string;
    image_url: string;
    price: number;
    category: string;
    name: string;
    description: string;
    wallet_address: string;
  };
  viewMode: "grid" | "list";
  onClick: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ nft, viewMode, onClick }) => {
  const truncateAddress = (address: string) => {
    if (address.length <= 8) return address;
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

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
          src={nft.image_url}
          alt={nft.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-xl text-xs sm:text-sm">
          <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text font-semibold">
            20 SUI
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-5">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-violet-50 text-violet-600 rounded-xl font-medium">
            {nft.category}
          </span>
          {nft.price > 3 && (
            <span className="text-[10px] sm:text-xs px-2 sm:px-3 py-1 bg-amber-50 text-amber-600 rounded-xl font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> Trending
            </span>
          )}
        </div>
        <h3 className="font-semibold text-slate-800 mb-2 truncate text-sm sm:text-base">
          {nft.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-4 line-clamp-2">
          {nft.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500">
            <Wallet className="h-3 w-3" />
            <span className="font-medium">
              {truncateAddress(nft.wallet_address)}
            </span>
          </div>
          <button className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity text-xs sm:text-sm font-medium">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NFTCard;
