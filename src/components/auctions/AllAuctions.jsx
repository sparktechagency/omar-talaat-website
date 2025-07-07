"use client";
import React, { useState } from "react";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";
import Image from "next/image";

const AllAuctions = ({ setActiveTab }) => {
  const auctions = [
    {
      id: 1,
      name: "PLUM TREE ACRO CHUNK",
      currentBid: 250,
      image: "/assets/category1.png",
      status: "Live Auction",
      timeLeft: "2h 30m",
      available: true,
      membership: "normal",
      type: "live",
      creditsUsed: 235,
      creditsWorth: 1000,
      csAuraWorth: 92,
      totalBids: 3,
      highestBidder: "Sabbir Ahmed",
    },
    {
      id: 2,
      name: "CS Blue Matrix Zoanthids",
      currentBid: 149.99,
      image: "/assets/category1.png",
      status: "Upcoming",
      timeLeft: "Starts in 1 day",
      available: false,
      coins: 235,
      membership: "normal",
      type: "upcoming",
    },
    {
      id: 3,
      name: "CS Rainbow Incinerator",
      currentBid: 199.5,
      image: "/assets/category11.png",
      status: "My Bid",
      timeLeft: "3h 45m",
      available: false,
      membership: "advanced",
      type: "my_auction",
      coins: 235,
      EndTime: {
        days: 0,
        hours: 3,
        mins: 45,
        secs: 20,
      },
    },
    {
      id: 4,
      name: "CS Fire and Ice",
      currentBid: 299.0,
      image: "/assets/category4.png",
      status: "Premium Auction",
      timeLeft: "1h 15m",
      available: false,
      membership: "premium",
      type: "live",
      coins: 235,
      EndTime: {
        days: 0,
        hours: 1,
        mins: 15,
        secs: 30,
      },
    },
  ];

  const [selectedAuction, setSelectedAuction] = useState(null);

  const handleAuctionClick = (auction) => {
    if (auction.available) {
      setSelectedAuction(auction);
    }
  };

  const handleViewAuction = () => {
    if (setActiveTab) {
      setActiveTab("my_auction");
    }
  };

  const AuctionCard = ({ auction }) => {
    const showMembershipOverlay =
      !auction.available &&
      (auction.membership === "advanced" || auction.membership === "premium");
    const showCoinsOverlay =
      !auction.available && auction.membership === "normal" && auction.coins;
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    const getMembershipIcon = (membership) => {
      if (membership === "advanced") {
        return <MainLogo className="w-16 h-16 mx-auto mb-4" color="#69CDFF" />;
      } else if (membership === "premium") {
        return <MainLogo className="w-12 h-12 mx-auto mb-4" color="#DB9D17" />;
      }
      return null;
    };

    const getCoinsDisplay = (auction) => {
      if (showCoinsOverlay) {
        return (
          <div className="flex items-center gap-2 bg-amber-600/20 border border-amber-400 py-2 px-8 rounded-full">
            <CoinsLogo className="w-6 h-6" />
            <span className="text-white font-bold text-lg">
              {auction.coins}
            </span>
          </div>
        );
      }
      return null;
    };

    const getTimerDisplay = (auction) => {
      if (auction.startTime) {
        return (
          <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl">
            <div className="text-center flex items-center px-6 justify-between">
              <div className="text-white text-xs mb-1">Starts In:</div>
              <div>
                <div className="flex justify-center gap-1 text-white text-sm font-mono">
                  <span className=" px-2 py-1 rounded">
                    {String(auction.startTime.days).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.startTime.hours).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.startTime.mins).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.startTime.secs).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex justify-center gap-4 text-xs text-gray-300 mt-1">
                  <span>Days</span>
                  <span>Hours</span>
                  <span>Mins</span>
                  <span>Secs</span>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (auction.EndTime) {
        return (
          <div className="absolute bottom-0 left-0 right-0 p-3 rounded-b-2xl">
            <div className="text-center flex items-center px-6 justify-between">
              <div className="text-white text-xs mb-1 ">Ends In:</div>
              <div>
                <div className="flex justify-center gap-1 text-white font-black font-mono">
                  <span className=" px-2 py-1 rounded">
                    {String(auction.EndTime.days).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400 font-black">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.EndTime.hours).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400 font-black">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.EndTime.mins).padStart(2, "0")}
                  </span>
                  <span className="text-gray-400 font-black">:</span>
                  <span className=" px-2 py-1 rounded">
                    {String(auction.EndTime.secs).padStart(2, "0")}
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
      }
      return null;
    };

    // Define border style based on membership
    const getBorderStyle = () => {
      if (auction.membership === "premium") {
        return "border-2 border-[#DB9D17]"; // Updated premium color
      } else if (auction.membership === "advanced") {
        return "border-2 border-[#69CDFF]"; // Updated advanced color
      }
      return "border border-gray-700/50 hover:border-gray-600/50"; // Default border
    };

    return (
      <div
        className={`relative group ${
          auction.available ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => handleAuctionClick(auction)}
      >
        <div className={`backdrop-blur-sm rounded-2xl overflow-hidden ${getBorderStyle()} transition-all duration-300 hover:transform hover:scale-[1.02]`}>
          {/* Auction Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError ? (
              <Image
                src={auction.image}
                height={300}
                width={300}
                alt={auction.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900 via-blue-800 to-yellow-600 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="text-white text-center p-4 relative z-10">
                  <div className="text-6xl mb-2">🪸</div>
                  <p className="text-sm opacity-75">Coral Preview</p>
                </div>
              </div>
            )}

            {/* Membership Badge */}
            {auction.membership && auction.membership !== "normal" && (
              <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                auction.membership === "premium" 
                  ? "bg-[#DB9D17]/80 text-black" 
                  : "bg-[#69CDFF]/80 text-white"
              }`}>
                {auction.membership === "premium" ? "Premium" : "Advanced"}
              </div>
            )}

            {/* View Auction Button for Available Auctions */}
            {auction.available && (
              <div className="absolute inset-0 flex items-center justify-center">
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

            {/* Membership Lock Overlay */}
            {showMembershipOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">
                  {getMembershipIcon(auction.membership)}
                </div>
                <h4 className="font-bold mb-2 text-sm">
                  {auction.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                  Membership Required
                </h4>
                <p className="text-xs opacity-90 mb-4 leading-relaxed">
                  You have to upgrade your membership status to view this
                  product
                </p>
                {auction.coins && (
                  <div className="flex items-center gap-2 bg-amber-600/20 border border-amber-400 py-1 px-3 rounded-full">
                    <CoinsLogo className="w-5 h-5" />
                    <span className="text-white font-bold text-sm">
                      {auction.coins}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Coins Overlay */}
            {showCoinsOverlay && (
              <div className="absolute inset-0 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">{getCoinsDisplay(auction)}</div>
              </div>
            )}

            {/* Timer Display - Always at bottom */}
            {getTimerDisplay(auction)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AllAuctions;
