"use client";
import { useState, useEffect } from "react";
import { Award, Coins, Lock } from "lucide-react";
import Image from "next/image";
import { CoinsLogo, Logo, Star } from "../share/svg/Logo";
import Container from "../share/Container";
import { motion, AnimatePresence } from "framer-motion";
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
            initial={{ height: 0, opacity: 0 }} // Initial state when it is collapsed
            animate={{ height: "auto", opacity: 1 }} // When the element is open
            exit={{ height: 0, opacity: 0 }} // When the element is collapsed
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
                  <Star />
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
                  7
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

            {/* Progress Steps */}
            <div className="relative w-full mb-20 mt-10">
              <div className="absolute top-6 w-[1200px] mx-auto left-0 right-0 h-2 z-0">
                <div
                  className="h-full"
                  style={{
                    background: "linear-gradient(to right, #FFFFFF, #181818)",
                  }}
                ></div>
              </div>

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
                      <div className="absolute left-1/2 h-6 top-12 w-[4px] bg-white z-10"></div>
                    </>
                  )}
                    {index === 1 && (
                      <>
                        <div className="absolute left-[-12px] h-8 rotate-90 top-3/5 bottom-0 w-[4px] bg-gradient-to-t from-white to-[#69CDFF] z-10"></div>
                        <div className="absolute right-[-10px] h-8 rotate-90 top-3/5 w-[4px] bg-gradient-to-t from-[#69CDFF] to-[#DB9D17] z-10"></div>
                      </>
                    )}
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

                    {step.showCard && (
                      <div
                        className={`border-4 rounded-lg p-6 sm:p-4 lg:w-[282px] lg:h-[148px] w-48 h-24 text-center ${
                          step.completed
                            ? "border-white"
                            : step.current
                            ? "border-[#69CDFF]"
                            : "border-[#DB9D17]"
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
                <div>
                  <Image
                    src="/assets/second.png"
                    width={65}
                    height={105}
                    alt="second"
                    className="hover:scale-125"
                  />
                </div>
                <div>
                  <Image
                    src="/assets/first.png"
                    width={80}
                    height={132}
                    alt="first"
                    className="hover:scale-125"
                  />
                </div>
                <div>
                  <Image
                    src="/assets/third.png"
                    width={65}
                    height={105}
                    alt="third"
                    className="hover:scale-125"
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
