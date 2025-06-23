"use client";

import React, { useState, useEffect } from "react";
import {  Award, Coins, Lock, Check } from "lucide-react";
import Image from "next/image";
import { Star } from "../share/svg/Logo";
import Container from "../share/Container";

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
    // {
    //   id: 4,
    //   title: "DOPAMINE\nRECEPTOR GENE\nVARIATIONS",
    //   completed: false,
    //   current: false,
    //   locked: true,
    //   borderColor: "border-gray-500",
    // },
  ];

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  return (
    <Container className=" min-h-screen bg-black text-white mt-10  flex flex-col items-center justify-center">
      {/* Star and Number - Top Left */}
      <div className="">
        <div className="absolute hidden md:flex left-12 lg:left-36  items-center gap-3">
          <div className="relative">
            <Star />
          </div>
          <span className="font-bold text-white font-brush text-7xl">7</span>
        </div>

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

          <p className="text-gray-300 text-base max-w-xl">
            If you do not place an order within the time frame, your CM Points
            will reset!
          </p>
        </div>
      </div>

      {/* Countdown Section */}

      {/* Progress Steps */}
      <div className="relative w-full mb-20">
        {/* Progress Line */}
        <div className="absolute top-6 max-w-6xl mx-auto left-0 right-0 h-2 z-0">
          <div
            className="h-full "
            style={{
              background: "linear-gradient(to right, #FFFFFF, #181818)",
            }}
          ></div>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-2 lg:grid-cols-5 z-10 flex-wrap sm:flex-nowrap">
          {progressSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center mb-8 sm:mb-0 relative"
            >
              {/* Add left and right borders to the second card */}
              {index === 0 && (
                <>
                  {/* Left Border */}
                  <div className="absolute left-1/2 h-6   top-12 w-[2px] bg-white z-10"></div>
                </>
              )}
              {index === 1 && (
                <>
                  {/* Left Border */}
                  <div className="absolute left-[-1px] h-5 rotate-90 top-3/5 bottom-0 w-[2px] bg-white z-10"></div>
                  {/* Right Border */}
                  <div className="absolute right-[-1px] h-5 rotate-90 top-3/5 bottom-0 w-[2px] bg-white z-10"></div>
                </>
              )}

              {/* Step Circle */}
              <div
                className={`w-16 h-16 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center mb-6 bg-black
        ${
          step.completed
            ? "border-white bg-white"
            : step.current
            ? "border-cyan-400"
            : step.locked
            ? "border-gray-500"
            : "border-gray-600"
        }`}
              >
                {step.completed ? (
                  <Check className="w-8 h-8 text-black sm:w-6 sm:h-6" />
                ) : step.current ? (
                  <div className="w-4 h-4 bg-cyan-400 rounded-full sm:w-3 sm:h-3"></div>
                ) : (
                  <Lock
                    className={`w-8 h-8 sm:w-6 sm:h-6 ${
                      step.locked ? "text-gray-500" : "text-gray-600"
                    }`}
                  />
                )}
              </div>

              {/* Step Content Box */}
              <div
                className={`border-2 rounded-lg p-6 sm:p-4 lg:w-[282px] lg:h-[148px] w-48 h-24 text-center ${
                  step.completed
                    ? "border-white"
                    : step.current
                    ? "border-cyan-400"
                    : step.id === 3
                    ? "border-yellow-500"
                    : "border-gray-500"
                } bg-black`}
              >
                <h3 className="text-white font-bold text-sm sm:text-xs lg:text-2xl leading-tight whitespace-pre-line tracking-wide">
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
    </Container>
  );
};

export default CountdownProgressTracker;
