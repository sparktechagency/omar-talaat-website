"use client";
import React from "react";
import { Filter, ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { FilterIcon } from "../share/svg/Logo";
import { useGetMyWalletQuery } from "@/redux/featured/auth/authApi";
import { getUserPlan } from "../share/utils/getUserPlan";

const ProductControls = ({
  sortBy,
  setSortBy,
  isDropdownOpen,
  setIsDropdownOpen,
  sortOptions,
  isMobileFilterOpen,
  setIsMobileFilterOpen,
  isFilterVisible,
  toggleFilterVisibility,
  isAnimating,
}) => {
  const { data: wallet } = useGetMyWalletQuery();
  const walletData = wallet?.data;
  const { plan, classes, svgColor } = getUserPlan(walletData);
  return (
    <div className="flex flex-col gap-4 mb-8">
      {/* Mobile Controls - Filter Left, Sort Right */}
      <div className="flex justify-between gap-4 sm:hidden">
        {/* Mobile Filter Toggle Button - Left */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="filter-toggle-btn flex items-center justify-center space-x-2 bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 flex-1"
        >
          <Menu className="w-4 h-4" />
          <span className="text-sm font-medium">Filters</span>
        </button>

        {/* Sort Dropdown - Right */}
        <div className="relative flex-1">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full flex items-center space-x-2 bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 justify-between transition-all duration-300"
          >
            <span className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Sort</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-1 w-full bg-[#181818] border border-gray-700 rounded-lg shadow-lg z-50">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option
                      ? "bg-gray-700 text-yellow-400"
                      : "text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop Controls */}
      <div className="border-y border-gray-700/50 flex items-center gap-10 py-3 hidden sm:flex">
        <motion.button
          className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors duration-500 bg-transparent border-none focus:outline-none"
          onClick={toggleFilterVisibility}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isAnimating}
        >
          <p className={`${classes.text} font-bold`}>Filter</p>
          <motion.div
            animate={{ rotate: isFilterVisible ? 0 : 180 }}
            transition={{ duration: 0.9 }}
          >
            <FilterIcon color={svgColor}/>
          </motion.div>
        </motion.button>

        <div className="hidden sm:flex gap-4">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 border-none px-4 py-3 text-white focus:outline-none focus:border-none min-w-[160px] justify-between transition-all duration-300"
            >
              <span className="flex items-center border-none space-x-2">
                {/* <Filter  className={`${classes.text} `}/> */}
                <span className={`${classes.text} text-sm`}>Sort by</span>
                <span className={`${classes.text} text-sm`}>{sortBy}</span>
              </span>
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-full bg-[#181818] shadow-lg z-50">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                      sortBy === option
                        ? "bg-gray-700 text-yellow-400"
                        : "text-white"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductControls; 