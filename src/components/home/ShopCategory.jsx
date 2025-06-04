"use client"

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ShopCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Mineral data with vibrant colors matching the fluorescent theme
  const minerals = [
    {
      id: 1,
      name: "Fluorite Crystal",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-300/20 to-orange-400/20",
    },
    {
      id: 2,
      name: "Willemite",
      color: "from-red-500 to-pink-600",
      bgColor: "bg-gradient-to-br from-red-400/20 to-pink-500/20",
    },
    {
      id: 3,
      name: "Adamite",
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-300/20 to-emerald-400/20",
    },
    {
      id: 4,
      name: "Calcite UV",
      color: "from-red-600 to-orange-500",
      bgColor: "bg-gradient-to-br from-red-500/20 to-orange-400/20",
    },
    {
      id: 5,
      name: "Scheelite",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-purple-400/20 to-indigo-500/20",
    },
    {
      id: 6,
      name: "Hyalite Opal",
      color: "from-yellow-300 to-green-400",
      bgColor: "bg-gradient-to-br from-yellow-200/20 to-green-300/20",
    },
    {
      id: 7,
      name: "Sodalite",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-400/20 to-cyan-300/20",
    },
    {
      id: 8,
      name: "Clinohedrite",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-gradient-to-br from-orange-400/20 to-red-400/20",
    },
    {
      id: 9,
      name: "Aragonite",
      color: "from-gray-300 to-gray-500",
      bgColor: "bg-gradient-to-br from-gray-200/20 to-gray-400/20",
    },
    {
      id: 10,
      name: "Autunite",
      color: "from-green-400 to-blue-500",
      bgColor: "bg-gradient-to-br from-green-300/20 to-blue-400/20",
    },
  ];

  const visibleCount = Math.min(6, minerals.length);
  const maxIndex = Math.max(0, minerals.length - visibleCount);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  return (
    <div className="w-full  mx-auto p-8 bg-black min-h-screen flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Fluorescent Mineral Gallery
        </h1>
        <p className="text-gray-300 text-lg">
          Discover the hidden beauty that glows under UV light
        </p>
      </div>

      {/* Main Slider Container */}
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
            className="flex transition-transform duration-500 ease-out gap-6 px-16"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              width: `${(minerals.length / visibleCount) * 100}%`,
            }}
          >
            {minerals.map((mineral, index) => (
              <div
                key={mineral.id}
                className="flex-shrink-0 relative group cursor-pointer"
                style={{ width: `${100 / minerals.length}%` }}
                onClick={() => goToSlide(index)}
              >
                {/* Mineral Card */}
                <div
                  className={`
                  aspect-square rounded-xl overflow-hidden relative
                  ${mineral.bgColor}
                  border-2 border-white/10
                  transform transition-all duration-300
                  group-hover:scale-105 group-hover:border-white/30
                  shadow-2xl hover:shadow-cyan-500/20
                `}
                >
                  {/* Glowing Effect */}
                  <div
                    className={`
                    absolute inset-0 opacity-80
                    bg-gradient-to-br ${mineral.color}
                    rounded-xl
                  `}
                  />

                  {/* Mineral Pattern/Texture */}
                  {/* <div className="absolute inset-0 bg-black/20">
                    <div className="w-full h-full relative overflow-hidden">
                    
                      <div className="absolute inset-0 opacity-30">
                        {[...Array(12)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute bg-white rounded-full animate-pulse"
                            style={{
                              width: `${Math.random() * 20 + 10}px`,
                              height: `${Math.random() * 20 + 10}px`,
                              top: `${Math.random() * 80 + 10}%`,
                              left: `${Math.random() * 80 + 10}%`,
                              animationDelay: `${Math.random() * 2}s`,
                              animationDuration: `${Math.random() * 3 + 2}s`,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div> */}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm text-center px-2">
                      {mineral.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center mt-8 gap-6">
        {/* Dots Indicator */}
        <div className="flex gap-2">
          {[...Array(maxIndex + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${
                  currentIndex === index
                    ? "bg-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "bg-white/30 hover:bg-white/50"
                }
              `}
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

      {/* Current Mineral Info */}
      <div className="text-center mt-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          {minerals[currentIndex]?.name}
        </h3>
        <p className="text-gray-400">
          Specimen {currentIndex + 1} of {minerals.length}
        </p>
      </div>
    </div>
  );
};

export default ShopCategory;
