import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { CoinsLogo, Logo } from "../share/svg/Logo";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

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

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [currentAuctionId, setCurrentAuctionId] = useState(null);
  const [pendingBids, setPendingBids] = useState({});

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
          gradientBorder: "border-[3px] border-[#69CDFF] neon-border-advanced rounded-lg",
        };
      case "premium":
        return {
          cardBg: "bg-gradient-to-br from-yellow-900/30 to-orange-900/30",
          accentColor: "text-yellow-400",
          gradientBorder: "border-[3px] border-[#DB9D17] neon-border-premium rounded-lg",
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

  // Open bid modal
  const openBidModal = (auctionId) => {
    setCurrentAuctionId(auctionId);
    setBidAmount("");
    setIsModalOpen(true);
  };

  // Handle bid submission
  const handlePlaceBid = () => {
    if (!bidAmount || isNaN(Number(bidAmount))) return;
    
    // Update bid info
    const newBidInfo = { ...bidInfo };
    newBidInfo[currentAuctionId] = {
      ...newBidInfo[currentAuctionId],
      myLatestBid: `AED ${bidAmount}`,
      totalBids: newBidInfo[currentAuctionId].totalBids + 1
    };
    setBidInfo(newBidInfo);
    
    // Mark this auction as having a pending bid
    setPendingBids({
      ...pendingBids,
      [currentAuctionId]: true
    });
    
    // Close modal
    setIsModalOpen(false);
  };

  const AuctionCard = ({ auction }) => {
    const styles = getCardStyles(auction.type);
    const bidData = bidInfo[auction.id];
    const isPending = pendingBids[auction.id];

    return (
      <Card className="bg-black text-white overflow-hidden mb-8 rounded-xl">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row gap-4 ">
            {/* Image Section */}
            <div className="w-full lg:w-[300px] xl:w-[390px] flex-shrink-0">
              <div className="relative w-full h-[250px] sm:h-[300px] lg:h-[350px]">
                <Image
                  src={auction?.image}
                  alt={auction?.title}
                  fill
                  className={`object-cover rounded-xl ${styles.gradientBorder}`}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <div className="flex flex-col flex-grow w-full gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Left Column */}
                <div className="w-full md:w-3/5 bg-[#181818] p-4 sm:p-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-bold">
                      {auction.title}
                    </h2>
                    {!auction.isStarted && <span className="text-2xl">🔥</span>}
                    {auction.type === "premium" && (
                      <span className="text-2xl">👑</span>
                    )}
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm sm:text-base">Auction Status:</span>
                      <p className="underline text-sm sm:text-base"> {auction.status}</p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm sm:text-base">Credits Used:</span>
                      <div className="font-bold flex gap-2 items-center">
                        <CoinsLogo className="w-5 h-5" />
                        <span className="font-brush text-xl sm:text-2xl text-[#DB9D17]">
                          {auction.creditsUsed}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm sm:text-base">Credits Worth:</span>
                      <div className="font-bold flex gap-2 items-center">
                        <CoinsLogo className="w-5 h-5" />
                        <span className="font-brush text-xl sm:text-2xl text-[#DB9D17]">
                          {auction.creditsWorth}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white text-sm sm:text-base">CS Aura Worth:</span>
                      <div className="font-bold flex gap-2 items-center">
                        <Logo className="w-5 h-5" />
                        <span className="font-brush text-xl sm:text-2xl text-[#DB9D17]">
                          {auction.csAuraWorth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Timer Section */}
                  <div className="mt-4">
                    <p className="text-white text-[10px] sm:text-xs mb-2">
                      {auction.isStarted
                        ? "Important Note: Auction Timer will extend by 30 seconds each time a bid is placed within the final 5 Minutes!"
                        : "Auction starts in:"}
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                      <span className="text-white font-semibold text-sm sm:text-base">
                        {auction.isStarted
                          ? "Auction Ends in:"
                          : "Auction Starts in:"}
                      </span>

                      <div className="flex gap-2 sm:gap-3 text-center">
                        <div className="flex flex-col">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            {String(auction.timeLeft.days).padStart(2, "0")}
                          </span>
                          <span className="text-white text-[10px] sm:text-xs">Days</span>
                        </div>
                        <span className="text-2xl sm:text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            {String(auction.timeLeft.hours).padStart(2, "0")}
                          </span>
                          <span className="text-white text-[10px] sm:text-xs">Hours</span>
                        </div>
                        <span className="text-2xl sm:text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            {String(auction.timeLeft.minutes).padStart(2, "0")}
                          </span>
                          <span className="text-white text-[10px] sm:text-xs">Mins</span>
                        </div>
                        <span className="text-2xl sm:text-3xl text-white">:</span>
                        <div className="flex flex-col">
                          <span className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                            {String(auction.timeLeft.seconds).padStart(2, "0")}
                          </span>
                          <span className="text-white text-[10px] sm:text-xs">Secs</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Bid Information */}
                <div className="w-full md:w-2/5 bg-[#181818] p-4 sm:p-5 rounded-lg">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg mb-4">
                      Bid Information:
                    </h3>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="flex justify-between flex-wrap gap-1">
                        <span className="text-white">
                          Total Number of Bids:
                        </span>
                        <span className="text-white font-semibold">
                          {bidData?.totalBids} Bid(s)
                        </span>
                      </div>

                      <div className="flex justify-between flex-wrap gap-1">
                        <span className="text-white">My Latest Bid:</span>
                        <span className="font-semibold">
                          {bidData?.myLatestBid}
                        </span>
                      </div>

                      <div className="flex justify-between flex-wrap gap-1">
                        <span className="text-white">Current Leading Bid:</span>
                        <span className="font-semibold">
                          {bidData?.currentLeadingBid}
                        </span>
                      </div>

                      <div className="flex justify-between flex-wrap gap-1">
                        <span className="text-white">
                          Current Highest Bidder:
                        </span>
                        <span className="text-white font-semibold">
                          {bidData?.currentHighestBidder}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6 sm:mt-10">
                      <Button
                        onClick={() => openBidModal(auction.id)}
                        disabled={isPending}
                        className={`w-full sm:w-auto ${
                          auction.type === "premium"
                            ? "border border-yellow-500 text-white hover:bg-yellow-500/20"
                            : auction.type === "advance"
                            ? "border border-purple-500 text-white hover:bg-purple-500/20"
                            : "border text-white hover:bg-white/10"
                        } transition-all duration-200`}
                      >
                        {isPending ? "Pending" : "Click Here to Place a Bid"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-6 space-y-6">
        {auctionData?.map((auction) => (
          <AuctionCard key={auction?.id} auction={auction} />
        ))}
      </div>

      {/* Bid Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-black/40  text-white shadow-2xl sm:max-w-[425px] backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center ">Place Your Bid</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="bidAmount" className="text-sm font-medium mb-2">
                  Enter Bid Amount (AED)
                </label>
                <Input
                  id="bidAmount"
                  type="number"
                  min="1"
                  placeholder="Enter amount"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className=" text-white rounded-3xl border border-white/20"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
          
            <Button 
              onClick={handlePlaceBid}
              disabled={!bidAmount || isNaN(Number(bidAmount))}
              className="text-white font-bold border border-white/40"
            >
              Place Bid
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuctionInterface;
