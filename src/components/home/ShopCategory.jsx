"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ShopCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Available images to cycle through
  const availableImages = [
    "/assets/category1.png",
    "/assets/category11.png",
    "/assets/category12.png",
    "/assets/category4.png",
  ];

  // Mineral data with images
  const minerals = [
    {
      id: 1,
      name: "All Coral",
      image: availableImages[0],
      description: "Browse all available coral types",
    },
    {
      id: 2,
      name: "Zoanthids",
      image: availableImages[1],
      description: "Colorful colonial marine organisms",
    },
    {
      id: 3,
      name: "SPS",
      image: availableImages[1],
      description: "Small Polyp Stony corals with intricate structures",
    },
    {
      id: 4,
      name: "LPS",
      image: availableImages[2],
      description: "Large Polyp Stony corals with flowing tentacles",
    },
    {
      id: 5,
      name: "Acropora",
      image: availableImages[0],
      description: "Fast-growing branching SPS corals",
    },
    {
      id: 6,
      name: "Montipora",
      image: availableImages[1],
      description: "Plating and encrusting SPS corals",
    },
    {
      id: 7,
      name: "Soft Corals",
      image: availableImages[2],
      description: "Flexible corals that sway with the current",
    },
    {
      id: 8,
      name: "Anemones",
      image: availableImages[3],
      description: "Sea anemones and related species",
    },
    {
      id: 9,
      name: "WYSIWYG",
      image: availableImages[0],
      description: "What You See Is What You Get specimens",
    },
    {
      id: 10,
      name: "Zoanth",
      image: availableImages[1],
      description: "Premium zoanthid collections",
    },
    {
      id: 11,
      name: "The Vault",
      image: availableImages[2],
      description: "Rare and exclusive coral specimens",
    },
  ];

  const visibleCount = Math.min(9, minerals.length);
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
    <div className="container w-full mx-auto bg-black my-20 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Shop Categories
        </h1>
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
            className="flex transition-transform duration-500 ease-out gap-6 px-16 py-10"
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
                <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                  <Image
                    src={mineral.image}
                    alt={mineral.name}
                    height={130}
                    width={130}
                    className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                  />
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-xs truncate mt-2 text-center">
                  {mineral.name}
                </h3>
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
  );
};

export default ShopCategory;
