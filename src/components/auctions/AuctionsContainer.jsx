"use client";
import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import { CoinsLogo, MainLogo } from "../share/svg/Logo";

const AuctionsContainer = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Sample auction data
  const auctions = [
    {
      id: 1,
      name: "CS Purple Hornets Zoanthids",
      currentBid: 99.5,
      image: "/assets/category1.png",
      status: "Live Auction",
      timeLeft: "2h 30m",
      available: true,
      membership: "normal",
      type: "live",
    },
    {
      id: 2,
      name: "CS Blue Matrix Zoanthids",
      currentBid: 149.99,
      image: "/assets/category8.png",
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
      image: "/assets/category3.png",
      status: "My Bid",
      timeLeft: "3h 45m",
      available: false,
      membership: "advanced",
      type: "my_auction",
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
    },
    {
      id: 5,
      name: "CS Green Bay Packers",
      currentBid: 89.99,
      image: "/assets/category9.png",
      status: "Live Auction",
      timeLeft: "45m",
      available: true,
      membership: "normal",
      type: "live",
    },
    {
      id: 6,
      name: "CS Sunny Delight",
      currentBid: 129.5,
      image: "/assets/category9.png",
      status: "Upcoming",
      timeLeft: "Starts tomorrow",
      coins: 235,
      available: false,
      membership: "normal",
      type: "upcoming",
    },
    {
      id: 7,
      name: "CS Dragon Eyes",
      currentBid: 249.99,
      image: "/assets/category7.png",
      status: "My Bid",
      timeLeft: "5h 20m",
      available: false,
      coins: 235,
      membership: "advanced",
      type: "my_auction",
    },
    {
      id: 8,
      name: "CS Ultra Rare Collector",
      currentBid: 399.0,
      image: "/assets/category8.png",
      status: "Premium Auction",
      timeLeft: "30m",
      available: false,
      coins: 235,
      membership: "premium",
      type: "my_auction",
    },
  ];

  const tabs = [
    { id: "all", label: "All Auctions" },
    { id: "upcoming", label: "Upcoming Auctions" },
    { id: "my_auction", label: "My Auctions" },
  ];

  const getFilteredAuctions = () => {
    if (activeTab === "all") {
      return auctions;
    }
    return auctions.filter((auction) => auction.type === activeTab);
  };

  const handleAuctionClick = (auction) => {
    if (auction.available) {
      console.log("Navigate to auction:", auction.id);
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
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[100px] lg:h-[122px] mx-auto mb-6"
            color="#057199"
          />
        );
      } else if (membership === "premium") {
        return (
          <MainLogo
            className="w-32 h-36 lg:w-[100px] lg:h-[122px] mx-auto mb-6"
            color="#FEF488"
          />
        );
      }
      return null;
    };

    const getCoinsDisplay = (auction) => {
      if (showCoinsOverlay) {
        return (
          <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
            <CoinsLogo />
            <span className="text-white font-semibold text-4xl font-brush">
              {auction.coins}
            </span>
          </div>
        );
      }
      return null;
    };

    const getStatusColor = (status) => {
      switch (status) {
        case "Live Auction":
          return "text-green-400";
        case "Upcoming":
          return "text-blue-400";
        case "My Bid":
          return "text-yellow-400";
        case "Premium Auction":
          return "text-purple-400";
        default:
          return "text-gray-400";
      }
    };

    return (
      <div
        className={`relative group ${
          auction.available ? "cursor-pointer" : "cursor-default"
        }`}
        onClick={() => handleAuctionClick(auction)}
      >
        <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]">
          {/* Auction Image */}
          <div className="relative aspect-square overflow-hidden">
            {!imageError ? (
              <img
                src={auction.image}
                alt={auction.name}
                onError={handleImageError}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

            {/* Time Left Badge */}
            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-white text-xs font-medium">
                {auction.timeLeft}
              </span>
            </div>

            {/* Membership Lock Overlay */}
            {showMembershipOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">
                  {getMembershipIcon(auction.membership)}
                </div>
                <h4 className="font-bold mb-2">
                  {auction.membership === "advanced" ? "Advanced" : "Premium"}{" "}
                  Membership Required
                </h4>
                <p className="text-[12px] opacity-90 mb-4 leading-relaxed">
                  You have to upgrade your membership status to view this
                  auction
                </p>
                {auction.coins && (
                  <div className="flex gap-2 border-2 border-amber-200 py-1 px-6 rounded-full">
                    <CoinsLogo />
                    <span className="text-white font-semibold text-4xl font-brush">
                      {auction.coins}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Coins Overlay */}
            {showCoinsOverlay && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6">
                <div className="mb-4">{getCoinsDisplay(auction)}</div>
              </div>
            )}
          </div>

          {/* Auction Info */}
          <div className="p-4">
            <h3 className="text-white font-medium text-lg mb-1 group-hover:text-yellow-400 transition-colors">
              {auction.name}
            </h3>
            <p
              className={`text-sm mb-3 italic ${getStatusColor(
                auction.status
              )}`}
            >
              {auction.status}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs">Current Bid</p>
                <p className="text-white font-bold text-xl">
                  AED {auction.currentBid.toFixed(2)}
                </p>
              </div>
              {auction.status === "Live Auction" && (
                <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300">
                  Bid Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Coral Auctions
          </h1>
          <p className="text-gray-400">
            Bid on premium corals for your reef aquarium
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-black"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-white hover:bg-gray-700/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Auction Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {getFilteredAuctions().map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>

        {/* No Results */}
        {getFilteredAuctions().length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No auctions found in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionsContainer;
