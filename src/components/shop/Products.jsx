"use client";
import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Lock } from "lucide-react";
import { CoinsLogo, Logo, MainLogo } from "../share/svg/Logo";
import { getUserStyles } from "../share/utils/userStyles";
import { useUser } from "../share/UserProvider";

const CoralShopGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { userType } = useUser();
  const { bg, text, border, logo, buttonBg, buttonText } =
    getUserStyles(userType);

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
      image: "/assets/category9.png",
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
      membership: "advanced",
    },
    {
      id: 8,
      name: "CS Ultra Rare Collector",
      price: 399.0,
      image: "/assets/category8.png",
      status: "Premium Only",
      available: false,
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
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
  }, [searchTerm, sortBy]);

  const ProductCard = ({ product }) => {
    const isLocked = !product.available;
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };


    const getMembershipIcon = (membership, available) => {
      if (membership === "advanced") {
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[128px] lg:h-[142px] mx-auto mb-6"
            color="#057199"
          />
        );
      } else if (membership === "premium") {
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[128px] lg:h-[142px] mx-auto mb-6"
            color="#FEF488"
          />
        );
      } else if (membership === "normal" && !available) {
        return (
          <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
            <CoinsLogo />
            <span className="text-white font-semibold text-4xl font-brush">
              235{" "}
            </span>
          </div>
        );
      }
      return null;
    };
    

    return (
      <div className="relative group cursor-pointer">
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError ? (
              <img
                src={product.image}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              /* Fallback coral pattern background */
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-800 to-yellow-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center p-4 relative z-10">
                  <div className="text-6xl mb-2">🪸</div>
                  <p className="text-sm opacity-75">Coral Preview</p>
                </div>
              </div>
            )}

            {/* Price Badge for Available Products */}
            {/* {product.available && (
              <div className="absolute top-4 left-4">
                <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">$</span>
                  </div>
                  <span className="text-yellow-400 font-semibold text-sm">
                    {product.price.toFixed(0)}
                  </span>
                </div>
              </div>
            )} */}

            {/* Membership Lock Overlay */}
            {isLocked && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">
                  {getMembershipIcon(product.membership)}
                </div>
                <h4 className="font-semibold text-lg mb-2">
                  {product.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                  Membership Required
                </h4>
                <p className="text-sm opacity-90 mb-4 leading-relaxed">
                  You have to upgrade your membership status to view this
                  product
                </p>

                {/* Price Badge for Locked Products */}
                {/* <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-black text-xs font-bold">$</span>
                  </div>
                  <span className="text-yellow-400 font-semibold text-sm">
                    {product.price.toFixed(0)}
                  </span>
                </div> */}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-white font-medium text-lg mb-1 group-hover:text-yellow-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3 italic">
              {product.status}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-white font-bold text-xl">
                AED {product.price.toFixed(2)}
              </p>
              {product.available && (
                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen  text-white ">
      <div className="mx-auto ">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Coral Shop
          </h1>
          <p className="text-gray-400">Premium corals for your reef aquarium</p>
        </div>

        {/* Header Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search corals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500/50 transition-all duration-300"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-4 py-3 text-white hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 min-w-[160px] justify-between transition-all duration-300"
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
              <div className="absolute top-full left-0 mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredAndSortedProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => console.log("Product clicked:", product.id)}
            >
              <ProductCard product={product} />
            </div>
          ))}
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
    </div>
  );
};

export default CoralShopGrid;
