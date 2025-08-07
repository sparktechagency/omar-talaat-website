"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider"; 

const FilterSection = ({ isMobile = false, onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [availability, setAvailability] = useState([]);
  const [productType, setProductType] = useState([]);

  const [openSections, setOpenSections] = useState({
    productType: true,
    price: true,
    availability: true,
  });


  useEffect(() => {
    onFilterChange({
      minPrice,
      maxPrice,
      availability,
      productType
    });
  }, [minPrice, maxPrice, availability, productType]);

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
      className={`backdrop-blur-[5px] rounded-2xl p-4 border bg-black/30 border-gray-700/50 ${
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
              <div className="flex items-center justify-between w-full">
                <p>Cut to Order</p>
                <p>(4)</p>
              </div> 
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
            <div className="flex justify-between items-center gap-2 mt-6 mb-7">
              <span className="px-6 py-3 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
                AED {minPrice}
              </span>
              <span className="text-gray-400 mt-2">-</span>
              <span className="px-6 py-3 bg-[#181818] border border-gray-600 rounded-full text-xs text-white">
                AED {maxPrice}
              </span>
            </div>
            <div className="px-2">
              <Slider
                value={[minPrice, maxPrice]}
                onValueChange={(val) => {
                  setMinPrice(val[0]);
                  setMaxPrice(val[1]);
                }}
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
              <div className="flex items-center justify-between w-full">
                <p> In stock </p>
                <p>(3)</p>
              </div>
            </label>
            <label
              className="flex items-center text-sm text-white cursor-pointer select-none"
              onClick={() => handleCheckboxChange("availability", "outOfStock")}
            >
              <CustomCheckbox checked={availability.includes("outOfStock")} />
              <div className="flex items-center justify-between w-full">
                <p>  Out of stock</p>
                <p>(1)</p>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSection;
