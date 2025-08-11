"use client";
import React, { useCallback, useState } from "react";
import Container from "../share/Container";
import AllAuctions from "./AllAuctions";
import UpcomingAuctions from "./UpcomingAuctions";
import MyAuctions from "./MyAuctions";
import { useGetMyProfileQuery } from "@/redux/featured/auth/authApi";
import { useRouter } from "next/navigation";
import { useUnlockProductOfCreditMutation } from "@/redux/featured/shop/shopApi";

const AuctionsContainer = () => {
  const [activeTab, setActiveTab] = useState("all");
  const router=useRouter()
  const [unlockProductOfCredit, { isLoading: unlocking },refetch] = useUnlockProductOfCreditMutation();

const {data:userData, isLoading}=useGetMyProfileQuery();
const currentUser=userData?.data
console.log(currentUser)



   const handleUnlockWithCredits = useCallback(
    async (auction) => {
      console.log(auction, "auction")

      try {
        if (!currentUser) {
          router.push("/login");
          return;
        }

        const data = { itemId: auction._id, credit: auction.creditNeeds };

        console.log(data, "data")
        const res = await unlockProductOfCredit(data).unwrap();
        if (res.success) {
          toast.success("Auction unlocked successfully");
        }else{
          toast.error("Auction unlock failed");
        }
        await refetch();;
      } catch (err) {
      }
    },
    [currentUser, router, unlockProductOfCredit, refetch]
  );

  const tabs = [
    { id: "all", label: "All Auctions" },
    { id: "upcoming", label: "Upcoming Auctions" },
    { id: "my_auction", label: "My Auctions" },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "all":
        return <AllAuctions setActiveTab={setActiveTab} currentUser={currentUser} onUnlockWithCredits={handleUnlockWithCredits} isLoading={unlocking}/>;
      case "upcoming":
        return <UpcomingAuctions setActiveTab={setActiveTab} currentUser={currentUser} onUnlockWithCredits={handleUnlockWithCredits} isLoading={unlocking} />;


      case "my_auction":
        return <MyAuctions />;
      default:
        return <AllAuctions setActiveTab={setActiveTab} />;
    }
  };

  return (
    <Container className=" text-white">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 ">
            Auctions
          </h1>
          {/* <p className="text-gray-400">
            Bid on premium corals for your reef aquarium
          </p> */}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 border-y border-white/20 justify-center sm:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={` py-3  font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? " text-white font-black text-xl "
                    : " backdrop-blur-sm   text-white "
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Render Active Component */}
        {renderActiveComponent()}
      </div>
    </Container>
  );
};

export default AuctionsContainer;
