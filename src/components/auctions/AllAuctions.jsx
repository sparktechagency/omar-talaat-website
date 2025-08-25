"use client";
import React, { useCallback, useState, useEffect, useMemo } from "react";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";
import Image from "next/image";
import { useGetAllAuctionsQuery } from "@/redux/featured/auctions/auctionsApi";
import { getImageUrl } from "../share/imageUrl";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { cardVariants, imageVariants } from "@/components/share/utils/motionVariants";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AllAuctions = ({
  setActiveTab,
  onUnlockWithCredits,
  unlocking,
  currentUser,
}) => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  
  const gridRef = useRef(null);
  const isGridInView = useInView(gridRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const urlSearchTerm = searchParams.get("searchTerm") || "";
    setSearchTerm(urlSearchTerm);
  }, [searchParams]);

  const { data, isLoading, isError } = useGetAllAuctionsQuery(searchTerm);

  const mapAuctionData = (apiData) => {
    return (
      apiData?.map((item) => {
        let membership = "normal";
        if (item.premiumMembership) {
          membership = "premium";
        } else if (item.advanceMembership) {
          membership = "advanced";
        }

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
          status: item.status === "active" ? "Live Auction" : item.status === "upcoming" ? "Upcoming" : "Ended",
          available: item.isAvailable,
          membership,
          type: item.status === "active" ? "live" : "upcoming",
          creditNeeds: item.creditNeeds || 0,
          creditsWorth: item.creditWorth || 0,
          csAuraWorth: item.csAuraWorth || 0,
          totalBids: 0,
          highestBidder: "",
          lockType,
          startDate: item.startDate,
          endDate: item.endDate,
          originalStatus: item.status,
        };
      }) || []
    );
  };

  const auctions = mapAuctionData(data?.data);
  const [selectedAuction, setSelectedAuction] = useState(null);

  const handleAuctionClick = (auction) => {
    if (auction.available && auction.creditNeeds === 0) {
      setSelectedAuction(auction);
    }
  };

  const handleViewAuction = () => {
    if (setActiveTab) {
      setActiveTab("my_auction");
    }
  };

  // Separate Timer Component to avoid full re-render
  const TimerDisplay = ({ auction }) => {
    const [timeData, setTimeData] = useState(null);
    
    useEffect(() => {
      const updateTimer = () => {
        const startTime = new Date(auction.startDate);
        const endTime = new Date(auction.endDate);
        const now = new Date();
        
        const startTimePassed = now >= startTime;
        
        let targetTime, timeLabel, currentPhase;
        
        if (!startTimePassed) {
          targetTime = startTime;
          timeLabel = "Starts In:";
          currentPhase = "upcoming";
        } else if (now < endTime) {
          targetTime = endTime;
          timeLabel = "Ends In:";
          currentPhase = "active";
        } else {
          currentPhase = "ended";
        }
        
        if (currentPhase === "ended") {
          setTimeData({ 
            isEnded: true, 
            message: "Auction Ended!",
            currentPhase 
          });
          return;
        }
        
        const timeDiff = targetTime - now;
        const isTimeUp = timeDiff <= 0;
        
        if (isTimeUp) {
          if (currentPhase === "upcoming") {
            setTimeData({ 
              isTransition: true, 
              message: "Auction Started!",
              currentPhase 
            });
          } else {
            setTimeData({ 
              isEnded: true, 
              message: "Auction Ended!",
              currentPhase 
            });
          }
          return;
        }
        
        const days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
        const hours = Math.max(0, Math.floor((timeDiff / (1000 * 60 * 60)) % 24));
        const mins = Math.max(0, Math.floor((timeDiff / (1000 * 60)) % 60));
        const secs = Math.max(0, Math.floor((timeDiff / 1000) % 60));
        
        setTimeData({
          days,
          hours,
          mins,
          secs,
          timeLabel,
          currentPhase,
          isEnded: false,
          isTransition: false
        });
      };
      
      updateTimer();
      const interval = setInterval(updateTimer, 1000);
      return () => clearInterval(interval);
    }, [auction.startDate, auction.endDate]);
    
    if (!timeData) return null;
    
    if (timeData.isEnded || timeData.isTransition) {
      return (
        <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl">
          <div className="text-center">
            <div className="text-white text-sm font-bold">{timeData.message}</div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl">
        <div className="text-center flex items-center px-6 justify-between">
          <div className="text-white text-xs mb-1">{timeData.timeLabel}</div>
          <div>
            <div className="flex justify-center gap-1 text-white font-black font-mono">
              <span className="px-2 py-1 rounded">
                {String(timeData.days).padStart(2, "0")}
              </span>
              <span className="text-gray-400 font-black">:</span>
              <span className="px-2 py-1 rounded">
                {String(timeData.hours).padStart(2, "0")}
              </span>
              <span className="text-gray-400 font-black">:</span>
              <span className="px-2 py-1 rounded">
                {String(timeData.mins).padStart(2, "0")}
              </span>
              <span className="text-gray-400 font-black">:</span>
              <span className="px-2 py-1 rounded">
                {String(timeData.secs).padStart(2, "0")}
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
  };

  const AuctionCard = ({ auction, index, isGridInView }) => {
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const showMembershipOverlay =
      !auction.available &&
      (auction.membership === "advanced" || auction.membership === "premium");

    const showCoinsOverlay =
      (!auction.available &&
        auction.membership === "normal" &&
        auction.creditNeeds) ||
      (auction.available && auction.creditNeeds > 0);

    const handleImageError = () => setImageError(true);

    const getMembershipIcon = (membership) => {
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
    };

    const getCoinsDisplay = (auction) => {
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
    };

    // Get dynamic border-trace classes based on membership
    const getBorderTraceClasses = (membership) => {
      return `border-trace border-trace-${membership}`;
    };

    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate={isGridInView ? "visible" : "hidden"}
        custom={index}
        whileHover={{ y: -5, transition: { duration: 0.3, ease: "easeOut" } }}
        className={`relative group auction-card ${
          auction.available && auction.creditNeeds === 0
            ? "cursor-pointer"
            : "cursor-default"
        }`}
        onClick={() => handleAuctionClick(auction)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] ${getBorderTraceClasses(auction.membership)}`}
        >
          <p className="text-white text-sm mt-2 ml-2 text-start">
            {auction.name}
          </p>
          <div className="relative aspect-square overflow-hidden">
            {!imageError ? (
              <motion.div
                variants={imageVariants}
                whileHover="hover"
              >
                <Image
                  src={getImageUrl(auction.image)}
                  height={300}
                  width={300}
                  alt={auction.name}
                  onError={handleImageError}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                variants={imageVariants}
                whileHover="hover"
                className="w-full h-full bg-[#181818] flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center p-4 relative z-10">
                  <div className="text-6xl mb-2">🪸</div>
                  <p className="text-sm opacity-75">Coral Preview</p>
                </div>
              </motion.div>
            )}

            {auction.membership && auction.membership !== "normal" && (
              <div
                className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                  auction.membership === "premium"
                    ? "bg-[#FEF488]/80 text-black"
                    : "bg-[#057199]/80 text-white"
                }`}
              >
                {auction.membership === "premium" ? "Premium" : "Advanced"}
              </div>
            )}

            {showMembershipOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                {getMembershipIcon(auction.membership)}
                <h4 className="font-bold text-sm">
                  {auction.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                  Membership Required
                </h4>
                <p className="text-[12px] opacity-90 leading-relaxed">
                  You have to upgrade your membership status to view this
                  auction
                </p>
                {auction.creditNeeds > 0 && getCoinsDisplay(auction)}
              </div>
            )}

            {showCoinsOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <button
                  disabled={!auction.available || unlocking}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (auction.available) {
                      onUnlockWithCredits?.(auction);
                    }
                  }}
                  className={`mb-4 hover:scale-105 transition-transform 
                    ${!auction.available ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {getCoinsDisplay(auction)}
                </button>
              </div>
            )}

            {auction.available && auction.creditNeeds === 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewAuction();
                  }}
                >
                  View Auction
                </button>
              </div>
            )}

            <TimerDisplay auction={auction} />
          </div>
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-800 rounded-2xl h-80 border-trace border-trace-normal"></div>
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

  if (!auctions || auctions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">No auctions available</p>
      </div>
    );
  }

  return (
    <motion.div
      ref={gridRef}
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
      {auctions.map((auction, index) => (
        <AuctionCard 
          key={auction.id} 
          auction={auction} 
          index={index}
          isGridInView={isGridInView}
        />
      ))}
    </motion.div>
  );
};

export default AllAuctions;