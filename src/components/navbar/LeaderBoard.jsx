"use client";
import React, { useState, useMemo } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { CalenderLogo, CoinsLogo, Logo, Ranking } from "../share/svg/Logo";

const LeaderboardModal = ({ isOpen, setIsOpen }) => {
  const leaderboardData = [
    {
      name: "Sabbir Ahmed",
      avatar: "/assets/profile.png",
      cmPoints: 10,
      credits: 200,
      csAura: 300,
    },
    {
      name: "Rakib Hasan",
      avatar: "/assets/profile.png",
      cmPoints: 15,
      credits: 150,
      csAura: 250,
    },
    {
      name: "Nusrat Jahan",
      avatar: "/assets/profile.png",
      cmPoints: 5,
      credits: 100,
      csAura: 280,
    },
    {
      name: "Mehedi Hasan",
      avatar: "/assets/profile.png",
      cmPoints: 8,
      credits: 300,
      csAura: 300,
    },
    {
      name: "Tanjina Akter",
      avatar: "/assets/profile.png",
      cmPoints: 15,
      credits: 170,
      csAura: 320,
    },
    {
      name: "Sabbir Ahmed",
      avatar: "/assets/profile.png",
      cmPoints: 14,
      credits: 200,
      csAura: 200,
    },
    {
      name: "Rakib Hasan",
      avatar: "/assets/profile.png",
      cmPoints: 15,
      credits: 150,
      csAura: 250,
    },
    {
      name: "Nusrat Jahan",
      avatar: "/assets/profile.png",
      cmPoints: 5,
      credits: 100,
      csAura: 280,
    },
    {
      name: "Mehedi Hasan",
      avatar: "/assets/profile.png",
      cmPoints: 5,
      credits: 200,
      csAura: 130,
    },
    {
      name: "Tanjina Akter",
      avatar: "/assets/profile.png",
      cmPoints: 12,
      credits: 180,
      csAura: 220,
    },
  ];

  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedLeaderboardData = useMemo(() => {
    const data = [...leaderboardData];
    if (!sortKey) return data;

    return data.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });
  }, [leaderboardData, sortKey, sortOrder]);

  const getMedalIcon = (position) => {
    if (position === 1)
      return (
        <div className="w-8 h-8  rounded-full flex items-center ">
          <Image src="/assets/first.png" width={20} height={20} alt="First" />
        </div>
      );
    if (position === 2)
      return (
        <div className="w-8 h-8 rounded-full flex items-center ">
          <Image src="/assets/second.png" width={40} height={40} alt="Second" />
        </div>
      );
    if (position === 3)
      return (
        <div className="w-8 h-8  rounded-full flex items-center ">
          <Image src="/assets/third.png" width={20} height={20} alt="Third" />
        </div>
      );
    return null;
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0  flex items-center justify-end z-50 px-4 mr-48 mt-8">
          <div className="rounded-xl border  bg-black/70 p-5 w-[500px] overflow-hidden">
            {/* Header */}
            <div className=" text-white w-full px-6   flex items-center justify-between">
              <div className="flex items-center justify-center mb-5 mx-auto px-4 py-2 rounded-md border space-x-1">
                <Ranking className="w-6 h-6 text-yellow-400" />
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
            <div className="border border-white/60 bg-[#181818] text-white px-3 py-2">
              <div className="grid grid-cols-12 gap-4 items-center text-[12px] font-medium">
                <div className="col-span-1">Pos</div>
                <div className="col-span-5">Name</div>

                <div
                  className="col-span-2 flex items-center space-x- cursor-pointer"
                  onClick={() => handleSort("cmPoints")}
                >
                  <span>CMPoints</span>
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

                <div
                  className="col-span-2 flex items-center space-x-1 cursor-pointer"
                  onClick={() => handleSort("credits")}
                >
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

                <div
                  className="col-span-2 flex items-center space-x- cursor-pointer"
                  onClick={() => handleSort("csAura")}
                >
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

            {/* Table Body */}
            <div className="border border-white/60 bg-[#181818] text-white">
              {sortedLeaderboardData.map((user, index) => (
                <div key={index} className="border-1 border-white/60 last:border-b-0">
                  <div className="grid grid-cols-12 gap-4 items-center  px-2 py-2 transition-colors">
                    {/* Dynamic Position */}
                    <div className="col-span-1 flex ">
                      {index + 1 <= 3 ? (
                        getMedalIcon(index + 1)
                      ) : (
                        <span className="text-lg font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    {/* Name + Avatar */}
                    <div className="col-span-5 flex items-center space-x-1">
                      <div className="w-8 h-8  rounded-full overflow-hidden">
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          height={32}
                          width={32}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-[12px]">{user.name}</span>
                    </div>

                    {/* CM Points */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <CalenderLogo className="w-3 h-3 text-green-400 fill-green-400 " />
                      <span className="font-brush text-xl">{user.cmPoints}</span>
                    </div>

                    {/* Credits */}
                    <div className="col-span-2 flex items-center space-x-2">
                     <div className="w-6 h-6 ">
                     <CoinsLogo className="w-4 h-4 text-yellow-400" />
                     </div>
                      <span className="text-yellow-400 text-xl font-medium font-brush ml-2">
                        {user.credits}
                      </span>
                    </div>

                    {/* CS Aura */}
                    <div className="col-span-2 flex items-center space-x-2">
                      <Logo className="w-4 h-4 text-blue-400" />
                      <span className="text-[#A2A2A2] font-medium text-xl font-brush">
                        {user.csAura}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeaderboardModal;
