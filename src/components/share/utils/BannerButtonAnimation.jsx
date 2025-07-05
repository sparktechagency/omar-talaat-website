"use client";
import React, { useState } from "react";

const BannerButtonAnimation = ({
  onClick = () => {},
  className = "",
  size = "lg",
  text = "Shop Now",
  icon: CustomIcon = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-8 h-6 text-sm",
    md: "w-8 h-6 text-base",
    lg: "w-40 h-10 text-lg", // <-- fix button width & height here
    xl: "w-44 h-12 text-xl",
  };

  const expandedSizeClasses = {
    sm: "w-32 px-6",
    md: "w-36 px-7 py-6",
    lg: "w-40 px-8",
    xl: "w-44 px-9",
  };
  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        paddingLeft: "700px",
        paddingRight: "700px",
          }}
          
    >
      <button
        className={`
          ${sizeClasses[size]}
          ${isHovered ? expandedSizeClasses[size] : ""}
          bg-white text-primary
          rounded-full
          font-semibold
          shadow-lg
          transition-all duration-500 ease-in-out
          transform hover:scale-105
          flex items-center justify-center
          overflow-hidden
          relative
          group
          ${className}
        `}
        onClick={onClick}
      >
        {CustomIcon && (
          <CustomIcon
            className={`
              transition-all duration-500 ease-in-out
              ${isHovered ? "mr-2 scale-90" : "scale-100"}
            `}
            size={
              size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 24
            }
          />
        )}

        <span
          className={`
            transition-all duration-500 ease-in-out
            whitespace-nowrap
            ${
              isHovered
                ? "opacity-100 translate-x-0 max-w-xs"
                : "opacity-0 -translate-x-4 max-w-0"
            }
          `}
        >
          {text}
        </span>

        <div
          className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r from-white/10 to-white/20
            scale-0 group-hover:scale-100
            transition-transform duration-700 ease-out
          `}
        />
      </button>
    </div>
  );
};

export default BannerButtonAnimation;
