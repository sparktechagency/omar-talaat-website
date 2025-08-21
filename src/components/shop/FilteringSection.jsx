"use client";
import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { useGetMyWalletQuery } from "@/redux/featured/auth/authApi";
import { getUserPlan } from "../share/utils/getUserPlan";

const FilterSection = ({ isMobile = false, onFilterChange }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300);
  const [availability, setAvailability] = useState([]);
  const [productType, setProductType] = useState([]);
  const { data: wallet } = useGetMyWalletQuery();
  const walletData = wallet?.data;
  const { plan, classes, svgColor } = getUserPlan(walletData);

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
      productType,
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
          <h3 className={`${classes.text} font-medium text-lg`}>Filters</h3>
        </div>
      )}

      {/* Product Type */}
      <div className="mb-8">
        <div
          className={`flex justify-between items-center ${classes.text} cursor-pointer mb-2`}
          onClick={() => toggleSection("productType")}
        >
          <label className={`${classes.text} font-medium text-sm`}>
            Product type
          </label>
          {openSections.productType ? (
            <ChevronUp className={`w-4 h-4 ${classes.text}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${classes.text}`} />
          )}
        </div>

        {openSections.productType && (
          <div className="space-y-4">
            <label
              className={`${classes.text} flex items-center text-sm cursor-pointer select-none mt-6`}
              onClick={() => handleCheckboxChange("productType", "cutToOrder")}
            >
             
              <span
                className={`mr-3 w-5 h-5 flex items-center justify-center border-2 ${classes.border2} rounded ${classes.bg}`}
              >
                {productType.includes("cutToOrder") && (
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

              <div
                className={`${classes.text} flex items-center justify-between w-full`}
              >
                <p>Cut to Order</p>
                <p>(4)</p>
              </div>
            </label>
          </div>
        )}
      </div>

      <hr className="opacity-10" />

      {/* Price */}
      <div className="mb-8 mt-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("price")}
        >
          <label className={`${classes.text} font-medium text-sm`}>Price</label>
          {openSections.price ? (
            <ChevronUp className={`w-4 h-4 ${classes.text}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${classes.text}`} />
          )}
        </div>
        {openSections.price && (
          <>
            <div className="flex justify-between items-center gap-2 mt-6 mb-7">
              <span className={`${classes.border} border h-12 w-24 rounded-2xl`}>

                <span
                  className={`${classes.inner} rounded-2xl flex items-center  px-3 py-3 text-xs ${
                    classes.text2 || classes.text
                  }`}
                >
                  AED {minPrice}
                </span>
              </span>
              <span className={`${classes.text} mt-2`}>-</span>
              <span className={`${classes.border} border h-12 w-24 rounded-2xl`}>

                <span
                  className={`${classes.inner} rounded-2xl flex items-center  px-3 py-3 text-xs ${
                    classes.text2 || classes.text
                  }`}
                >
                  AED {maxPrice}
                </span>
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
                style={{
                  // slider track color
                  "--track-color": classes.bg.includes("gradient") 
                    ? (classes.bg.includes("from-[#057199]") 
                      ? "linear-gradient(to right, #057199, #69CDFF)" 
                      : "linear-gradient(to right, #FEF488, #DB9D17)")
                    : "white",
                  // thumb (handle) color
                  "--thumb-color": classes.text2 ? "white" : "black",
                }}
              />
            </div>
          </>
        )}
      </div>

      <hr className="opacity-10" />

      {/* Availability */}
      <div className="mb-8 mt-6">
        <div
          className="flex justify-between items-center cursor-pointer mb-2"
          onClick={() => toggleSection("availability")}
        >
          <label className={`${classes.text} font-medium text-sm`}>
            Availability
          </label>
          {openSections.availability ? (
            <ChevronUp className={`w-4 h-4 ${classes.text}`} />
          ) : (
            <ChevronDown className={`w-4 h-4 ${classes.text}`} />
          )}
        </div>
        {openSections.availability && (
          <div className="space-y-[18px] mt-6">
            <label
              className={`flex items-center text-sm ${classes.text} cursor-pointer select-none`}
              onClick={() => handleCheckboxChange("availability", "inStock")}
            >
              <span
                className={`mr-3 w-5 h-5 flex items-center justify-center border-2 ${classes.border2} rounded ${classes.bg}`}
              >
                {availability.includes("inStock") && (
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
              <div className="flex items-center justify-between w-full">
                <p> In stock </p>
                <p>(3)</p>
              </div>
            </label>

            <label
              className={`flex items-center text-sm ${classes.text} cursor-pointer select-none`}
              onClick={() => handleCheckboxChange("availability", "outOfStock")}
            >
              <span
                className={`mr-3 w-5 h-5 flex items-center justify-center border-2 ${classes.border2} rounded ${classes.bg}`}
              >
                {availability.includes("outOfStock") && (
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
              <div className="flex items-center justify-between w-full">
                <p> Out of stock</p>
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
