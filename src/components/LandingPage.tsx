import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { nftData, categories } from "../data";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Controls from "./Controls";
import NFTCard from "./NFTCard";
import NFTModal from "./NFTModal";
import Footer from "./Footer";

const LandingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedNFT, setSelectedNFT] = useState<(typeof nftData)[0] | null>(
    null
  );

  const filteredNFTs = nftData
    .filter(
      (nft) => selectedCategory === "All" || nft.category === selectedCategory
    )
    .filter((nft) => nft.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />
      <Hero />

      <main className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
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
          className={`grid gap-4 sm:gap-6 ${
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
