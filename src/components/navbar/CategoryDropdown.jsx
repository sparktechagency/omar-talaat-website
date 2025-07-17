import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const CategoryDropdown = ({ isShopHovered, setIsShopHovered }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const availableImages = [
    "/assets/category1.png",
    "/assets/category11.png",
    "/assets/category12.png",
    "/assets/category4.png",
  ];

  const categories = [
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

  const visibleCount = 4; // Limit the visible count to 4 slides
  const maxIndex = Math.floor(categories.length / visibleCount + 2); // Adjust maxIndex based on visible slides

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || !isShopHovered) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlay, maxIndex, isShopHovered]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const handleCategoryClick = (categoryId) => {
    router.push(`/category/${categoryId}`);
    setIsShopHovered(false);
  };

  // Close dropdown only when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsShopHovered(false);
      }
    };

    if (isShopHovered) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isShopHovered]);

  if (!isShopHovered) return null;

  return (
    <div
      ref={dropdownRef}
      className="absolute  w-full bg-black/95 border-white/20 shadow-2xl z-50"
      style={{
        top: "90px",
        left: "50%",
        transform: "translateX(-50%)",
        position: "fixed",
        transition: "opacity 0.3s ease-out",
      }}
      // Add mouse enter/leave handlers to prevent closing when hovering over the dropdown
      onMouseEnter={() => setIsShopHovered(true)}
      onMouseLeave={() => {}}
    >
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
                  width: `${(categories.length / visibleCount) * 100}%`,
                }}
              >
                {categories.map((category, index) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 relative group cursor-pointer"
                    style={{ width: `${100 / categories.length}%` }}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {/* Category Card */}
                    <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                      <Image
                        src={category.image}
                        alt={category.name}
                        height={130}
                        width={130}
                        className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                      />
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

        {/* Grid Layout for Large Devices */}
        <div className="hidden lg:grid lg:grid-cols-11 gap-6 px-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => handleCategoryClick(category.id)}
            >
              {/* Category Card */}
              <div className="w-[130px] h-[130px] aspect-square rounded-xl overflow-hidden relative transform transition-all duration-300 group-hover:border-white/30 shadow-2xl">
                <Image
                  src={category.image}
                  alt={category.name}
                  height={130}
                  width={130}
                  className="absolute inset-0 object-cover transition-all duration-300 group-hover:scale-125"
                />
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
  );
};

export default CategoryDropdown;