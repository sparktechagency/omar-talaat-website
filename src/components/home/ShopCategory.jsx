"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ShopCategory = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Available images to cycle through
  const availableImages = [
    "https://i.ibb.co/JR01nZWv/underwater-landscape-23-2150440386.jpg",
    "https://i.ibb.co/JWgXSZcb/vibrant-coral-reef-aquarium-ornament-stunning-underwater-scene-191095-85646.jpg",
    "https://i.ibb.co/3yVCq90L/Region-Gallery-Viewer.png",
  ];

  // Mineral data with images
  const minerals = [
    {
      id: 1,
      name: "Fluorite Crystal",
      image: availableImages[0],
      description: "Beautiful fluorescent crystal that glows under UV light",
    },
    {
      id: 2,
      name: "Willemite",
      image: availableImages[1],
      description: "Zinc silicate mineral with bright green fluorescence",
    },
    {
      id: 3,
      name: "Adamite",
      image: availableImages[2],
      description: "Zinc arsenate hydroxide with lime-green glow",
    },
    {
      id: 4,
      name: "Calcite UV",
      image: availableImages[0],
      description: "Calcium carbonate showing red fluorescence",
    },
    {
      id: 5,
      name: "Scheelite",
      image: "/assets/category1.png",
      description: "Tungsten mineral with blue-white fluorescence",
    },
    {
      id: 6,
      name: "Hyalite Opal",
      image: availableImages[2],
      description: "Clear opal variety with bright green fluorescence",
    },
    {
      id: 7,
      name: "Sodalite",
      image: availableImages[0],
      description: "Blue mineral with orange fluorescence under UV",
    },
    {
      id: 8,
      name: "Clinohedrite",
      image: availableImages[1],
      description: "Rare zinc silicate with bright fluorescent properties",
    },
    {
      id: 11,
      name: "Scheelite",
      image: "/assets/category4.png",
      description: "Tungsten mineral with blue-white fluorescence",
    },
    {
      id: 12,
      name: "Hyalite Opal",
      image: "/assets/category1.png",
      description: "Clear opal variety with bright green fluorescence",
    },
    {
      id: 13,
      name: "Sodalite",
      image: "/assets/category2.png",
      description: "Blue mineral with orange fluorescence under UV",
    },
    {
      id: 14,
      name: "Clinohedrite",
      image: "/assets/category3.png",
      description: "Rare zinc silicate with bright fluorescent properties",
    },
    {
      id: 15,
      name: "Aragonite",
      image: "/assets/category5.png",
      description: "Calcium carbonate polymorph with varied fluorescence",
    },
    {
      id: 10,
      name: "Autunite",
      image: availableImages[0],
      description: "Uranium phosphate mineral with yellow-green glow",
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
    <div className="container w-full mx-auto  bg-black my-20 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold  mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Shop Categories
        </h1>
        {/* <p className="text-gray-300 text-lg">
          Discover the hidden beauty that glows under UV light
        </p> */}
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
    w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative
    border-2 border-white/10
    transform transition-all duration-300
    group-hover:scale-105 group-hover:border-white/30
    shadow-2xl hover:shadow-cyan-500/20
  `}
                >
                  {/* Background Image */}
                  <Image
                    src={mineral.image}
                    alt={mineral.name}
                    height={130} // Set height to 130px
                    width={130} // Set width to 130px
                    className="absolute inset-0 object-cover"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2">
                    <span className="text-white font-bold text-xs text-center mb-2">
                      {mineral.name}
                    </span>
                    <span className="text-gray-200 text-xs text-center leading-tight">
                      {mineral.description}
                    </span>
                  </div>

                  {/* Bottom Label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <h3 className="text-white font-semibold text-xs truncate">
                      {mineral.name}
                    </h3>
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
      {/* <div className="text-center mt-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          {minerals[currentIndex]?.name}
        </h3>
        <p className="text-gray-400 mb-2">
          Specimen {currentIndex + 1} of {minerals.length}
        </p>
        <p className="text-gray-300 max-w-md mx-auto">
          {minerals[currentIndex]?.description}
        </p>
      </div> */}
    </div>
  );
};

export default ShopCategory;
