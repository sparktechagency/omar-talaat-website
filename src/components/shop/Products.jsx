"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Search, Filter, ChevronDown, Lock, X, Menu } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "../share/Container";

const CoralShopGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const rounter = useRouter();
  

  // Simple filters
  const [priceRange, setPriceRange] = useState([0, 400]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Close mobile filter drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMobileFilterOpen &&
        !event.target.closest(".mobile-filter-drawer") &&
        !event.target.closest(".filter-toggle-btn")
      ) {
        setIsMobileFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileFilterOpen]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileFilterOpen]);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/assets/category1.png",
      status: "Cut to Order",
      available: true,
      membership: "normal",
    },
    {
      id: 2,
      name: "CS Blue Matrix Zoanthids",
      price: 149.99,
      image: "/assets/category8.png",
      status: "In Stock",
      available: false,
      coins: 235,
      membership: "normal",
    },
    {
      id: 3,
      name: "CS Rainbow Incinerator",
      price: 199.5,
      image: "/assets/category3.png",
      status: "Cut to Order",
      available: false,
      membership: "advanced",
    },
    {
      id: 4,
      name: "CS Fire and Ice",
      price: 299.0,
      image: "/assets/category4.png",
      status: "Limited Edition",
      available: false,
      membership: "premium",
    },
    {
      id: 5,
      name: "CS Green Bay Packers",
      price: 89.99,
      image: "/assets/category4.png",
      status: "Cut to Order",
      available: true,
      membership: "normal",
    },
    {
      id: 6,
      name: "CS Sunny Delight",
      price: 129.5,
      image: "/assets/category9.png",
      status: "In Stock",
      coins: 235,
      available: false,
      membership: "normal",
    },
    {
      id: 7,
      name: "CS Dragon Eyes",
      price: 249.99,
      image: "/assets/category7.png",
      status: "Cut to Order",
      available: false,
      coins: 235,
      membership: "advanced",
    },
    {
      id: 8,
      name: "CS Ultra Rare Collector",
      price: 399.0,
      image: "/assets/category8.png",
      status: "Premium Only",
      available: false,
      coins: 235,
      membership: "premium",
    },
  ];

  const sortOptions = [
    "Featured",
    "Price: Low to High",
    "Price: High to Low",
    "Name A-Z",
    "Name Z-A",
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];

      let matchesAvailability = true;
      if (availabilityFilter === "available") {
        matchesAvailability = product.available;
      } else if (availabilityFilter === "out-of-stock") {
        matchesAvailability = !product.available;
      } else if (availabilityFilter === "cut-to-order") {
        matchesAvailability = product.status === "Cut to Order";
      }

      return matchesSearch && matchesPrice && matchesAvailability;
    });

    switch (sortBy) {
      case "Price: Low to High":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Price: High to Low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "Name A-Z":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name Z-A":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, sortBy, priceRange, availabilityFilter]);

  const handleProductClick = (product) => {
    if (product.available) {
      rounter.push(`/shop/${product.id}`);
    }
  };

  const FilterSection = ({ isMobile = false }) => (
    <div
      className={`bg-[#181818] backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 ${
        isMobile ? "h-full" : ""
      }`}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-medium text-lg">Filters</h3>
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      )}

      {!isMobile && <h3 className="text-white font-medium mb-4">Filters</h3>}

      {/* Price Range */}
      <div className="mb-6">
        <label className="text-white text-sm font-medium mb-4 block">
          Price Range
        </label>
        <div className="flex gap-2 mb-4">
          <span className="px-3 py-1 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
            AED {priceRange[0]}
          </span>
          <span className="text-gray-400">-</span>
          <span className="px-3 py-1 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
            AED {priceRange[1]}
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={400}
            min={0}
            step={10}
            className="w-full"
          />
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <label className="text-white text-sm font-medium mb-2 block">
          Availability
        </label>
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="w-full bg-[#181818] border border-gray-600 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value="all">All Products</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
          <option value="cut-to-order">Cut to Order</option>
        </select>
      </div>

      {isMobile && (
        <div className="mt-8">
          <button
            onClick={() => setIsMobileFilterOpen(false)}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );

  const ProductCard = ({ product }) => {
    const showMembershipOverlay =
      !product.available &&
      (product.membership === "advanced" || product.membership === "premium");
    const showCoinsOverlay =
      !product.available && product.membership === "normal" && product.coins;
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const getMembershipIcon = (membership) => {
      if (membership === "advanced") {
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[100px] lg:h-[122px] mx-auto mb-6"
            color="#057199"
          />
        );
      } else if (membership === "premium") {
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[100px] lg:h-[122px] mx-auto mb-6"
            color="#FEF488"
          />
        );
      }
      return null;
    };

    const getCoinsDisplay = (product) => {
      if (showCoinsOverlay) {
        return (
          <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
            <CoinsLogo />
            <span className="text-white font-semibold text-4xl font-brush">
              {product.coins}
            </span>
          </div>
        );
      }
      return null;
    };

    return (
      <div
        className={`relative group ${
          product.available ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => handleProductClick(product)}
      >
        <div className="bg-[#181818] backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError ? (
              <Image
                src={product.image}
                alt={product.name}
                height={300}
                width={300}
                loading="lazy"
                quality={80}
                onClick={() => handleProductClick(product)}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              /* Fallback coral pattern background */
              <div className="w-full h-full bg-[#181818] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center p-4 relative z-10">
                  <div className="text-6xl mb-2">🪸</div>
                  <p className="text-sm opacity-75">Coral Preview</p>
                </div>
              </div>
            )}

            {/* Membership Lock Overlay - For advanced/premium products */}
            {showMembershipOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-">
                  {getMembershipIcon(product.membership)}
                </div>
                <h4 className="font-bold  mb-2">
                  {product.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                  Membership Required
                </h4>
                <p className="text-[12px] opacity-90 mb-4 leading-relaxed">
                  You have to upgrade your membership status to view this
                  product
                </p>
                {product.coins ? (
                  <div>
                    <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
                      <CoinsLogo />
                      <span className="text-white font-semibold text-4xl font-brush">
                        {product.coins}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>
            )}

            {/* Coins Overlay - For normal membership products with coins */}
            {showCoinsOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">{getCoinsDisplay(product)}</div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-white font-medium text-lg mb-1  transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3 italic">
              {product.status}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-white font-bold text-xl">
                AED {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container className=" min-h-screen text-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Coral Shop
          </h1>
          <p className="text-gray-400">Premium corals for your reef aquarium</p>
        </div>

        {/* Header Controls */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Bar */}
          {/* <div className="relative flex-1 max-w-md mx-auto sm:mx-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search corals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
            />
          </div> */}

          {/* Mobile Controls - Filter Left, Sort Right */}
          <div className="flex justify-between gap-4 sm:hidden">
            {/* Mobile Filter Toggle Button - Left */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="filter-toggle-btn flex items-center justify-center space-x-2 bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 flex-1"
            >
              <Menu className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>

            {/* Sort Dropdown - Right */}
            <div className="relative flex-1">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center space-x-2 bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 justify-between transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Sort</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full right-0 mt-1 w-full bg-[#181818] border border-gray-700 rounded-lg shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option
                          ? "bg-gray-700 text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Controls */}
          <div className="hidden sm:flex gap-4">
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-[#181818]/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 min-w-[160px] justify-between transition-all duration-300"
              >
                <span className="flex items-center space-x-2">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Sort by</span>
                  <span className="font-medium">{sortBy}</span>
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-[#181818] border border-gray-700 rounded-lg shadow-lg z-50">
                  {sortOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option
                          ? "bg-gray-700 text-yellow-400"
                          : "text-white"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        {/* Mobile Filter Overlay */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] lg:hidden">
            <div
              className={`mobile-filter-drawer fixed left-0 top-0 h-full w-[80%] bg-gray-900 border-r border-gray-700 overflow-y-auto transform transition-transform duration-[300ms] ease-in-out ${
                isMobileFilterOpen ? "translate-x-0" : "translate-x-[-100%]"
              }`}
            >
              <div className="p-4 h-full">
                <FilterSection isMobile={true} />
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex gap-4">
          {/* Desktop Filtering Sidebar */}
          <div className="hidden lg:block lg:w-1/6">
            <FilterSection />
          </div>

          {/* Products */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* No Results */}
        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No products found matching your search.
            </p>
          </div>
        )}
      </div>
    </Container>
  );
};

export default CoralShopGrid;
