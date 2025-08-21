"use client";

import React, { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check, Lock } from "lucide-react";
import { useGetTimerSectionDataQuery } from "@/redux/featured/timerSection/timerSectionApi";
import Spinner from "@/app/(commonLayout)/Spinner";

// Assuming data.json is in the root directory
// import data from "../data.json";

const Progressbar = () => {
  const{data,isLoading}=useGetTimerSectionDataQuery()
//   const [data, setData] = useState({
//     success: true,
//     message: "Reward retrieved successfully",
//     statusCode: 200,
//     data: [
//       {
//         _id: "68a3f12f9bd0a47812a8f928",
//         serial: 1,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f12f9bd0a47812a8f929",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f12f9bd0a47812a8f92a",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f12f9bd0a47812a8f92b",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:15.746Z",
//         updatedAt: "2025-08-19T03:36:15.746Z",
//         __v: 0,
//         isEligible: false,
//       },
//       {
//         _id: "68a3f1369bd0a47812a8f92e",
//         serial: 2,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f1369bd0a47812a8f92f",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f1369bd0a47812a8f930",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f1369bd0a47812a8f931",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:22.790Z",
//         updatedAt: "2025-08-19T03:36:22.790Z",
//         __v: 0,
//         isEligible: false,
//       },
//       {
//         _id: "68a3f13c9bd0a47812a8f934",
//         serial: 3,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f13c9bd0a47812a8f935",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f13c9bd0a47812a8f936",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f13c9bd0a47812a8f937",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:28.013Z",
//         updatedAt: "2025-08-19T03:36:28.013Z",
//         __v: 0,
//         isEligible: false,
//       },
//       {
//         _id: "68a3f13f9bd0a47812a8f93a",
//         serial: 4,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f13f9bd0a47812a8f93b",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f13f9bd0a47812a8f93c",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f13f9bd0a47812a8f93d",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:31.912Z",
//         updatedAt: "2025-08-19T03:36:31.912Z",
//         __v: 0,
//         isEligible: true,
//       },
//       {
//         _id: "68a3f1449bd0a47812a8f940",
//         serial: 5,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f1449bd0a47812a8f941",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f1449bd0a47812a8f942",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f1449bd0a47812a8f943",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:36.077Z",
//         updatedAt: "2025-08-19T03:36:36.077Z",
//         __v: 0,
//         isEligible: false,
//       },
//       {
//         _id: "68a3f1499bd0a47812a8f946",
//         serial: 6,
//         category: "Offers",
//         rewards: [
//           {
//             userType: "noMembership",
//             rewardAmount: 10,
//             minPurchaseRequired: 1,
//             _id: "68a3f149bd0a47812a8f947",
//           },
//           {
//             userType: "advanceMembership",
//             rewardAmount: 20,
//             minPurchaseRequired: 1,
//             _id: "68a3f149bd0a47812a8f948",
//           },
//           {
//             userType: "premiumMembership",
//             rewardAmount: 30,
//             minPurchaseRequired: 1,
//             _id: "68a3f149bd0a47812a8f949",
//           },
//         ],
//         isActive: true,
//         createdAt: "2025-08-19T03:36:41.197Z",
//         updatedAt: "2025-08-19T03:36:41.197Z",
//         __v: 0,
//         isEligible: false,
//       },
//     ],
//     meta: {
//       page: 1,
//       limit: 10,
//       total: 6,
//       totalPage: 1,
//     },
//   });
  const allSteps = data?.data;
  const scrollRef = useRef(null);

  // Find the step with isEligible: true to determine the current step
  const eligibleStep = allSteps?.find((step) => step.isEligible);
  const eligibleStepIndex = allSteps?.findIndex((step) => step.isEligible);

  // Filter steps into different categories
  const completedSteps = allSteps?.slice(0, eligibleStepIndex);
  const lockedSteps = allSteps?.slice(eligibleStepIndex + 1);

  // Determine which steps to display in the visible window
  // Logic to show one completed, the current, and two locked steps (if available)
  let stepsToDisplay = [];
  if (eligibleStepIndex > 0) {
    stepsToDisplay?.push(completedSteps[eligibleStepIndex - 1]);
  }
  stepsToDisplay?.push(eligibleStep);
  stepsToDisplay?.push(...lockedSteps?.slice(0, 2));

  // Handle horizontal scrolling for the progress bar
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  if(isLoading) <Spinner />

  return (
    <div className="bg-black text-white min-h-screen p-8 flex flex-col items-center">
      {/* Progress Bar and Step Icons */}
      <div className="w-full max-w-4xl relative">
        <div
          className="flex items-center justify-start overflow-x-auto scroll-smooth hide-scrollbar"
          ref={scrollRef}
        >
          {/* Scroll Buttons for completed steps */}
          {eligibleStepIndex > 1 && (
            <Button
              className="absolute left-0 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2"
              onClick={handleScrollLeft}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          )}

          {/* Render all steps based on their state */}
          <div className="flex items-center space-x-8 px-8 py-4">
            {allSteps.map((step, index) => {
              const isCompleted = step.serial < eligibleStep.serial;
              const isCurrent = step.isEligible;
              const isLocked = step.serial > eligibleStep.serial;

              return (
                <div
                  key={step.serial}
                  className="flex flex-col items-center relative flex-shrink-0"
                >
                  {/* Step Icon */}
                  <div
                    className={`
                      h-12 w-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300
                      ${
                        isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : ""
                      }
                      ${
                        isCurrent
                          ? "border-blue-500 bg-blue-500/20 text-blue-400"
                          : ""
                      }
                      ${
                        isLocked
                          ? "border-gray-500 bg-gray-500/20 text-gray-400"
                          : ""
                      }
                    `}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : isLocked ? (
                      <Lock className="h-6 w-6" />
                    ) : (
                      <span className="font-bold text-xl">{step.serial}</span>
                    )}
                  </div>
                  {/* Step Label */}
                  <div
                    className={`mt-2 text-sm font-medium ${
                      isCompleted
                        ? "text-green-500"
                        : isCurrent
                        ? "text-blue-500"
                        : "text-gray-400"
                    }`}
                  >
                    {step.category} {step.serial}
                  </div>
                  {/* Connector Line */}
                  {index < allSteps.length - 1 && (
                    <div
                      className={`
                        absolute top-1/2 left-[calc(100%+16px)] h-[2px] w-8 transform -translate-y-1/2
                        ${isCompleted ? "bg-blue-500" : "bg-gray-500"}
                      `}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Scroll Buttons for locked steps */}
          {lockedSteps.length > 2 && (
            <Button
              className="absolute right-0 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2"
              onClick={handleScrollRight}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          )}
        </div>
      </div>

      {/* Dynamic Cards */}
      {eligibleStep && (
        <div className="mt-16 w-full max-w-4xl flex justify-center flex-wrap md:flex-nowrap">
          {eligibleStep.rewards.map((reward, index) => (
            <div
              key={reward._id}
              className="relative flex flex-col items-center mx-2 mb-4 md:mb-0"
            >
              <Card
                className={`
            relative w-72 md:w-full bg-gray-800 text-white border border-gray-700 hover:border-blue-500 transition-colors duration-300
            ${index === 0 ? "border-white" : ""}
            ${index === 1 ? "border-blue-500" : ""}
            ${index === 2 ? "border-yellow-500" : ""}
          `}
              >
                {/* <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    {reward.userType}
                  </CardTitle>
                </CardHeader> */}
                <CardContent className="space-y-2">
                  <p className="text-lg">
                    <span className="text-blue-400 font-semibold">
                      ${reward.rewardAmount} Reward
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    Min Purchase: ${reward.minPurchaseRequired}
                  </p>
                </CardContent>
              </Card>

              {/* Connector line between cards */}
              {index < eligibleStep.rewards.length - 1 && (
                <div
                  className={`
              absolute left-full top-1/2 h-[2px] w-8 transform -translate-y-1/2
              ${index === 0 ? "bg-white" : ""}
              ${index === 1 ? "bg-blue-500" : ""}
            `}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progressbar;
