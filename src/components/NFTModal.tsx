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
import { toast } from 'react-toastify';

interface NFTModalProps {
  nft: {
    image_url: string;
    name: string;
    category: string;
    price: number;
    description: string;
    wallet_address: string;
  };
  onClose: () => void;
}

const NFTModal: React.FC<NFTModalProps> = ({ nft, onClose }) => {
  const handleBuyNow = () => {
    toast.error('Insufficient balance', {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white w-full min-h-screen sm:min-h-fit sm:rounded-3xl sm:my-4 sm:mx-4 sm:w-auto sm:max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b border-slate-100">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-slate-800 truncate max-w-[80%]">
              {nft.name}
            </h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-xl transition-colors shrink-0"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column - Image */}
            <div className="space-y-3">
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={nft.image_url}
                  alt={nft.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 text-xs">
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 text-xs">
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Share</span>
                </button>
                <button className="flex items-center justify-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors text-slate-600 text-xs">
                  <Heart className="h-3.5 w-3.5" />
                  <span>Like</span>
                </button>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs px-2.5 py-1 bg-violet-50 text-violet-600 rounded-lg font-medium">
                  {nft.category}
                </span>
                {nft.price > 3 && (
                  <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-600 rounded-lg font-medium flex items-center gap-1">
                    <TrendingUp className="h-3.5 w-3.5" /> Trending
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-xs font-medium text-slate-500 mb-1">Description</h3>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {nft.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-medium text-slate-500 mb-2">Creator</h3>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-medium text-slate-800 text-xs truncate">
                      {nft.wallet_address}
                    </p>
                    <a
                      href="#"
                      className="text-xs text-violet-600 flex items-center gap-1 hover:underline"
                    >
                      View Profile <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Price and Buy Section */}
              <div className="sticky bottom-0 left-0 right-0 bg-white pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 mb-2">
                  <div className="text-xs text-slate-500">Current Price</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                    20 SUI
                  </div>
                </div>

                <button 
                  onClick={handleBuyNow}
                  className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity font-medium flex items-center justify-center gap-1.5 text-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Buy Now
                </button>
              </div>

              {/* Additional Details */}
              <div className="border-t border-slate-100 pt-3">
                <h3 className="text-xs font-medium text-slate-500 mb-2">Details</h3>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-slate-500">Contract Address</div>
                    <div className="font-medium text-slate-800 truncate">0x1234...5678</div>
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
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NFTModal;
