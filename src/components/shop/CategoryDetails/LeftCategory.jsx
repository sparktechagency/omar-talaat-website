"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { CalenderLogo, CoinsLogo, Logo, MainLogo } from "../../share/svg/Logo";
import { useGetSingleCategoryQuery } from "@/redux/featured/category/categoryApi";
import { useParams } from "next/navigation";
import { getImageUrl } from "@/components/share/imageUrl";
import { useRouter } from "next/navigation";

const AllCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {id}= useParams();
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const router = useRouter();
  const {data: categories, isLoading } = useGetSingleCategoryQuery(id);
  // const categoryData = categories?.data || [];
 const categoryData = useMemo(() => categories?.data || [], [categories]);
const remaningCategories = useMemo(
  () => categoryData?.allCategory || [],
  [categoryData]
);

useEffect(() => {
  console.log(categoryData);
  console.log(remaningCategories);
}, [categoryData, remaningCategories]);

   

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
      isLocked: true,
    },
  ];

  const visibleCount = 4;
  const maxIndex = Math.floor(remaningCategories?.length / visibleCount + 2);

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

  const handleCategoryClick = (category) => {
    const isVault = category?.name?.toLowerCase() === "the vault" || category?.slug === "the-vault";
    if (isVault) {
      router.push("/the-vault");
      return;
    }
    router.push(`/category/${category?._id || category?.id}`);
  };

  // Removed Vault modal and password flow

  return (
    <div className="container w-full mx-auto bg-black lg:my-20 my-10 flex flex-col justify-center">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 ">
        <h2 className="text-center text-3xl font-bold mb-6">{categoryData?.name}</h2>
        <p className="text-center">
        {categoryData?.description || "Explore our wide range of corals and marine life."}
        </p>
        {/* <p className="mt-4 opacity-50 text-center">
          EXCLUSIVE = Reserved for a special list of customers who have
          completed at least 3 orders or who have spent at least AED2500 in
          total
        </p>
        <p className="mt-4 opacity-50 text-center">
          EXCLUSIVE = Reserved for a special list of customers who have
          completed at least 3 orders or who have spent at least AED2500 in
          total
        </p> */}
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
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
                width: `${(remaningCategories?.length / visibleCount) * 100}%`,
              }}
            >
              {remaningCategories?.map((mineral, index) => (
                <div
                  key={mineral.id}
                  className="flex-shrink-0 relative group cursor-pointer"
                  style={{ width: `${100 / remaningCategories?.length}%` }}
                  onClick={() => handleCategoryClick(mineral)}
                >
                  <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                    <img
                      src={mineral.image}
                      alt={mineral.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
                    />
                    {mineral.isLock && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                        <Lock className="w-8 h-8 text-yellow-400" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-white font-semibold text-xs truncate mt-2 text-center">
                    {mineral.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:mt-8 mt-0 gap-6">
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

          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm transition-all duration-300 backdrop-blur-sm border border-white/20"
          >
            {isAutoPlay ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      {/* Grid Layout for Large Devices */}
      <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
        {remaningCategories?.map((mineral) => (
          <div
            key={mineral.id}
            className="flex flex-col items-center cursor-pointer group"
            onClick={() => handleCategoryClick(mineral)}
          >
            <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
              <img
                src={getImageUrl(mineral.image)}
                alt={mineral.name}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-300 group-hover:scale-125"
              />
              {mineral.isLock && (
                <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                  <Lock className="w-8 h-8 text-yellow-400" />
                </div>
              )}
            </div>
            <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
              {mineral.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;