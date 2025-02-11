import React from "react";
import { Brain } from "lucide-react";
import { ConnectButton } from "@suiet/wallet-kit";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white/70 backdrop-blur-lg border-b border-slate-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="flex items-center text-2xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl p-2 hover:scale-105 transition-transform cursor-pointer">
              <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
                ImagineNFT
              </span>
              <span className="text-xs text-slate-500 hidden sm:block">
                AI-Powered NFT Creation
              </span>
            </div>
          </Link>
          
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <button
              onClick={() => navigate("/launch")}
              className="w-full sm:w-auto px-2.5 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all hover:scale-105 font-medium shadow-lg shadow-violet-200/50 text-xs sm:text-sm whitespace-nowrap"
            >
              Launch NFT
            </button>
            <ConnectButton/>
            <div className="text-xs px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">
              Testnet
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
