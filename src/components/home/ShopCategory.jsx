"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";
import { getImageUrl } from "../share/imageUrl";
import Spinner from "@/app/(commonLayout)/Spinner";
import { useRouter } from "next/navigation"; // ✅ Router import

const AllCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  const router = useRouter(); // ✅ Router init
  
  // Get category data from API
  const categoryData = useMemo(() => categories?.data || [], [categories]);
  
  const visibleCount = 4;
  const maxIndex = useMemo(() => 
    categoryData.length > 0 ? Math.floor(categoryData.length / visibleCount + 2) : 0, 
    [categoryData.length]
  );

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlay(prev => !prev);
  }, []);

  useEffect(() => {
    if (!isAutoPlay || categoryData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, maxIndex, categoryData.length]);

  const dotsArray = useMemo(() => 
    maxIndex > 0 ? [...Array(maxIndex + 1)] : [], 
    [maxIndex]
  );

  // Show loading state
  if (isLoading) return <Spinner />

  // Show error state
  if (isError || categoryData.length === 0) {
    return (
      <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
        <div className="text-center lg:mb-12 mb-5">
          <h1 className="text-4xl font-bold bg-clip-text">Shop Categories</h1>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-lg">No categories available</div>
        </div>
      </div>
    );
  }

  // ✅ Navigate to category details page
  const handleCategoryClick = (category) => {
    router.push(`/category/${category._id}`); 
    // যদি slug ব্যবহার করেন: router.push(`/category/${category.slug}`);
  };

  return (
    <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center lg:mb-12 mb-5">
        <h1 className="text-4xl font-bold bg-clip-text">Shop Categories</h1>
      </div>

      {/* Slider for Small/Medium Devices */}
      <div className="lg:hidden">
        <div className="relative">
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

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-out gap-6 px-16 lg:py-10 py-6"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCount)
                }%)`,
                width: `${(categoryData.length / visibleCount) * 100}%`,
              }}
            >
              {categoryData.map((category) => (
                <div
                  key={category._id}
                  className="flex-shrink-0 relative group cursor-pointer"
                  style={{ width: `${100 / categoryData.length}%` }}
                  onClick={() => handleCategoryClick(category)} // ✅ Click event
                >
                  <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                    <Image
                      src={category.image}
                      alt={category.name}
                      height={130}
                      width={130}
                      className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                    />
                  </div>
                  <h3 className="text-white font-semibold text-xs truncate mt-2 text-center">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center lg:mt-8 mt-0 gap-6">
          <div className="flex gap-2">
            {dotsArray.map((_, index) => (
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
          <button
            onClick={toggleAutoPlay}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            {isAutoPlay ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Grid Layout for Large Devices */}
      <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
        {categoryData.map((category) => (
          <div
            key={category._id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleCategoryClick(category)} // ✅ Click event
          >
            <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
              <Image
                src={getImageUrl(category.image)}
                alt={category.name}
                height={130}
                width={130}
                className="absolute h-[130px] w-[130px] inset-0 object-cover transition-all duration-300 group-hover:scale-125"
              />
            </div>
            <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
