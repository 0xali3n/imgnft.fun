import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Sparkles,
  Wand2,
  Rocket,
  ChevronDown,
  Check,
} from "lucide-react";
import { categories } from "../data";
import Navbar from "./Navbar";
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { PLAYVERSE_NFT_CONTRACT } from '../utils/config';
import { useWallet } from "@suiet/wallet-kit";
import { supabase } from '../utils/supabaseClient';

// Add your ImgBB API key here
const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY || 'your-imgbb-api-key';

const LaunchNFT: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[1]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [hasGeneratedImage, setHasGeneratedImage] = useState(false);
  const [generationAttemptsLeft, setGenerationAttemptsLeft] = useState(3);
  const wallet = useWallet();
  const [, setNftObjectId] = useState<string>('');
  const [isDeploying, setIsDeploying] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (data.success) {
          setPreviewImage(data.data.url);
        } else {
          console.error("Error uploading image to ImgBB:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const generateAIDescription = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    try {
      const prompt = `As a professional NFT curator, create a compelling single-sentence description for an NFT collection.

Collection Name: "${name}"
Category: "${selectedCategory}"
${description ? `Context: ${description}` : ""}

Requirements:
- Create a sophisticated, market-ready description
- Focus on uniqueness and value proposition
- Use professional, engaging language
- Must be exactly one sentence
- No asterisks or special formatting
- Keep it concise but impactful

Response format: Return only the description sentence, nothing else.`;

      const response = await fetch(
        "https://api.atoma.network/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_ATOMA_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "meta-llama/Llama-3.3-70B-Instruct",
            messages: [
              {
                content: prompt,
                role: "User",
                name: "User",
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("Generated Description:", data.choices[0]?.message?.content);

      if (data.choices && data.choices[0]?.message?.content) {
        const cleanDescription = data.choices[0].message.content
          .replace(/\*/g, "")
          .replace(/[\n\r]/g, " ")
          .trim()
          .replace(/\s+/g, " ")
          .replace(/^["']|["']$/g, "");
        setDescription(cleanDescription);
      }
    } catch (error) {
      console.error("Error generating description:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateImage = async () => {
    if (isGeneratingImage || !description || generationAttemptsLeft <= 0)
      return;

    setIsGeneratingImage(true);
    try {
      setGenerationAttemptsLeft((prev) => prev - 1);

      const imagePrompt = `Create a high-quality NFT artwork with the following description: ${description}. 
Style requirements:
- Professional digital art style
- Highly detailed and visually striking
- Suitable for NFT marketplace
- Clear focal point
- Vibrant and appealing color palette
- Modern and trendy aesthetic`;

      const response = await fetch(
        "https://api.openai.com/v1/images/generations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "dall-e-3",
            prompt: imagePrompt,
            n: 1,
            size: "1024x1024",
          }),
        }
      );

      const data = await response.json();
      console.log("Generated Image URL:", data.data[0].url);

      if (data.data && data.data[0]?.url) {
        setPreviewImage(data.data[0].url);
        setHasGeneratedImage(true);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleDeployClick = () => {
    setShowConfirmationModal(true);
  };

  const confirmDeployNFTCollection = async () => {
    setShowConfirmationModal(false);
    if (!wallet?.account?.address || !name || !description || !previewImage) return;
    
    setIsDeploying(true);
    try {
      const transactionBlock = new TransactionBlock();
      transactionBlock.moveCall({
        target: `${PLAYVERSE_NFT_CONTRACT}::nft::mint_to_sender`,
        arguments: [
          transactionBlock.pure(name),
          transactionBlock.pure(description),
          transactionBlock.pure(previewImage),
          transactionBlock.pure(0)
        ]
      });

      const response = await wallet.signAndExecuteTransactionBlock({
        transactionBlock,
        options: {
          showEffects: true,
          showObjectChanges: true,
        }
      });

      console.log("Transaction Response:", response);

      if (response?.digest) {
        // Store transaction digest instead of object ID
        setNftObjectId(response.digest);

        // Add NFT details to Supabase with transaction hash
        const { error } = await supabase.from('nfts').insert({
          name,
          description,
          image_url: previewImage,
          category: selectedCategory,
          wallet_address: wallet.account.address,
          transaction_hash: response.digest
        });

        if (error) {
          console.error("Error storing NFT details:", error);
          // You can add error notification here
        } else {
          // Show modal to list NFT
          setShowListModal(true);
        }
      }
    } catch (error) {
      console.error("Error deploying NFT:", error);
      // You can add error notification here
    } finally {
      setIsDeploying(false);
    }
  };

  const handleListNFT = async () => {
    // Store NFT details in the listed_nfts table
    const { error } = await supabase.from('listed_nfts').insert({
      name,
      description,
      image_url: previewImage,
      category: selectedCategory,
      wallet_address: wallet?.account?.address || ''
    });

    if (error) {
      console.error("Error listing NFT:", error);
      // You can add error notification here
    } else {
      alert("NFT listed successfully!");
      setShowListModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <motion.h1
              className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transform Your Imagination into NFTs
            </motion.h1>
            <motion.p
              className="text-slate-600 text-base sm:text-lg px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Use AI to generate unique artwork or upload your own masterpiece
            </motion.p>
          </div>

          {/* Main Form */}
          <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-200/50 p-4 sm:p-8 hover:shadow-2xl transition-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Left Column - Form Fields */}
              <div className="space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-lg font-medium text-slate-700 mb-3">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all bg-white/50 hover:bg-white/80"
                    placeholder="Enter your NFT collection name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative"
                >
                  <label className="block text-lg font-medium text-slate-700 mb-3">
                    Category
                  </label>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 hover:bg-white/80 flex items-center justify-between text-slate-700 hover:border-violet-400 transition-all"
                  >
                    {selectedCategory}
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute w-full mt-2 py-2 bg-white rounded-xl shadow-lg border border-slate-100 z-10"
                      >
                        {categories.slice(1).map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left hover:bg-slate-50 flex items-center justify-between text-slate-700"
                          >
                            {category}
                            {selectedCategory === category && (
                              <Check className="w-4 h-4 text-violet-600" />
                            )}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-lg font-medium text-slate-700 mb-3">
                    Description
                  </label>
                  <textarea
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all bg-white/50 hover:bg-white/80 mb-4 text-base"
                    placeholder="Describe your NFT collection or type your imagination prompt"
                  />
                  <button
                    onClick={generateAIDescription}
                    disabled={isGenerating}
                    className={`w-full px-6 py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-violet-200/50 ${
                      isGenerating
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:opacity-90 hover:scale-105"
                    }`}
                  >
                    <Wand2 className="w-5 h-5" />
                    {isGenerating ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Crafting your description...
                      </div>
                    ) : description ? (
                      "Regenerate Description with AI"
                    ) : (
                      "Generate Description with AI"
                    )}
                  </button>
                </motion.div>
              </div>

              {/* Right Column - Image Upload */}
              <motion.div
                className="flex flex-col justify-between h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div>
                  <div className="relative mb-4">
                    <div
                      className={`w-full h-48 sm:h-64 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-4 group hover:border-violet-400 transition-colors ${
                        previewImage
                          ? "bg-slate-50"
                          : "bg-gradient-to-br from-violet-50 to-indigo-50"
                      }`}
                    >
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="h-full w-full object-contain rounded-lg"
                        />
                      ) : (
                        <div className="text-center group-hover:scale-105 transition-transform">
                          <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3 group-hover:text-violet-500 transition-colors" />
                          <p className="text-slate-600 text-sm">
                            Drag and drop your NFT artwork here
                          </p>
                        </div>
                      )}
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-500 text-center mt-2">
                      Supported formats: JPG, PNG, GIF, WEBP (max 20MB)
                    </p>
                  </div>
                  <button
                    onClick={generateImage}
                    disabled={
                      isGeneratingImage ||
                      !description ||
                      generationAttemptsLeft <= 0
                    }
                    className={`w-full px-4 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl transition-all flex items-center justify-center gap-2 font-medium shadow-lg shadow-violet-200/50 text-sm sm:text-base ${
                      isGeneratingImage ||
                      !description ||
                      generationAttemptsLeft <= 0
                        ? "opacity-75 cursor-not-allowed"
                        : "hover:opacity-90 hover:scale-105"
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                    {isGeneratingImage ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Creating your artwork...
                      </div>
                    ) : !description ? (
                      "Generate Description First"
                    ) : generationAttemptsLeft <= 0 ? (
                      "No generations left"
                    ) : hasGeneratedImage ? (
                      `Regenerate Image (${generationAttemptsLeft} attempts left)`
                    ) : (
                      `Generate Image with AI (${generationAttemptsLeft} left)`
                    )}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Deploy Section */}
            <motion.div
              className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex flex-col items-center">
                <button 
                  onClick={handleDeployClick}
                  disabled={!wallet?.account?.address || !name || !description || !previewImage || isDeploying}
                  className="group px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-size-200 text-white rounded-xl hover:bg-pos-100 transition-all duration-500 flex items-center gap-3 text-base sm:text-lg font-semibold shadow-lg shadow-violet-200/50 hover:shadow-xl hover:shadow-violet-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Rocket className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  Deploy NFT Collection
                </button>
                <p className="text-slate-500 mt-3 sm:mt-4 text-xs sm:text-sm text-center px-4">
                  Your NFT will be deployed to the Sui blockchain
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmationModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Confirm Deployment</h2>
              <p className="mb-6">Are you sure you want to deploy this NFT collection?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowConfirmationModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeployNFTCollection}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Listing Modal */}
      <AnimatePresence>
        {showListModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-lg font-semibold mb-4">List NFT</h2>
              <p className="mb-6">Do you want to list this NFT on our marketplace?</p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setShowListModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                >
                  No
                </button>
                <button
                  onClick={handleListNFT}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition"
                >
                  Yes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LaunchNFT;
