import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "../data";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Controls from "./Controls";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import Footer from "./Footer";
import { supabase } from '../utils/supabaseClient';

// Define the NFT type
interface NFT {
  id: string;
  image_url: string;
  price: number;
  category: string;
  name: string;
  description: string;
  wallet_address: string;
}

const LandingPage: React.FC = () => {
  const [nftData, setNftData] = useState<NFT[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);

  useEffect(() => {
    const fetchNFTs = async () => {
      const { data, error } = await supabase.from('nfts').select('*');
      if (error) {
        console.error("Error fetching NFTs:", error);
      } else {
        setNftData(data);
      }
    };

    fetchNFTs();
  }, []);

  const filteredNFTs = nftData
    .filter(
      (nft) => selectedCategory === "All" || nft.category === selectedCategory
    )
    .filter((nft) => nft.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <Hero />

      <main className="container mx-auto px-4 sm:px-6 py-4 sm:py-12">
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`grid gap-3 sm:gap-6 mt-4 sm:mt-8 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredNFTs.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              viewMode={viewMode}
              onClick={() => setSelectedNFT(nft)}
            />
          ))}
        </motion.div>
      </main>

      <AnimatePresence>
        {selectedNFT && (
          <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
        )}
      </AnimatePresence>

      <Footer categories={categories} />
    </div>
  );
};

export default LandingPage;
