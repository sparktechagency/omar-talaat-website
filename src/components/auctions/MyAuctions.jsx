import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CoinsLogo, Logo } from "../share/svg/Logo";

const AuctionInterface = () => {
  // Auction data state
  const [auctionData, setAuctionData] = useState([
    {
      id: 1,
      title: "PLUM TREE ACRO CHUNK",
      status: "STARTED",
      type: "normal", // normal, advance, premium
      creditsUsed: 235,
      creditsWorth: 1000,
      csAuraWorth: 90,
      isStarted: true,
      timeLeft: { days: 0, hours: 2, minutes: 45, seconds: 30 },
      image: "/assets/category1.png",
    },
    {
      id: 2,
      title: "RAINBOW ACRO FRAG",
      status: "STARTING SOON",
      type: "advance", // normal, advance, premium
      creditsUsed: 180,
      creditsWorth: 800,
      csAuraWorth: 75,
      isStarted: false,
      timeLeft: { days: 0, hours: 1, minutes: 15, seconds: 0 },
      image: "/assets/category1.png",
    },
    {
      id: 3,
      title: "PREMIUM GOLD TORCH",
      status: "LIVE",
      type: "premium", // normal, advance, premium
      creditsUsed: 450,
      creditsWorth: 1500,
      csAuraWorth: 120,
      isStarted: true,
      timeLeft: { days: 1, hours: 5, minutes: 30, seconds: 45 },
      image: "/assets/category1.png",
    },
  ]);

  // Bid information state
  const [bidInfo, setBidInfo] = useState({
    1: {
      totalBids: 3,
      myLatestBid: "AED 250",
      currentLeadingBid: "AED 316",
      currentHighestBidder: "Sabbir Ahmed",
    },
    2: {
      totalBids: 1,
      myLatestBid: "AED 150",
      currentLeadingBid: "AED 200",
      currentHighestBidder: "Rashid Khan",
    },
    3: {
      totalBids: 8,
      myLatestBid: "AED 500",
      currentLeadingBid: "AED 750",
      currentHighestBidder: "Ahmed Ali",
    },
  });

  // Update timers for all auctions
  useEffect(() => {
    const timer = setInterval(() => {
      setAuctionData((prevData) =>
        prevData.map((auction) => ({
          ...auction,
          timeLeft: updateTimer(auction.timeLeft),
        }))
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const updateTimer = (timeLeft) => {
    if (timeLeft.seconds > 0) {
      return { ...timeLeft, seconds: timeLeft.seconds - 1 };
    } else if (timeLeft.minutes > 0) {
      return { ...timeLeft, minutes: timeLeft.minutes - 1, seconds: 59 };
    } else if (timeLeft.hours > 0) {
      return {
        ...timeLeft,
        hours: timeLeft.hours - 1,
        minutes: 59,
        seconds: 59,
      };
    } else if (timeLeft.days > 0) {
      return {
        ...timeLeft,
        days: timeLeft.days - 1,
        hours: 23,
        minutes: 59,
        seconds: 59,
      };
    }
    return timeLeft;
  };

  // Get card styling based on auction type
  const getCardStyles = (type) => {
    switch (type) {
      case "normal":
        return {
          cardBg: "bg-gray-900 border-gray-700",
          accentColor: "text-blue-400",
          gradientBorder: "border-1 border-white/50 rounded-lg",
        };
      case "advance":
        return {
          cardBg: "#057199",
          accentColor: "text-purple-400",
          gradientBorder: "border-2 border-[#69CDFF]",
        };
      case "premium":
        return {
          cardBg: "bg-gradient-to-br from-yellow-900/30 to-orange-900/30",
          accentColor: "text-yellow-400",
          gradientBorder: "border-2 border-[#DB9D17]",
        };
      default:
        return {
          cardBg: "bg-gray-900 border-gray-700",
          accentColor: "text-blue-400",
          gradientBorder: "border-1 border-white/50",
        };
    }
  };

  // Get status badge color
  const getStatusBadgeColor = (status, type) => {
    if (status === "STARTED" || status === "LIVE") {
      return type === "premium" ? "bg-yellow-400" : "bg-green-400";
    }
    return "bg-yellow-400";
  };

  const AuctionCard = ({ auction }) => {
    const styles = getCardStyles(auction.type);
    const bidData = bidInfo[auction.id];

    return (
      <div className={`bg-black text-white overflow-hidden`}>
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-[390px] ">
              <div className="relative w-full">
                <Image
                  height={400}
                  width={400}
                  loading="lazy"
                  quality={80}
                  src={auction?.image}
                  alt={auction?.title}
                  className={`${styles.cardBg} rounded-2xl overflow-hidden ${styles.gradientBorder}`}
                />
                {auction.type === "premium" && (
                  <div className="absolute top-2 right-2 bg-[#DB9D17]/80 text-black px-2 py-1 rounded-full text-xs font-bold">
                    PREMIUM
                  </div>
                )}
                {auction.type === "advance" && (
                  <div className="absolute top-2 right-2 bg-[#69CDFF]/80 text-white px-2 py-1 rounded-full text-xs font-bold">
                    ADVANCED
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:items-start">
                {/* Left Column */}
                <div className="lg:w-[622px] mb-2.5 lg:mb-0 bg-[#181818] pl-12 p-6 mx-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className={`text-xl lg:text-2xl font-bold`}>
                      {auction.title}
                    </h2>
                    {!auction.isStarted && <span className="text-2xl">🔥</span>}
                    {auction.type === "premium" && (
                      <span className="text-2xl">👑</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white">Auction Status:</span>

                      <p className="underline"> {auction.status}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-white">Credits Used:</span>
                      <div className={`font-bold flex gap-2`}>
                        <CoinsLogo />{" "}
                        <span className="font-brush text-2xl text-yellow-400">
                          {auction.creditsUsed}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-white">Credits Worth:</span>
                      <div className={`font-bold flex gap-2`}>
                        <CoinsLogo />{" "}
                        <span className="font-brush text-2xl accentColor">
                          {auction.creditsWorth}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-white">CS Aura Worth:</span>
                      <div className={`font-bold flex gap-2`}>
                        <Logo />{" "}
                        <span className="font-brush text-2xl accentColor">
                          {auction.csAuraWorth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timer Section */}
                  <div className="mb- mt-3">
                    <p className="text-white text-[12px] mb-2">
                      {auction.isStarted
                        ? "Important Note: Auction Timer will extend by 30 seconds each time a bid is placed within the final 5 Minutes!"
                        : "Auction starts in:"}
                    </p>

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-white font-semibold">
                        {auction.isStarted
                          ? "Auction Ends in:"
                          : "Auction Starts in:"}
                      </span>

                      <div className="flex gap-4 text-center">
                        <div className="flex flex-col">
                          <span className={`text-3xl lg:text-4xl font-bold `}>
                            {String(auction.timeLeft.days).padStart(2, "0")}
                          </span>
                          <span className="text-white text-sm">Days</span>
                        </div>
                        <span className="text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className={`text-3xl lg:text-4xl font-bold `}>
                            {String(auction.timeLeft.hours).padStart(2, "0")}
                          </span>
                          <span className="text-white text-sm">Hours</span>
                        </div>
                        <span className="text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className={`text-3xl lg:text-4xl font-bold `}>
                            {String(auction.timeLeft.minutes).padStart(2, "0")}
                          </span>
                          <span className="text-white text-sm">Mins</span>
                        </div>
                        <span className="text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className={`text-3xl lg:text-4xl font-bold `}>
                            {String(auction.timeLeft.seconds).padStart(2, "0")}
                          </span>
                          <span className="text-white text-sm">Secs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bid Information */}
                <div className="w-[380px]  lg:mb-0 bg-[#181818] pl-12 pb-16 p-6 mx-5 rounded-lg">
                  <div>
                    <h3 className={`font-bold text-lg mb-4 `}>
                      Bid Information:
                    </h3>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-white">
                          Total Number of Bids:
                        </span>
                        <span className="text-white font-semibold">
                          {bidData?.totalBids} Bid(s)
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white">My Latest Bid:</span>
                        <span className={`font-semibold `}>
                          {bidData?.myLatestBid}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white">Current Leading Bid:</span>
                        <span className={`font-semibold `}>
                          {bidData?.currentLeadingBid}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-white">
                          Current Highest Bidder:
                        </span>
                        <span className="text-white font-semibold">
                          {bidData?.currentHighestBidder}
                        </span>
                      </div>
                    </div>

                    <Button
                      className={`text-center ml-8 mt-20 ${
                        auction.type === "premium"
                          ? " border border-yellow-500 text-white"
                          : auction.type === "advance"
                          ? "border border-purple-500 text-white "
                          : "border text-white"
                      } border transition-all duration-200`}
                    >
                      Click Here to Place a Bid
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black">
     
      {/* Main Content */}
      <div className="container mx-auto p-4 lg:p-6 space-y-6">
        {auctionData?.map((auction) => (
          <AuctionCard key={auction?.id} auction={auction} />
        ))}
      </div>
    </div>
  );
};

export default AuctionInterface;
