import React, { useState } from "react";
import { X, Trophy, Star, Coins, Sparkles } from "lucide-react";
import Image from "next/image";

const LeaderboardModal = ({ isOpen, setIsOpen }) => {
  // Sample data - same person repeated as shown in the image
  const leaderboardData = Array.from({ length: 10 }, (_, index) => ({
    position: index + 1,
    name: "Sabbir Ahmed",
    avatar: "/assets/profile.png", 
    cmPoints: 7,
    credits: 235,
    csAura: 100,
    medal:
      index < 3
        ? index === 0
          ? "gold"
          : index === 1
          ? "silver"
          : "bronze"
        : null,
  }));

  const getMedalIcon = (position) => {
    if (position === 1)
      return (
        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
          <Image
            src="/assets/first.png"
            width={20}
            height={20}
            quality={75}
            className="w-8 h-8 text-white"
            alt="First Place Medal" 
          />
        </div>
      );
    if (position === 2)
      return (
        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
          <Image
            src="/assets/second.png"
            width={40}
            height={40}
            quality={75}
            className="w-10 h-10 text-white"
            alt="Second Place Medal"
          />
        </div>
      );
    if (position === 3)
      return (
        <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center">
          <Image
            src="/assets/third.png"
            width={20}
            height={20}
            quality={75}
            className="w-8 h-8 text-white"
            alt="Third Place Medal"
          />
        </div>
      );
    return null;
  };

  return (
    <>
      {/* Trigger Button */}
      {/* <div className="relative group">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-1 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Trophy className="w-5 h-5" />
        </button>
      </div> */}

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0  bg-opacity-50 lg:mt-80 lg:mr-48 flex items-center justify-end z-50 px-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Header */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-semibold">Leaderboard</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            {/* Table Header */}
            <div className="bg-gray-800 text-white px-3 py-2">
              <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium">
                <div className="col-span-1">Pos</div>
                <div className="col-span-5">Name</div>
                <div className="col-span-2 flex items-center space-x-1">
                  <span>CM Points</span>
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="col-span-2 flex items-center space-x-1">
                  <span>Credits</span>
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="col-span-2 flex items-center space-x-1">
                  <span>CS Aura</span>
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Leaderboard Content */}
            <div className="bg-gray-900 text-white overflow-y-auto custom-scrollbar max-h-96">
              {leaderboardData.map((user, index) => (
                <div
                  key={index}
                  className="border-b border-gray-700 last:border-b-0"
                >
                  <div className="grid grid-cols-12 gap-4 items-center px-6 py-2 hover:bg-gray-800 transition-colors">
                    {/* Position */}
                    <div className="col-span-1 flex items-center">
                      {user.medal ? (
                        getMedalIcon(user.position)
                      ) : (
                        <span className="text-lg font-semibold">
                          {user.position}
                        </span>
                      )}
                    </div>

                    {/* Name with Avatar */}
                    <div className="col-span-5 flex items-center space-x-1">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          height={20}
                          width={20}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                        <div
                          className="w-full h-full bg-gray-600 flex items-center justify-center text-white text-sm font-semibold"
                          style={{ display: "none" }}
                        >
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                      </div>
                      <span className="font-medium">{user.name}</span>
                    </div>

                    {/* CM Points */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <Star className="w-4 h-4 text-green-400 fill-green-400" />
                      <span>{user.cmPoints}</span>
                    </div>

                    {/* Credits */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <div className="flex">
                        <Coins className="w-4 h-4 text-yellow-400" />
                      </div>
                      <span className="text-yellow-400 font-medium">
                        {user.credits}
                      </span>
                    </div>

                    {/* CS Aura */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">
                        {user.csAura}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <style jsx>{`
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #181818
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(255, 255, 255, 0.8);
  }
`}</style>
            
          </div>
        </div>
      )}
    </>
  );
};



export default LeaderboardModal;
