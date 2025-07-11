"use client";
import React, { useState } from "react";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";
import Image from "next/image";

const UpcomingAuctions = ({ setActiveTab }) => {
  const upcomingAuctions = [
    {
      id: 1,
      name: "PLUM TREE ACRO CHUNK",
      image: "/assets/category1.png",
      status: "STARTING SOON",
      available: true,
      membership: "normal",
      creditsUsed: 235,
      creditsWorth: 1000,
      csAuraWorth: 92,
     
    },
    {
      id: 2,
      name: "Coral Name",
      image: "/assets/category12.png",
      status: "STARTING SOON",
      available: false,
      membership: "normal",
      coins: 235,
    
    },
    {
      id: 3,
      name: "Coral Name",
      image: "/assets/category12.png",
      status: "STARTING SOON",
      available: false,
      membership: "advanced",
      coins: 235,
      startTime: {
        days: 0,
        hours: 8,
        mins: 45,
        secs: 10,
      },
    },
    {
      id: 4,
      name: "Coral Name",
      image: "/assets/category13.png",
      status: "STARTING SOON",
      available: false,
      membership: "premium",
      coins: 235,
      startTime: {
        days: 3,
        hours: 2,
        mins: 30,
        secs: 55,
      },
    },
  ];

  const [selectedAuction, setSelectedAuction] = useState(null);

  const handleAuctionClick = (auction) => {
    if (auction.available) {
      setSelectedAuction(auction);
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
        return <MainLogo className="w-16 h-16 mx-auto mb-4" color="#DB9D17" />;
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
      }
      return null;
    };

    // Define border style based on membership with neon infinity effect
    const getBorderStyle = () => {
      if (auction.membership === "premium") {
        return "border-[3px] border-[#DB9D17] neon-border-premium"; // Premium with neon effect
      } else if (auction.membership === "advanced") {
        return "border-[3px] border-[#69CDFF] neon-border-advanced"; // Advanced with neon effect
      }
      return "border border-gray-700/50 hover:border-gray-600/50"; // Default border
    };

    return (
      <div
        className={`relative group auction-card ${
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
                alt={auction.name}
                height={300}
                width={300}
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
                    if (setActiveTab) {
                      setActiveTab("my_auction");
                    }
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
                    <CoinsLogo className="w-5 h-5 " />
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

  // Detailed Upcoming Auction View
  if (selectedAuction) {
    return (
      <div className="space-y-6">
        <button
          onClick={() => setSelectedAuction(null)}
          className="text-blue-400 hover:text-blue-300 mb-4"
        >
          ← Back to Upcoming Auctions
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Auction Image */}
          <div className="relative">
            <Image
              src={selectedAuction.image}
              alt={selectedAuction.name}
              height={300}
              width={300}
              className="w-full aspect-square object-cover rounded-2xl"
            />
          </div>

          {/* Auction Details */}
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">
              {selectedAuction.name}
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-blue-400 text-sm font-medium">
                  Auction Status: STARTING SOON
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <CoinsLogo className="w-5 h-5 " />
                  <span className="text-white">
                    {selectedAuction.creditsUsed || 235}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CoinsLogo className="w-5 h-5 " />
                  <span className="text-white">
                    {selectedAuction.creditsWorth || 1000}
                  </span>
                </div>
                <div className="text-white">
                  CS Aura Worth: {selectedAuction.csAuraWorth || 92}
                </div>
              </div>

              <div className="bg-gray-800 p-4 rounded-lg">
                <h3 className="text-white font-bold mb-2">
                  Auction Starts In:
                </h3>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {String(selectedAuction.startTime?.days || 0).padStart(2, "0")}
                    </div>
                    <div className="text-gray-400 text-xs">Days</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {String(selectedAuction.startTime?.hours || 0).padStart(2, "0")}
                    </div>
                    <div className="text-gray-400 text-xs">Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {String(selectedAuction.startTime?.mins || 0).padStart(2, "0")}
                    </div>
                    <div className="text-gray-400 text-xs">Mins</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {String(selectedAuction.startTime?.secs || 0).padStart(2, "0")}
                    </div>
                    <div className="text-gray-400 text-xs">Secs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Information */}
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">
            Bid Information:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Total Number of Bids:</p>
              <p className="text-white font-bold">3 Bid(s)</p>
            </div>
            <div>
              <p className="text-gray-400">My Latest Bid:</p>
              <p className="text-white font-bold">AED 250</p>
            </div>
            <div>
              <p className="text-gray-400">
                Current Leading Bid (Highest Bid Amount):
              </p>
              <p className="text-white font-bold">AED315</p>
            </div>
            <div>
              <p className="text-gray-400">Current Highest Bidder:</p>
              <p className="text-white font-bold">Sabbir Ahmed</p>
            </div>
          </div>
          <button className="mt-6 bg-gray-600 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed">
            Click Here to Place a Bid
          </button>
          <p className="text-gray-400 text-sm mt-2">
            Bidding will be available when auction starts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {upcomingAuctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default UpcomingAuctions;