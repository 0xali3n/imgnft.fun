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
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  viewMode,
  setViewMode,
  categories,
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl shadow-slate-200/50 p-3 sm:p-6 mb-4 sm:mb-8">
      <div className="flex flex-col space-y-3 sm:space-y-6 lg:space-y-0 lg:flex-row lg:gap-6 justify-between items-stretch lg:items-center">
        {/* Search Bar */}
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 sm:h-5 w-4 sm:w-5" />
          <input
            type="text"
            placeholder="Search NFTs..."
            className="w-full pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base rounded-xl border border-slate-200 focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition-all bg-white/50"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap transition-all text-xs sm:text-base font-medium ${
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
        <div className="flex gap-1 sm:gap-2 bg-slate-100 p-1 rounded-xl self-end lg:self-auto">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              viewMode === "grid"
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-600"
            }`}
          >
            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-1.5 sm:p-2 rounded-lg transition-all ${
              viewMode === "list"
                ? "bg-white shadow-sm text-violet-600"
                : "text-slate-600"
            }`}
          >
            <List className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controls;
