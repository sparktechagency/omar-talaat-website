import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const CategoryDropdown = ({ isShopHovered, setIsShopHovered }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);

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
      className="absolute w-full bg-black/95  border-white/20 shadow-2xl z-50"
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
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-12 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group cursor-pointer    rounded-lg p-4  transition-all duration-300 transform hover:scale-105"
            >
              <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-125  duration-300"
                />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1 text-center">
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
