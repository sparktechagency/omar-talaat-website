"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Create a wrapper component that only renders on client
const ClientOnlyIcon = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
};

// Dynamic import wrapper for react-icons
const createDynamicIcon = (iconComponent) => {
  return dynamic(() => Promise.resolve(iconComponent), {
    ssr: false,
    loading: () => null,
  });
};

export { ClientOnlyIcon, createDynamicIcon }; 