import React from "react";
import { motion } from "framer-motion";
import {
  X,
  Download,
  Share2,
  Heart,
  TrendingUp,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";

interface NFTModalProps {
  nft: {
    image: string;
    name: string;
    category: string;
    price: number;
    description: string;
    creator: string;
  };
  onClose: () => void;
}

const NFTModal: React.FC<NFTModalProps> = ({ nft, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
            {nft.name}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column - Image */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600">
                <Heart className="h-5 w-5" />
                <span>Like</span>
              </button>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-sm px-3 py-1 bg-violet-50 text-violet-600 rounded-xl font-medium">
                {nft.category}
              </span>
              {nft.price > 3 && (
                <span className="text-sm px-3 py-1 bg-amber-50 text-amber-600 rounded-xl font-medium flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" /> Trending
                </span>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500">
                Description
              </h3>
              <p className="text-slate-700">{nft.description}</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium text-slate-500">Creator</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600" />
                <div>
                  <p className="font-medium text-slate-800">{nft.creator}</p>
                  <a
                    href="#"
                    className="text-sm text-violet-600 flex items-center gap-1 hover:underline"
                  >
                    View Profile <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50">
                <div className="text-sm text-slate-500 mb-1">Current Price</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                  {nft.price} SUI
                </div>
              </div>

              <button className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Buy Now
              </button>
            </div>

            {/* Additional Details */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <h3 className="text-sm font-medium text-slate-500">Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-500">Contract Address</div>
                  <div className="font-medium text-slate-800">
                    0x1234...5678
                  </div>
                </div>
                <div>
                  <div className="text-slate-500">Token ID</div>
                  <div className="font-medium text-slate-800">#1234</div>
                </div>
                <div>
                  <div className="text-slate-500">Token Standard</div>
                  <div className="font-medium text-slate-800">Sui NFT</div>
                </div>
                <div>
                  <div className="text-slate-500">Blockchain</div>
                  <div className="font-medium text-slate-800">Sui</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NFTModal;
