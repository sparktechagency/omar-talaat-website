"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ShopCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
   const router = useRouter();
   
  const images = [
    {
      id: 1,
      src: "/assets/category3.png",
      alt: "Coral Reef Aquarium",
      title: "Coral Reef",
    },
    {
      id: 2,
      src: "/assets/category2.png",
      alt: "Underwater Landscape",
      title: "Ocean Depths",
    },
    {
      id: 3,
      src: "/assets/category1.png",
      alt: "Aquatic Plants",
      title: "Sea Flora",
    },
    {
      id: 4,
      src: "/assets/category6.png",
      alt: "Marine Ecosystem",
      title: "Marine Life",
    },
    {
      id: 5,
      src: "/assets/category3.png",
      alt: "Tropical Waters",
      title: "Tropical Zone",
    },
    {
      id: 6,
      src: "/assets/category8.png",
      alt: "Aquarium Setup",
      title: "Aquascaping",
   
    },
    {
      id: 7,
      src: "/assets/category4.png",
      alt: "Blue Waters",
      title: "Blue Depths",
    },
    {
      id: 8,
      src: "/assets/category1.png",
      alt: "Water Garden",
      title: "Water Garden",
    },
    {
      id: 9,
      src: "/assets/category2.png",
      alt: "Ocean Floor",
      title: "Ocean Floor",
    },
    {
      id: 10,
      src: "/assets/category4.png",
      alt: "Reef Habitat",
      title: "Reef Habitat",
    },
    {
      id: 11,
      src: "/assets/category2.png",
      alt: "Ocean Floor",
      title: "Ocean Floor",
    },
    {
      id: 12,
      src: "/assets/category5.png",
      alt: "Reef Habitat",
      title: "Reef Habitat",
    },
  ];

  // Handle responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(4); // Mobile: 2 items
      } else if (window.innerWidth < 1024) {
        setItemsToShow(6); // Tablet: 3 items
      } else {
        setItemsToShow(8); // Desktop: 5 items
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsToShow >= images.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, images.length - itemsToShow) : prevIndex - 1
    );
  };
  const handleProductClick = (category) => {
    router.push(`/category/${category.id}`);
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + itemsToShow < images.length;

  return (
    <div className="container mx-auto  py-8 ">
      <h2 className="text-center text-3xl font-bold mb-6">All Categories</h2>
      <div className="relative">
        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          disabled={!canGoPrev}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all duration-200 ${
            canGoPrev
              ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Previous images"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={!canGoNext}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-lg transition-all duration-200 ${
            canGoNext
              ? "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 cursor-pointer"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          aria-label="Next images"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="overflow-hidden mx-8">
          <div
            className="flex transition-transform duration-300 ease-in-out gap-4"
            style={{
              transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="flex-shrink-0"
                style={{ width: `130px`, height: `170px` }}
                onClick={() => handleProductClick(image)}
              >
                <div className="group cursor-pointer mx-2">
                  <div className="aspect-square bg-black rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-200 relative">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      height={130}
                      width={130}
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    {/* Overlay for titles */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h3 className="text-white font-semibold text-sm mb-1">
                          {image.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  {/* Titles below image - always visible */}
                  <div className="mt-2 text-center">
                    {" "}
                    {/* Adjust margin */}
                    <h3 className="text-white font-medium text-sm m">
                      {image.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({
            length: Math.ceil(images.length - itemsToShow + 1),
          }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                currentIndex === index
                  ? "bg-blue-600"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCategories;
