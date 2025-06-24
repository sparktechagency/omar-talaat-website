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
        return <AllAuctions />;
      case "upcoming":
        return <UpcomingAuctions />;
      case "my_auction":
        return <MyAuctions />;
      default:
        return <AllAuctions />;
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
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "border text-black bg-white"
                    : "bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 text-white hover:bg-gray-700/50"
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
