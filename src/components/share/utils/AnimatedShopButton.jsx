"use client";
import React, { useState, useMemo } from "react";
import { ClientOnlyIcon, createDynamicIcon } from "@/components/ui/client-only-icon";

const AnimatedShopButton = ({
  onClick = () => {},
  className = "",
  size = "lg",
  text = "Shop Now",
  icon: CustomIcon = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: "w-10 h-6 text-sm",
    md: "w-12 h-8 text-base",
    lg: "w-16 h-10 text-lg",
    xl: "w-20 h-12 text-xl",
  };

  const expandedSizeClasses = {
    sm: "w-32 px-2",
    md: "w-28 px-3",
    lg: "w-40 px-4",
    xl: "w-44 px-6",
  };

  const iconSize = size === "sm" ? 16 : size === "md" ? 18 : size === "lg" ? 20 : 24;

  // Create dynamic icon component
  const DynamicIcon = useMemo(() => {
    if (!CustomIcon) return null;
    return createDynamicIcon(CustomIcon);
  }, [CustomIcon]);

  return (
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Conditionally render the icon */}
      {DynamicIcon && (
        <ClientOnlyIcon
          fallback={
            <div 
              className={`
                transition-all duration-500 ease-in-out
                ${isHovered ? "opacity-0 scale-0" : "opacity-100 scale-100"}
              `}
              style={{
                width: iconSize,
                height: iconSize,
              }}
            />
          }
        >
          <DynamicIcon
            className={`
              transition-all duration-500 ease-in-out
              ${isHovered ? "opacity-0 scale-0" : "opacity-100 scale-100"}
            `}
            size={iconSize}
          />
        </ClientOnlyIcon>
      )}

      {/* Text */}
      <span
        className={`
          transition-all duration-500 ease-in-out
          whitespace-nowrap
          ${isHovered ? "opacity-100 translate-x-0 max-w-xs" : "opacity-0 -translate-x-4 max-w-0"}
        `}
      >
        {text}
      </span>

      {/* Ripple effect */}
      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-white/10 to-white/20
          scale-0 group-hover:scale-100
          transition-transform duration-700 ease-out
        `}
      />
    </button>
  );
};

export default AnimatedShopButton;
