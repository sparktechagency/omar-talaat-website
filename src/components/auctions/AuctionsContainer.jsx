"use client";
import React, { useState } from "react";
import Container from "../share/Container";
import AllAuctions from "./AllAuctions";
import UpcomingAuctions from "./UpcomingAuctions";
import MyAuctions from "./MyAuctions";

const AuctionsContainer = () => {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Auctions" },
    { id: "upcoming", label: "Upcoming Auctions" },
    { id: "my_auction", label: "My Auctions" },
  ];

  const renderActiveComponent = () => {
    switch (activeTab) {
      case "all":
        return <AllAuctions setActiveTab={setActiveTab} />;
      case "upcoming":
        return <UpcomingAuctions setActiveTab={setActiveTab} />;
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
