"use client";
import React, { useCallback, useState, useEffect, useMemo, useRef, memo } from "react";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";
import Image from "next/image";
import { useGetUpcomingAuctionsQuery } from "@/redux/featured/auctions/auctionsApi";
import { getImageUrl } from "../share/imageUrl";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Separate Timer Component - Only this will re-render every second
const CountdownTimer = memo(({ startTime }) => {
  const [timeLeft, setTimeLeft] = useState(startTime);

  useEffect(() => {
    const updateTimer = (currentTime) => {
      if (currentTime.days === 0 && currentTime.hours === 0 && currentTime.mins === 0 && currentTime.secs === 0) {
        return currentTime;
      }

      if (currentTime.secs > 0) {
        return { ...currentTime, secs: currentTime.secs - 1 };
      } else if (currentTime.mins > 0) {
        return { ...currentTime, mins: currentTime.mins - 1, secs: 59 };
      } else if (currentTime.hours > 0) {
        return { ...currentTime, hours: currentTime.hours - 1, mins: 59, secs: 59 };
      } else if (currentTime.days > 0) {
        return { ...currentTime, days: currentTime.days - 1, hours: 23, mins: 59, secs: 59 };
      }
      return currentTime;
    };

    const interval = setInterval(() => {
      setTimeLeft(prevTime => updateTimer(prevTime));
    }, 1000);

    return () => clearInterval(interval);
  }, []); // Empty dependency array - timer runs independently

  return (
    <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl">
      <div className="text-center flex items-center px-6 justify-between">
        <div className="text-white text-xs mb-1">Starts In:</div>
        <div>
          <div className="flex justify-center gap-1 text-white font-black font-mono">
            <span className="px-2 py-1 rounded">
              {String(timeLeft.days).padStart(2, "0")}
            </span>
            <span className="text-gray-400 font-black">:</span>
            <span className="px-2 py-1 rounded">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-gray-400 font-black">:</span>
            <span className="px-2 py-1 rounded">
              {String(timeLeft.mins).padStart(2, "0")}
            </span>
            <span className="text-gray-400 font-black">:</span>
            <span className="px-2 py-1 rounded">
              {String(timeLeft.secs).padStart(2, "0")}
            </span>
          </div>
          <div className="flex justify-center gap-4 text-xs font-black text-gray-300 mt-1">
            <span>Days</span>
            <span>Hours</span>
            <span>Mins</span>
            <span>Secs</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';

// Memoized AuctionCard Component
const AuctionCard = memo(({ auction, onAuctionClick, onViewAuction, onUnlockWithCredits, unlocking }) => {
  const [imageError, setImageError] = useState(false);

  const showMembershipOverlay = !auction.available && 
    (auction.membership === "advanced" || auction.membership === "premium");

  const showCoinsOverlay = (!auction.available && auction.membership === "normal" && auction.creditNeeds) ||
    (auction.available && auction.creditNeeds > 0);

  const handleImageError = useCallback(() => setImageError(true), []);

  const getMembershipIcon = useCallback((membership) => {
    if (membership === "advanced") {
      return (
        <MainLogo
          className="w-24 h-24 lg:w-[80px] lg:h-[100px] mx-auto mb-6"
          color="#057199"
        />
      );
    } else if (membership === "premium") {
      return (
        <MainLogo
          className="w-24 h-24 lg:w-[80px] lg:h-[100px] mx-auto mb-6"
          color="#FEF488"
        />
      );
    }
    return null;
  }, []);

  const getCoinsDisplay = useCallback((auction) => {
    if (auction.creditNeeds > 0) {
      return (
        <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
          <CoinsLogo />
          <span className="text-white font-semibold text-4xl font-brush">
            {auction.creditNeeds}
          </span>
        </div>
      );
    }
    return null;
  }, []);

  const getBorderStyle = useCallback(() => {
    if (auction.membership === "premium") {
      return "border-trace border-trace-premium";
    } else if (auction.membership === "advanced") {
      return "border-trace border-trace-advanced";
    } else if (auction.membership === "normal") {
      return "border-trace border-trace-normal";
    }
    return "border border-gray-700/50 hover:border-gray-600/50";
  }, [auction.membership]);

  const handleClick = useCallback(() => {
    onAuctionClick(auction);
  }, [auction, onAuctionClick]);

  const handleViewClick = useCallback((e) => {
    e.stopPropagation();
    onViewAuction();
  }, [onViewAuction]);

  const handleUnlockClick = useCallback((e) => {
    e.stopPropagation();
    onUnlockWithCredits?.(auction);
  }, [auction, onUnlockWithCredits]);

  return (
    <motion.div
      className={`relative group auction-card ${
        auction.available && auction.creditNeeds === 0
          ? "cursor-pointer"
          : "cursor-default"
      }`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className={`backdrop-blur-sm rounded-2xl overflow-hidden ${getBorderStyle()} transition-all duration-300`}>
        <div className="relative aspect-square overflow-hidden">
          {!imageError ? (
            <Image
              src={getImageUrl(auction.image)}
              height={300}
              width={300}
              alt={auction.name}
              onError={handleImageError}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#181818] flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="text-white text-center p-4 relative z-10">
                <div className="text-6xl mb-2">🪸</div>
                <p className="text-sm opacity-75">Coral Preview</p>
              </div>
            </div>
          )}

          {auction.membership && auction.membership !== "normal" && (
            <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
              auction.membership === "premium"
                ? "bg-[#FEF488]/80 text-black"
                : "bg-[#057199]/80 text-white"
            }`}>
              {auction.membership === "premium" ? "Premium" : "Advanced"}
            </div>
          )}

          {showMembershipOverlay && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
              {getMembershipIcon(auction.membership)}
              <h4 className="font-bold text-sm">
                {auction.membership === "advanced" ? "Advanced" : "Premium"} Membership Required
              </h4>
              <p className="text-[12px] opacity-90 leading-relaxed">
                You have to upgrade your membership status to view this auction
              </p>
              {auction.creditNeeds > 0 && getCoinsDisplay(auction)}
            </div>
          )}

          {showCoinsOverlay && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
              <button
                disabled={unlocking}
                onClick={handleUnlockClick}
                className="mb-4 hover:scale-105 transition-transform"
              >
                {getCoinsDisplay(auction)}
              </button>
            </div>
          )}

          {auction.available && auction.creditNeeds === 0 && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                onClick={handleViewClick}
              >
                View Auction
              </button>
            </div>
          )}

          {/* Only the timer component re-renders every second */}
          {auction.startTime && <CountdownTimer startTime={auction.startTime} />}
        </div>
      </div>
    </motion.div>
  );
});

AuctionCard.displayName = 'AuctionCard';

const UpcomingAuctions = ({
  setActiveTab,
  onUnlockWithCredits,
  unlocking,
  currentUser,
}) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [auctionsData, setAuctionsData] = useState([]); // Removed timer from main state

  useEffect(() => {
    const urlSearchTerm = searchParams.get("searchTerm") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const { data, isLoading, isError } = useGetUpcomingAuctionsQuery(searchTerm);

  const mapAuctionData = useCallback((apiData) => {
    return (
      apiData?.map((item) => {
        let membership = "normal";
        if (item.premiumMembership) {
          membership = "premium";
        } else if (item.advanceMembership) {
          membership = "advanced";
        }

        const startTime = new Date(item.startDate);
        const now = new Date();
        const timeDiff = startTime - now;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((timeDiff / (1000 * 60)) % 60);
        const secs = Math.floor((timeDiff / 1000) % 60);

        let lockType = null;
        if (!item.isAvailable) {
          if (item.premiumMembership) lockType = "premium";
          else if (item.advanceMembership) lockType = "advanced";
          else lockType = "normal";
        } else if (item.isAvailable && item.creditNeeds > 0) {
          lockType = "credit";
        }

        return {
          id: item._id,
          name: item.name,
          currentBid: item.price,
          image: item.image,
          status: "Upcoming",
          timeLeft: `${days > 0 ? `${days}d ` : ""}${hours}h ${mins}m`,
          available: item.isAvailable,
          membership,
          type: "upcoming",
          creditNeeds: item.creditNeeds || 0,
          creditsWorth: item.creditWorth || 0,
          csAuraWorth: item.csAuraWorth || 0,
          totalBids: 0,
          highestBidder: "",
          lockType,
          startTime: { days, hours, mins, secs },
        };
      }) || []
    );
  }, []);

  // Update auction data from API - only when data changes
  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      const mappedData = mapAuctionData(data.data);
      setAuctionsData(mappedData);
    } else {
      setAuctionsData([]);
    }
  }, [data, mapAuctionData]);

  const handleAuctionClick = useCallback((auction) => {
    if (auction.available && auction.creditNeeds === 0) {
      // Handle auction selection logic here
    }
  }, []);

  const handleViewAuction = useCallback(() => {
    if (setActiveTab) {
      setActiveTab("my_auction");
    }
  }, [setActiveTab]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 rounded-2xl h-80"></div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 text-lg">Error loading auctions</p>
      </div>
    );
  }

  if (!auctionsData || auctionsData.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No auctions available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1 },
        },
      }}
    >
      {auctionsData.map((auction) => (
        <AuctionCard 
          key={auction.id} 
          auction={auction}
          onAuctionClick={handleAuctionClick}
          onViewAuction={handleViewAuction}
          onUnlockWithCredits={onUnlockWithCredits}
          unlocking={unlocking}
        />
      ))}
    </motion.div>
  );
};

export default UpcomingAuctions;