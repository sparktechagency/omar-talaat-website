"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "../share/UserProvider";
import { getUserStyles } from "../share/utils/userStyles";

const Banner = () => {
    const { userType } = useUser();
    const { bg, text, button } = getUserStyles(userType);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    // Set target date to January 10th (you can adjust this)
    const targetDate = new Date("2025-01-10T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          mins: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          secs: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

    const formatTime = (time) => time.toString().padStart(2, "0");
    
    // {`min-h-screen p-6 ${bg} ${text}`}

  return (
    <div className={`relative min-h-screen ${bg}  overflow-hidden`}>
      {/* Coral Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/banner-bg.png')`,
          }}
        ></div>
      </div>

      {/* Coral Polyp Circles */}
      {/* <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full border-2 ${
              i % 3 === 0
                ? "border-green-400"
                : i % 3 === 1
                ? "border-blue-400"
                : "border-purple-400"
            } opacity-30`}
            style={{
              width: `${Math.random() * 60 + 40}px`,
              height: `${Math.random() * 60 + 40}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: "translate(-50%, -50%)",
              animation: `pulse ${
                2 + Math.random() * 3
              }s ease-in-out infinite alternate`,
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500/20 via-blue-500/20 to-purple-500/20"></div>
          </div>
        ))}
      </div> */}

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          {/* <div className="flex items-center justify-center mb-4">
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="text-white"
              fill="currentColor"
            >
              <path
                d="M50 10 C30 10, 20 25, 25 45 C20 50, 25 60, 35 55 C40 65, 60 65, 65 55 C75 60, 80 50, 75 45 C80 25, 70 10, 50 10 Z"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
              <path d="M35 35 C40 30, 45 35, 40 40 C35 45, 30 40, 35 35 Z" />
              <path d="M60 35 C65 30, 70 35, 65 40 C60 45, 55 40, 60 35 Z" />
              <path d="M45 50 C50 45, 55 50, 50 55 C45 60, 40 55, 45 50 Z" />
            </svg>
          </div> */}
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-2"
            style={{ fontFamily: "cursive" }}
          >
            Coral Stash
          </h1>
        </div>

        {/* Announcement */}
        <p className="text-white/90 text-lg mb-2">
          Deliveries commence January 10th
        </p>
        <p className="text-white/80 text-base mb-8 max-w-2xl">
          We deliver to all emirates in the UAE - we accept trades - we accept
          new suppliers
        </p>

        {/* Shop Now Button */}
        <Button
          size="lg"
          className="bg-white text-primary hover:bg-white/90 mb-12 px-8 py-3 text-lg font-semibold rounded-full"
        >
          Shop Now
        </Button>

        {/* Countdown Timer */}
        <div className="flex items-center justify-center space-x-8 mb-12">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-1">
              {formatTime(timeLeft.days)}
            </div>
            <div className="text-white/70 text-sm uppercase tracking-wider">
              Days
            </div>
          </div>
          <div className="text-white text-3xl">:</div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-1">
              {formatTime(timeLeft.hours)}
            </div>
            <div className="text-white/70 text-sm uppercase tracking-wider">
              Hours
            </div>
          </div>
          <div className="text-white text-3xl">:</div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-1">
              {formatTime(timeLeft.mins)}
            </div>
            <div className="text-white/70 text-sm uppercase tracking-wider">
              Mins
            </div>
          </div>
          <div className="text-white text-3xl">:</div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-white mb-1">
              {formatTime(timeLeft.secs)}
            </div>
            <div className="text-white/70 text-sm uppercase tracking-wider">
              Secs
            </div>
          </div>
        </div>

        {/* Discount Offers */}
        <div className="space-y-4 w-full max-w-2xl">
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4">
            <span className="text-white font-medium">
              10% Off for orders AED600 or above
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Get Code
            </Button>
          </div>
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4">
            <span className="text-white font-medium">
              15% Off of orders AED1000 or above
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Get Code
            </Button>
          </div>
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-4">
            <span className="text-white font-medium">
              20% Off of orders AED1300 or above
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
            >
              Get Code
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0.6;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Banner;
