"use client"

import React, { useState, useEffect } from "react";
import { Calendar, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function CountdownProgressTracker() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59
      );
      const difference = endOfMonth.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className=" mx-auto">
        {/* Header with Calendar Icon */}
        <div className="flex items-center mb-12">
          <div className="relative">
            <Calendar className="w-12 h-12 text-white" />
            <div className="absolute -bottom-1 -right-1 bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              7
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="text-center">
              <div className="text-6xl font-bold">
                {formatTime(timeLeft.days)}
              </div>
              <div className="text-gray-400 text-sm">Days</div>
            </div>
            <div className="text-6xl font-bold">:</div>
            <div className="text-center">
              <div className="text-6xl font-bold">
                {formatTime(timeLeft.hours)}
              </div>
              <div className="text-gray-400 text-sm">Hours</div>
            </div>
            <div className="text-6xl font-bold">:</div>
            <div className="text-center">
              <div className="text-6xl font-bold">
                {formatTime(timeLeft.minutes)}
              </div>
              <div className="text-gray-400 text-sm">Mins</div>
            </div>
            <div className="text-6xl font-bold">:</div>
            <div className="text-center">
              <div className="text-6xl font-bold">
                {formatTime(timeLeft.seconds)}
              </div>
              <div className="text-gray-400 text-sm">Secs</div>
            </div>
            <ChevronUp className="w-8 h-8 text-gray-400 ml-4" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Until the month is over</h1>
          <p className="text-gray-400 text-lg">
            If you do not place an order within the time frame, your CM Points
            will reset!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="relative mt-16">
          {/* Progress Line */}
          <div className="absolute top-8 left-0 w-full h-1 bg-gray-700">
            <div className="h-full bg-white w-1/4"></div>
          </div>

          {/* Step Items */}
          <div className="flex justify-between items-start relative">
            {/* Step 1 - Completed */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 relative z-10">
                <svg
                  className="w-8 h-8 text-black"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Card className="bg-black border-white border-2 p-6 text-center min-w-[280px]">
                <h3 className="text-white font-bold text-lg leading-tight">
                  DOPAMINE
                  <br />
                  RECEPTOR GENE
                  <br />
                  VARIATIONS
                </h3>
              </Card>
            </div>

            {/* Step 2 - Current */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4 relative z-10">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <Card className="bg-black border-cyan-400 border-2 p-6 text-center min-w-[280px]">
                <h3 className="text-white font-bold text-lg leading-tight">
                  DOPAMINE
                  <br />
                  RECEPTOR GENE
                  <br />
                  VARIATIONS
                </h3>
              </Card>
            </div>

            {/* Step 3 - Locked */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4 relative z-10">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Card className="bg-black border-yellow-500 border-2 p-6 text-center min-w-[280px]">
                <h3 className="text-white font-bold text-lg leading-tight">
                  DOPAMINE
                  <br />
                  RECEPTOR GENE
                  <br />
                  VARIATIONS
                </h3>
              </Card>
            </div>

            {/* Step 4 - Locked */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-600 flex items-center justify-center mb-4 relative z-10">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
