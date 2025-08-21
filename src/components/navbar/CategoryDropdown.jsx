import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import Image from "next/image";
import { useForAccessRequestMutation, useGetCategoriesQuery } from "@/redux/featured/category/categoryApi";
import { getImageUrl } from "../share/imageUrl";
import Spinner from "@/app/(commonLayout)/Spinner";

const CategoryDropdown = ({ isShopHovered, setIsShopHovered }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [forAccessRequest, { isLoading: isForAccessLoading }] = useForAccessRequestMutation();
  
  // Get categories from API
  const { data: categories, isLoading, isError } = useGetCategoriesQuery();
  
  // Get category data from API
  const categoryData = useMemo(() => categories?.data || [], [categories]);

  const visibleCount = 4; // Limit the visible count to 4 slides
  const maxIndex = useMemo(() => 
    categoryData.length > 0 ? Math.floor(categoryData.length / visibleCount + 2) : 0, 
    [categoryData.length]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || !isShopHovered || categoryData.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, maxIndex, isShopHovered, categoryData.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  const handleCategoryClick = (category) => {
    if (category?.isLock) {
      router.push(`/the-vault`);
      setIsShopHovered(false);
      return;
    }
    router.push(`/category/${category._id}`);
    setIsShopHovered(false);
  };

  // Close dropdown when clicking outside the dropdown area (modal-like behavior)
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if clicked element is the dropdown content
      const dropdownContent = dropdownRef.current?.querySelector('.dropdown-content');
      const shopLink = document.querySelector('.shop-link');
      
      // Don't close if clicking on shop link or inside dropdown content
      if (shopLink?.contains(event.target) || dropdownContent?.contains(event.target)) {
        return;
      }
      
      // Close dropdown if clicking anywhere else (including overlay)
      setIsShopHovered(false);
    };

    if (isShopHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopHovered, setIsShopHovered]);

  const dotsArray = useMemo(() => 
    maxIndex > 0 ? [...Array(maxIndex + 1)] : [], 
    [maxIndex]
  );

  if (!isShopHovered) return null;

  // Show loading state
  if (isLoading) {
    return (
      <div
        ref={dropdownRef}
        className="fixed inset-0 z-50"
        style={{ top: '90px' }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-transparent cursor-pointer"
          onClick={() => setIsShopHovered(false)}
        />
        
        {/* Loading Content */}
        <div className="relative w-full bg-black shadow-2xl dropdown-content">
          <div className="container mx-auto px-4 lg:py-8 py-6">
            <div className="flex justify-center items-center">
              <Spinner />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error or no data state
  if (isError || categoryData.length === 0) {
    return (
      <div
        ref={dropdownRef}
        className="fixed inset-0 z-50"
        style={{ top: '90px' }}
      >
        {/* Overlay */}
        <div 
          className="absolute inset-0 bg-transparent cursor-pointer"
          onClick={() => setIsShopHovered(false)}
        />
        
        {/* Error Content */}
        <div className="relative w-full bg-black shadow-2xl dropdown-content">
          <div className="container mx-auto px-4 lg:py-8 py-6">
            <div className="flex justify-center items-center">
              <div className="text-white text-lg">No categories available</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="fixed inset-0 z-50"
      style={{ top: '90px' }}
    >
      {/* Overlay that closes dropdown when clicked */}
      <div 
        className="absolute inset-0 bg-transparent cursor-pointer"
        onClick={() => setIsShopHovered(false)}
      />
      
      {/* Dropdown Content */}
      <div className="relative w-full bg-black shadow-2xl dropdown-content">
        <div className="container mx-auto px-4 lg:py-8">
          {/* Slider for Small/Medium Devices */}
          <div className="lg:hidden">
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
                      onClick={() => handleCategoryClick(category)}
                    >
                      {/* Category Card */}
                      <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                        <Image
                          src={getImageUrl(category.image)}
                          alt={category.name}
                          height={130}
                          width={130}
                          className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                        />
                        {category?.isLock && (
                          <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                            <Lock className="w-8 h-8 text-yellow-400" />
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-white font-semibold text-xs truncate mt-2 text-center">
                        {category.name}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center lg:mt-8 mt-4 gap-6">
              {/* Dots Indicator */}
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

              {/* Auto-play Toggle */}
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
            {categoryData.map((category) => (
              <div
                key={category._id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleCategoryClick(category)}
              >
                {/* Category Card */}
                <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                  <Image
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    height={130}
                    width={130}
                    className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                  />
                  {category?.isLock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                      <Lock className="w-8 h-8 text-yellow-400" />
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-sm truncate mt-2 text-center">
                  {category.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;