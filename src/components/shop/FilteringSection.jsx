"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider"; // আপনার slider component

const FilterSection = ({ isMobile = false }) => {
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [availability, setAvailability] = useState([]);
  const [productType, setProductType] = useState([]);

  const [openSections, setOpenSections] = useState({
    productType: true,
    price: true,
    availability: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCheckboxChange = (type, value) => {
    if (type === "productType") {
      setProductType((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    } else if (type === "availability") {
      setAvailability((prev) =>
        prev.includes(value)
          ? prev.filter((v) => v !== value)
          : [...prev, value]
      );
    }
  };

  const CustomCheckbox = ({ checked }) => (
    <span
      className={`mr-3 w-5 h-5 flex items-center justify-center border-2 border-white rounded 
        bg-black`}
    >
      {checked && (
        <svg
          className="w-3 h-3 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </span>
  );

  return (
    <div
      className={`backdrop-blur-sm rounded-2xl p-4 border border-gray-700/50 ${
        isMobile ? "h-full" : ""
      }`}
    >
      {isMobile && (
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-white font-medium text-lg">Filters</h3>
        </div>
      )}

      {/* Product Type */}
      <div className="mb-8">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("productType")}
        >
          <label className="text-white font-medium text-sm">Product type</label>
          {openSections.productType ? (
            <ChevronUp className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white" />
          )}
        </div>
        {openSections.productType && (
          <div className="space-y-4">
            <label
              className="flex items-center text-sm text-white cursor-pointer select-none mt-6"
              onClick={() => handleCheckboxChange("productType", "cutToOrder")}
            >
              <CustomCheckbox checked={productType.includes("cutToOrder")} />
              Cut to Order (4)
            </label>
          </div>
        )}
          </div>

          <hr className="opacity-10"/>

      {/* Price */}
      <div className="mb-8 mt-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("price")}
        >
          <label className="text-white font-medium text-sm">Price</label>
          {openSections.price ? (
            <ChevronUp className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white" />
          )}
        </div>
        {openSections.price && (
          <>
            <div className="flex justify-between gap-2 mt-6 mb-7">
              <span className="px-6 py-2 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
                AED {priceRange[0]}
              </span>
              <span className="text-gray-400 mt-2">-</span>
              <span className="px-6 py-3 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
                AED {priceRange[1]}
              </span>
            </div>
            <div className="px-2">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={300}
                min={0}
                step={10}
                className="w-full"
              />
            </div>
          </>
        )}
          </div>
          <hr className="opacity-10"/>

      {/* Availability */}
      <div className="mb-8 mt-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("availability")}
        >
          <label className="text-white font-medium text-sm">Availability</label>
          {openSections.availability ? (
            <ChevronUp className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white" />
          )}
        </div>
        {openSections.availability && (
          <div className="space-y-[18px] mt-6">
            <label
              className="flex items-center text-sm text-white cursor-pointer select-none"
              onClick={() => handleCheckboxChange("availability", "inStock")}
            >
              <CustomCheckbox checked={availability.includes("inStock")} />
              In stock (3)
            </label>
            <label
              className="flex items-center text-sm text-white cursor-pointer select-none"
              onClick={() => handleCheckboxChange("availability", "outOfStock")}
            >
              <CustomCheckbox checked={availability.includes("outOfStock")} />
              Out of stock (1)
            </label>
          </div>
        )}
      </div>

      {isMobile && (
        <div className="mt-8">
          <button
            onClick={() => console.log("Filters applied")}
            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black px-4 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
