import React from "react";
import { Search, LayoutGrid, List } from "lucide-react";

interface ControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  categories: string[];
}

const Controls: React.FC<ControlsProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-200/50 p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col space-y-4 sm:space-y-6 md:space-y-0 md:flex-row md:gap-6 justify-between items-stretch md:items-center">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search NFTs..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all bg-white/50"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all text-sm sm:text-base font-medium ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 bg-slate-100 p-1 rounded-xl self-end md:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-600"
            }`}
          >
            <LayoutGrid className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-600"
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
