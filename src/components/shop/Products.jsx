"use client"
import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Lock } from "lucide-react";
import Link from "next/link";

const CoralShopGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Featured");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Sample product data
  const products = [
    {
      id: 1,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-1.jpg",
      status: "Cut to Order",
      available: true,
      membership: "basic",
    },
    {
      id: 2,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-2.jpg",
      status: "Cut to Order",
      available: true,
      membership: "basic",
    },
    {
      id: 3,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-3.jpg",
      status: "Cut to Order",
      available: false,
      membership: "advanced",
    },
    {
      id: 4,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-4.jpg",
      status: "Cut to Order",
      available: false,
      membership: "premium",
    },
    {
      id: 5,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-5.jpg",
      status: "Cut to Order",
      available: true,
      membership: "basic",
    },
    {
      id: 6,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-6.jpg",
      status: "Cut to Order",
      available: true,
      membership: "basic",
    },
    {
      id: 7,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-7.jpg",
      status: "Cut to Order",
      available: false,
      membership: "advanced",
    },
    {
      id: 8,
      name: "CS Purple Hornets Zoanthids",
      price: 99.5,
      image: "/coral-8.jpg",
      status: "Cut to Order",
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

    return (
      <div className="relative group cursor-pointer">
        <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          {/* Product Image */}
          <div className="relative aspect-square overflow-hidden">
            {/* Coral Pattern Background */}
            <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-800 to-yellow-600 relative">
              {/* Coral Pattern Overlay */}
              <div className="absolute inset-0 opacity-80">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `radial-gradient(circle at 25% 25%, #FFD700 2px, transparent 2px),
                                   radial-gradient(circle at 75% 25%, #FFD700 2px, transparent 2px),
                                   radial-gradient(circle at 25% 75%, #FFD700 2px, transparent 2px),
                                   radial-gradient(circle at 75% 75%, #FFD700 2px, transparent 2px),
                                   radial-gradient(circle at 50% 50%, #4338CA 3px, transparent 3px)`,
                    backgroundSize:
                      "40px 40px, 40px 40px, 40px 40px, 40px 40px, 60px 60px",
                  }}
                />
              </div>

              {/* Membership Lock Overlay */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-4">
                  <Lock className="w-8 h-8 mb-2" />
                  <h4 className="font-semibold text-sm mb-1">
                    {product.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                    Membership Required
                  </h4>
                  <p className="text-xs opacity-90">
                    You have to upgrade your membership status to view this
                    product
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="text-white font-medium text-lg mb-1 group-hover:text-yellow-400 transition-colors">
              {product.name}
            </h3>
            <p className="text-gray-400 text-sm mb-3">{product.status}</p>
            <p className="text-white font-bold text-xl">
              {product.price.toFixed(2)}
              <span className="text-sm align-top">50</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      <div className=" mx-auto">
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
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 min-w-[160px] justify-between"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Link key={product.id} href={`/shop/${product.id}`}>
            
                <ProductCard product={product} />
            
            </Link>
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
