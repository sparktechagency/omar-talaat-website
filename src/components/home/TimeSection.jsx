"use client";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Award, Coins, Lock, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { CoinsLogo, Logo, Star } from "../share/svg/Logo";
import Container from "../share/Container";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import {
  useGetTimerSectionDataQuery,
  useRewardClimbMutation,
} from "@/redux/featured/timerSection/timerSectionApi";
import { useGetMyWalletQuery } from "@/redux/featured/auth/authApi";
import { toast } from "sonner";

const CountdownProgressTracker = ({
  userMembership = "noMembership",
  apiData = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to manage collapsible section
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const { data: walletData, isLoading: walletLoading } = useGetMyWalletQuery();
  const wallet = walletData?.data;
  const memberShipType = wallet?.membershipType;

  const [starOuterColor, setStarOuterColor] = useState("#fff");
  const [starInnerColor, setStarInnerColor] = useState("#A4FBC4");
  const [rewardClimb, { isLoading: rewardClimbLoading }] =
    useRewardClimbMutation();

  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    if (currentDay > 20) {
      if (!wallet?.isOrder) {
        setStarOuterColor("#ca3930");
        setStarInnerColor("#FF5733");
      } else {
        setStarOuterColor("#fff");
        setStarInnerColor("#A4FBC4");
      }
    } else {
      if (wallet?.isOrder) {
        setStarOuterColor("#fff");
        setStarInnerColor("#A4FBC4");
      } else {
        setStarOuterColor("#fff");
        setStarInnerColor("#A4FBC4");
      }
    }
  }, [wallet?.isOrder]);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1, 1);
    targetDate.setHours(0, 0, 0, 0);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const { data, isLoading } = useGetTimerSectionDataQuery();
  const responseData = data?.data || [];

  // Dynamic progress steps generation - Show eligible step first + next 3
  const progressSteps = useMemo(() => {
    if (!responseData || responseData.length === 0) return [];

    // Find the step with isEligible: true
    const currentEligibleIndex = responseData.findIndex(
      (reward) => reward.isEligible === true
    );

    if (currentEligibleIndex === -1) {
      // No eligible step found, show first 4
      return responseData.slice(0, 4).map((reward, index) => ({
        id: reward._id,
        serial: reward.serial,
        isEligible: reward.isEligible,
        rewards: reward.rewards,
        completed: false,
        category: reward.category,
        isClaimed: reward.isClaimed,

        current: false,
        locked: true,
      }));
    }

    // Get eligible step + next 3 steps
    const visibleSteps = responseData.slice(
      currentEligibleIndex,
      currentEligibleIndex + 4
    );

    const steps = visibleSteps.map((reward, index) => {
      let stepStatus;
      if (index === 0) {
        // First step (eligible one) - has checkmark, can redeem
        stepStatus = {
          completed: true, // Show checkmark
          current: false,
          locked: false,
        };
      } else if (index === 1) {
        // Second step - unlocked but not current
        stepStatus = {
          completed: false,
          current: false,
          locked: false, // No lock icon
        };
      } else {
        // Third and fourth steps - locked
        stepStatus = {
          completed: false,
          current: false,
          locked: true,
        };
      }

      return {
        id: reward._id,
        serial: reward.serial,
        isEligible: reward.isEligible,
        rewards: reward.rewards,
        category: reward.category,
        isClaimed: reward.isClaimed,

        ...stepStatus,
      };
    });

    return steps;
  }, [responseData]);

  // Debug logs
  console.log("Response Data:", responseData);
  console.log(
    "Progress Steps:",
    progressSteps.map((step) => ({
      serial: step.serial,
      current: step.current,
      isEligible: step.isEligible,
      completed: step.completed,
      locked: step.locked,
    }))
  );

  // Get current eligible step for showing cards - Show first step (eligible one)
  const currentEligibleStep = useMemo(() => {
    return progressSteps.find((step) => step.isEligible === true);
  }, [progressSteps]);
  console.log("Current Eligible Step:", currentEligibleStep);

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  // Gradient Border Map for Membership Types
  const membershipBorderGradients = {
    noMembership: "from-[#69CDFF] to-[#DB9D17]", // Example Gradient
    silverMembership: "from-[#C0C0C0] to-[#808080]",
    goldMembership: "from-[#FFD700] to-[#FFA500]",
    platinumMembership: "from-[#E5E4E2] to-[#BCC6CC]",
  };

  // Remove scroll functionality since we always show eligible + next 3
  const scrolledVisibleSteps = progressSteps;

  const handleRedeem = async (rewardId, categoryName) => {
    // const confirmRedeem = window.confirm(
    //   `Are you sure you want to redeem this ${categoryName}?`
    // );

    // if (!confirmRedeem) return;

    try {
      const res = await rewardClimb(rewardId).unwrap();
      toast.success(`Successfully redeemed ${categoryName}!`);
      console.log("Redeem Success:", res);
    } catch (error) {
      toast.error("Redeem failed. Please try again.");
      console.error("Redeem Error:", error);
    }
  };

  console.log(
    "Current Index:",
    progressSteps.findIndex((step) => step.current)
  );
  console.log(
    "Scrolled Visible Steps:",
    scrolledVisibleSteps.map((step) => ({
      serial: step.serial,
      current: step.current,
      isEligible: step.isEligible,
    }))
  );

  if (isLoading) {
    return (
      <Container className="bg-black text-white mt-10 flex flex-col items-center justify-center">
        <div className="text-center">Loading...</div>
      </Container>
    );
  }

  return (
    <Container className="bg-black text-white mt-10 flex flex-col items-center justify-center overflow-hidden">
      {/* Static top section with timer */}
      <div className="text-center w-full flex flex-col items-center">
        {/* Clickable Arrow Icon to Toggle Collapse - Centered */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer inline-block"
          >
            <IoIosArrowDown size={32} />
          </motion.div>
        </div>

        {/* Timer Section - Always visible */}
        <div className="text-center ">
          <h1 className="text-3xl font-bold text-white mb-8">
            The Month Ends in:
          </h1>

          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(timeLeft.days)}
              </div>
              <div className="text-[22px] font-medium text-gray-400">Days</div>
            </div>
            <span className="text-3xl font-bold text-white mb-9">:</span>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(timeLeft.hours)}
              </div>
              <div className="text-[22px] font-medium text-gray-400">Hours</div>
            </div>
            <span className="text-3xl font-bold text-white mb-9">:</span>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(timeLeft.minutes)}
              </div>
              <div className="text-[22px] font-medium text-gray-400">Mins</div>
            </div>
            <span className="text-3xl font-bold text-white mb-9">:</span>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">
                {formatTime(timeLeft.seconds)}
              </div>
              <div className="text-[22px] font-medium text-gray-400">Secs</div>
            </div>
          </div>
        </div>
      </div>

      {/* AnimatePresence to handle the animation when component is removed */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 1.6,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="w-full flex flex-col items-center"
          >
            {/* Warning Message */}
            <p className="text-center text-2xl mb-10">
              If you do not place an order within the time frame, your CM Points
              will reset!
            </p>

            {/* Star and Number */}
            <div className="w-full relative">
              <div
                className="absolute hidden md:flex left-12 lg:left-0 gap-3 -top-60"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.div
                  className="relative"
                  animate={{ y: isHovered ? 10 : 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Star
                    outerColor={starOuterColor}
                    innerColor={starInnerColor}
                  />
                </motion.div>

                <motion.span
                  className="font-bold font-brush text-7xl text-white absolute top-0 left-24"
                  animate={{
                    y: isHovered ? 30 : 0,
                    x: isHovered ? 170 : 0,
                    scale: isHovered ? 0.9 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    duration: 1.6,
                  }}
                >
                  {wallet?.cmPoints || 7}
                </motion.span>

                {isHovered && (
                  <div className="mt-10 ml-4">
                    <p className="text-4xl text-white">You have:</p>
                    <p className="text-5xl font-brush text-white">
                      Consecutive monthly points
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Steps - No scroll needed */}
            <div className="relative w-full mb-10 mt-10">
              {/* Progress Line */}
              <div className="relative w-full lg:max-w-[1250px] mx-auto left-0 right-0 h-2 mb-8">
                <div
                  className="h-full"
                  style={{
                    background: "linear-gradient(to right, #FFFFFF, #181818)",
                  }}
                ></div>

                {/* Step Numbers positioned on the progress line */}
                <div className="absolute -left-6 top-[-30px] w-full grid grid-cols-4">
                  {scrolledVisibleSteps.map((step, index) => (
                    <div key={step.id} className="flex justify-between">
                      <div
                        className={`w-16 h-16 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center bg-black relative
                        ${
                          step.completed
                            ? "border-white bg-white text-black"
                            : index === 1
                            ? "border-white bg-white"
                            : step.locked
                            ? "border-gray-500"
                            : "border-gray-600"
                        }`}
                      >
                        {step.completed ? (
                          <>
                            {/* Checkmark for completed (eligible) step */}
                            <span className="text-black text-3xl font-brush">
                              {" "}
                              {step.serial}
                            </span>

                            <span className="absolute -top-8 text-white text-sm font-bold">
                              <svg
                                className="w-8 h-8 text-white"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </>
                        ) : index === 1 ? (
                          <span className="w-8 h-8 text-black font-brush flex items-center justify-center text-4xl sm:w-6 sm:h-6">
                            {step.serial}
                          </span>
                        ) : step.locked ? (
                          <Lock
                            className={`w-8 h-8 sm:w-6 sm:h-6 ${
                              step.locked ? "text-gray-500" : "text-gray-600"
                            }`}
                          />
                        ) : (
                          <span className="w-8 h-8 text-black font-brush flex items-center justify-center text-4xl sm:w-6 sm:h-6">
                            {step.serial}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cards Section - Only show for eligible step */}
            {currentEligibleStep && currentEligibleStep.rewards && (
              <div className="w-full mb-20">
                <div className="relative">
                  {/* Connection borders between cards */}
                  <div className="absolute top-1/2 right-2/4 w-1/3 h-[4px] bg-gradient-to-r from-[#69CDFF] to-[#DB9D17] transform -translate-y-1/2 hidden md:block"></div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl relative">
                    {currentEligibleStep.rewards.map((reward, index) => {
                      // Define dynamic border styles based on card position
                      let borderStyle = "";
                      let cardContent = "";
                      
                      if (index === 0) {
                        // First card - white border with transparent background
                        borderStyle = "border-4 border-white bg-transparent";
                        cardContent = "bg-black p-6";
                      } else if (index === 1) {
                        // Second card - blue gradient border
                        borderStyle = "border-4 border-transparent bg-gradient-to-r from-[#057199] to-[#69CDFF]";
                        cardContent = "bg-black rounded-lg p-6";
                      } else if (index === 2) {
                        // Third card - red gradient border
                        borderStyle = "border-4 border-transparent bg-gradient-to-r from-[#900001] via-[#ff6728] to-[#c20002]";
                        cardContent = "bg-black rounded-lg p-6 ";
                      }

                      return (
                        <div key={reward._id} className="relative h-full">
                          <div className={`relative rounded-lg h-full flex flex-col ${borderStyle}`}>
                            {/* Inner content container */}
                            <div className={`${cardContent} text-center h-full flex flex-col justify-between`}>
                              {/* Vertical border inside first card */}
                              {index === 0 && (
                                <div className="absolute left-1/2 top-[-67px] w-[4px] h-16 bg-gradient-to-b from-[#69CDFF] to-[#DB9D17] transform -translate-x-1/2"></div>
                              )}

                              <h3 className="text-white mb-2">
                                {currentEligibleStep?.category || "credit"}
                              </h3>
                              <div className="text-white flex-grow flex flex-col justify-center">
                                <p className="text-2xl font-bold text-cyan-400 mb-2">
                                  {reward.rewardAmount}{" "}
                                  {currentEligibleStep?.category}
                                </p>
                                {/* <p className="text-gray-400 mb-3">
                                  Min Purchase: ${reward.minPurchaseRequired}
                                </p> */}
                              </div>
                              <div className="mt-auto">
                                {memberShipType === reward.userType &&
                                  !currentEligibleStep.isClaimed && (
                                    <button
                                      onClick={() =>
                                        handleRedeem(
                                          currentEligibleStep.id,
                                          currentEligibleStep.category
                                        )
                                      }
                                      disabled={
                                        rewardClimbLoading || reward.isClaimed
                                      }
                                      className="text-white border cursor-pointer font-bold py-2 px-4 rounded-md hover:opacity-90 transition-opacity"
                                    >
                                      {rewardClimbLoading
                                        ? "Processing..."
                                        : "Redeem"}
                                    </button>
                                  )}

                                {/* If the reward is claimed, show a message or alternative button */}
                                {memberShipType === reward.userType &&
                                  currentEligibleStep.isClaimed && (
                                    <button
                                      disabled
                                      className="text-gray-500 border font-bold py-2 px-4 rounded-md opacity-60 cursor-not-allowed"
                                    >
                                      Claimed
                                    </button>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Monthly Rewards Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-8">
                Monthly Rewards
              </h2>

              <div className="flex items-center justify-center gap-[30px] mb-[30px]">
                <div>
                  <Image
                    src="/assets/second.png"
                    width={65}
                    height={105}
                    alt="second"
                    className=""
                  />
                </div>
                <div>
                  <Image
                    src="/assets/first.png"
                    width={80}
                    height={132}
                    alt="first"
                    className=""
                  />
                </div>
                <div>
                  <Image
                    src="/assets/third.png"
                    width={65}
                    height={105}
                    alt="third"
                    className=""
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-12">
                <div className="flex items-center gap-2">
                  <Logo className="w-5 h-5 text-gray-400" />
                  <span className="text-white text-sm">
                    = One 15% Voucher for your next Order
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CoinsLogo className="w-5 h-5 text-yellow-400" />
                  <span className="text-white text-sm">
                    = One 15% Voucher for your next Order
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CountdownProgressTracker;