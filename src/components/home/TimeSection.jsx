"use client";

import React, { useState, useEffect } from "react";
import { Star, Award, Coins, Lock, Check } from "lucide-react";
import Image from "next/image";

const CountdownProgressTracker = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  const progressSteps = [
    {
      id: 1,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: true,
      current: false,
      locked: false,
      borderColor: "border-white",
    },
    {
      id: 2,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: false,
      current: true,
      locked: false,
      borderColor: "border-cyan-400",
    },
    {
      id: 3,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: false,
      current: false,
      locked: true,
      borderColor: "border-yellow-500",
    },
    {
      id: 4,
      title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
      completed: false,
      current: false,
      locked: true,
      borderColor: "border-gray-500",
    },
  ];

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
      {/* Star and Number - Top Left */}
      <div className="absolute top-8 left-8 flex items-center gap-3">
        <div className="relative">
          <Star className="w-10 h-10 fill-green-400 text-green-400" />
        </div>
        <span className="text-4xl font-bold text-white">7</span>
      </div>

      {/* Countdown Section */}
      <div className="text-center mb-16">
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

        <p className="text-gray-300 text-base max-w-xl">
          If you do not place an order within the time frame, your CM Points
          will reset!
        </p>
      </div>

      {/* Progress Steps */}
      <div className="relative w-full max-w-5xl mb-20">
        {/* Progress Line */}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-600 z-0">
          <div className="h-full bg-white w-1/4"></div>
        </div>

        {/* Steps */}
        <div className="relative flex justify-between items-start z-10">
          {progressSteps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              {/* Step Circle */}
              <div
                className={`
                w-12 h-12 rounded-full border-2 flex items-center justify-center mb-6 bg-black
                ${
                  step.completed
                    ? "border-white bg-white"
                    : step.current
                    ? "border-cyan-400"
                    : step.locked
                    ? "border-gray-500"
                    : "border-gray-600"
                }
              `}
              >
                {step.completed ? (
                  <Check className="w-6 h-6 text-black" />
                ) : step.current ? (
                  <div className="w-3 h-3 bg-cyan-400 rounded-full"></div>
                ) : (
                  <Lock
                    className={`w-6 h-6 ${
                      step.locked ? "text-gray-500" : "text-gray-600"
                    }`}
                  />
                )}
              </div>

              {/* Step Content Box */}
              <div
                className={`
                border-2 rounded-lg p-6 w-56 text-center
                ${
                  step.completed
                    ? "border-white"
                    : step.current
                    ? "border-cyan-400"
                    : step.id === 3
                    ? "border-yellow-500"
                    : "border-gray-500"
                }
                bg-black
              `}
              >
                <h3 className="text-white font-bold text-sm leading-tight whitespace-pre-line tracking-wide">
                  {step.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Rewards Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-8">Monthly Rewards</h2>

        <div className="flex items-center justify-center gap-6 mb-8">
          {/* Silver Medal */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="">
                <Image
                  src="/assets/second.png"
                  width={100}
                  height={100}
                  alt="second"
                />
              </div>
            </div>
          </div>

          {/* Gold Medal */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="">
                <Image
                  src="/assets/first.png"
                  width={100}
                  height={100}
                  alt="second"
                />
              </div>
            </div>
          </div>

          {/* Bronze Medal */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="">
                <Image
                  src="/assets/third.png"
                  width={100}
                  height={100}
                  alt="second"
                />
              </div>
            </div>
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
  );
};

export default CountdownProgressTracker;
