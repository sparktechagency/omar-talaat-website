"use client";
import { useState, useEffect } from "react";
import { Award, Coins, Lock } from "lucide-react";
import Image from "next/image";
import { Star } from "../share/svg/Logo";
import Container from "../share/Container";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const CountdownProgressTracker = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // State to manage collapsible section
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + 1, 1); // Next month, 1st day
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

  // Updated progressSteps array
  const progressSteps = [
    {
      id: 1,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: true,
      current: false,
      locked: false,
      showCard: true,
    },
    {
      id: 2,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: false,
      current: true,
      locked: false,
      showCard: true,
    },
    {
      id: 3,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: false,
      current: false,
      locked: true,
      showCard: true,
    },
    {
      id: 4,
      title: "",
      completed: false,
      current: false,
      locked: true,
      showCard: false, // No card for step 4, just lock icon
    },
  ];

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <Container className="bg-black text-white mt-10 flex flex-col items-center justify-center">
      {/* Star and Number - Top Left */}
      <div className="text-center mb-6">
        {/* Clickable Arrow Icon to Toggle Collapse */}
        <IoIosArrowDown
          size={32}
          onClick={() => setIsCollapsed(!isCollapsed)} // Toggle collapse state on click
          className={`transition-transform ${isCollapsed ? "rotate-180" : ""}`}
        />
      </div>

      {/* Conditionally Render Collapsible Section */}
      {!isCollapsed && (
        <div className="">
          {/* Star and Number */}
          <div
            className="absolute hidden md:flex left-12 lg:left-36 gap-3"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Star Icon with Hover Animation */}
            <motion.div
              className="relative"
              animate={{ y: isHovered ? 10 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Star />
            </motion.div>

            {/* Fixed Number and Hover Content */}
            <div className="relative">
              {/* Fixed Number 7 */}
              <span className="font-bold font-brush text-7xl text-white absolute top-0 left-0">
                7
              </span>

              {/* Hover content below number 7 */}
              {isHovered && (
                <div className="mt-4">
                  <p className="text-4xl text-white ml-10">
                    You have:{" "}
                    <span className="font-bold font-brush text-6xl ">7</span>
                  </p>
                  <p className="text-5xl font-brush text-white">
                    Consecutive monthly points
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Timer Section */}
          <div className="text-center mb-[50px]">
            <h1 className="text-3xl font-bold text-white mb-8">
              The Month Ends in:
            </h1>

            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatTime(timeLeft.days)}
                </div>
                <div className="text-sm text-gray-400">Days</div>
              </div>
              <span className="text-5xl font-bold text-white">:</span>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatTime(timeLeft.hours)}
                </div>
                <div className="text-sm text-gray-400">Hours</div>
              </div>
              <span className="text-5xl font-bold text-white">:</span>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatTime(timeLeft.minutes)}
                </div>
                <div className="text-sm text-gray-400">Mins</div>
              </div>
              <span className="text-5xl font-bold text-white">:</span>
              <div className="text-center">
                <div className="text-5xl font-bold text-white mb-2">
                  {formatTime(timeLeft.seconds)}
                </div>
                <div className="text-sm text-gray-400">Secs</div>
              </div>
            </div>

            <p className=" text-center text-base ">
              If you do not place an order within the time frame, your CM Points
              will reset!
            </p>
          </div>

          {/* Progress Steps */}
          <div className="relative w-full mb-20">
            {/* Progress Line */}
            <div className="absolute top-6 w-[1190px] mx-auto left-0 right-0 h-2 z-0">
              <div
                className="h-full"
                style={{
                  background: "linear-gradient(to right, #FFFFFF, #181818)",
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="relative grid grid-cols-2 lg:grid-cols-5 gap-5 z-10">
              {progressSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex flex-col items-center mb-8 sm:mb-0 relative"
                >
                  {/* Add left and right borders to the second card */}
                  {index === 0 && (
                    <>
                      {/* Left Border */}
                      <div className="absolute left-1/2 h-6 top-12 w-[2px] bg-white z-10"></div>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      {/* Left Border */}
                      <div className="absolute left-[-12px] h-5 rotate-90 top-3/5 bottom-0 w-[2px] bg-white z-10"></div>
                      {/* Right Border */}
                      <div className="absolute right-[-12px] h-5 rotate-90 top-3/5 bottom-0 w-[2px] bg-white z-10"></div>
                    </>
                  )}
                  {/* Step Circle */}
                  <div
                    className={`w-16 h-16 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center mb-6 bg-black
              ${
                step.completed
                  ? "border-white bg-white"
                  : step.current
                  ? "border-cyan-400 bg-white"
                  : step.locked
                  ? "border-gray-500"
                  : "border-gray-600"
              }`}
                  >
                    {step.completed ? (
                      <span className="w-8 h-8 text-black text-4xl flex items-center justify-center font-brush sm:w-6 sm:h-6">
                        1
                      </span>
                    ) : step.current ? (
                      <span className="w-8 h-8 text-black font-brush flex items-center justify-center text-4xl sm:w-6 sm:h-6">
                        2
                      </span>
                    ) : (
                      <Lock
                        className={`w-8 h-8 sm:w-6 sm:h-6 ${
                          step.locked ? "text-gray-500" : "text-gray-600"
                        }`}
                      />
                    )}
                  </div>

                  {/* Step Card only for those that have showCard: true */}
                  {step.showCard && (
                    <div
                      className={`border-2 rounded-lg p-6 sm:p-4 lg:w-[282px] lg:h-[148px] w-48 h-24 text-center ${
                        step.completed
                          ? "border-white"
                          : step.current
                          ? "border-cyan-400"
                          : "border-gray-500"
                      } bg-black`}
                    >
                      <h3 className="text-white font-bold text-sm sm:text-xs lg:text-2xl leading-tight whitespace-pre-line tracking-wide">
                        {step.title}
                      </h3>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Rewards Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-8">
              Monthly Rewards
            </h2>

            <div className="flex items-center justify-center gap-[30px] mb-[30px]">
              {/* Silver Medal */}
              <div className="">
                <Image
                  src="/assets/second.png"
                  width={65}
                  height={105}
                  alt="second"
                />
              </div>

              {/* Gold Medal */}
              <div className="">
                <Image
                  src="/assets/first.png"
                  width={80}
                  height={132}
                  alt="second"
                />
              </div>

              {/* Bronze Medal */}
              <div className="">
                <Image
                  src="/assets/third.png"
                  width={65}
                  height={105}
                  alt="second"
                />
              </div>
            </div>

            {/* Reward Descriptions */}
            <div className="flex items-center justify-center gap-12">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gray-400" />
                <span className="text-white text-sm">
                  = One 15% Voucher for your next Order
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                <span className="text-white text-sm">
                  = One 15% Voucher for your next Order
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default CountdownProgressTracker;
