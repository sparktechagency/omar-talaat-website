// ComingSoon.jsx
import React from "react";
import { VideoCard } from "./VideoCard";

export const ComingSoon = () => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Coming Soon</h2>
      <VideoCard
        title="Coming Soon"
        imageUrl="/assests/Rectangle7.png"
        overlayText="Coming Soon"
      />
    </div>
  );
};
