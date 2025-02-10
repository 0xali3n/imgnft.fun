import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <section className="bg-white/70 backdrop-blur-lg py-12 sm:py-16 border-b border-slate-100 relative z-10">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 px-4">
            Discover Unique{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-transparent bg-clip-text">
              AI-Generated NFTs
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto px-4">
            Explore the finest AI-powered digital collectibles on the Sui
            blockchain
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
