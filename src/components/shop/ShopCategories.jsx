





"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";
import { getImageUrl } from "../share/imageUrl";
import Spinner from "@/app/(commonLayout)/Spinner";
import { useRouter } from "next/navigation";

// CategoryCard Component - Separated for modularity
const CategoryCard = ({ category, onClick }) => {
  const isLocked = Boolean(category?.isLock);

  return (
    <div
      className="flex flex-col items-center cursor-pointer group"
      onClick={() => onClick(category)}
    >
      <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
        <img
          src={getImageUrl(category.image)}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
        />
        {isLocked && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
            <Lock className="w-8 h-8 text-yellow-400" />
          </div>
        )}
      </div>
      <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
        {category.name}
      </h3>
    </div>
  );
};

// Main Component
const AllCategories = () => {
  // States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const router = useRouter();

  // API Query
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  
  // Memoized category data
  const categoryData = useMemo(() => categories?.data || [], [categories]);
  
  // Slider configuration
  const visibleCount = 4;
  const maxIndex = useMemo(() => 
    categoryData.length > 0 ? Math.floor(categoryData.length / visibleCount + 2) : 0, 
    [categoryData.length]
  );

  // Slider functions
  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  // Auto-play effect
  useEffect(() => {
    if (!isAutoPlay || categoryData.length === 0) return;

    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide, categoryData.length]);

  // Handle category click
  const handleCategoryClick = useCallback((category) => {
    if (category?.isLock) {
      router.push("/the-vault");
      return;
    }
    router.push(`/category/${category?._id || category?.id}`);
  }, [router]);

if (isLoading) return <Spinner />;

  // Error state
  if (isError || categoryData.length === 0) {
    return (
      <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center items-center py-20">
        <h1 className="text-4xl font-bold text-white mb-8">Shop Categories</h1>
        <div className="text-white text-lg">No categories available</div>
      </div>
    );
  }

  return (
    <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center lg:mb-12 mb-5">
        <h1 className="text-4xl font-bold text-white">Shop Categories</h1>
      </div>

      {/* Mobile Slider */}
      <div className="lg:hidden">
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Slider Track */}
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out gap-6 px-16 py-6"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(categoryData.length / visibleCount) * 100}%`,
              }}
            >
              {categoryData.map((category) => (
                <div
                  key={category._id}
                  className="flex-shrink-0 relative group cursor-pointer"
                  style={{ width: `${100 / categoryData.length}%` }}
                  onClick={() => handleCategoryClick(category)}
                >
                  <CategoryCard 
                    category={category} 
                    onClick={handleCategoryClick}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center mt-6 gap-6">
          {/* Dots */}
          <div className="flex gap-2">
            {[...Array(maxIndex + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            {isAutoPlay ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
        {categoryData.map((category) => (
          <CategoryCard 
            key={category._id}
            category={category} 
            onClick={handleCategoryClick}
          />
        ))}
      </div>
    </div>
  );
};

export default AllCategories;