"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "../share/UserProvider";
import { getUserStyles } from "../share/utils/userStyles";
import { MainLogo } from "../share/svg/Logo";

const Banner = () => {
    const { userType } = useUser();
    const { bg, text, border, logo, buttonBg, buttonText } =
      getUserStyles(userType);
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
    <div className={`h-[1222px] mt-40 ${bg}  overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/assets/banner-bg.png')`,
          }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="mb-8">
          <MainLogo
            className="w-[168px] h-[182px] mx-auto mb-6"
            color={`${logo}`}
          />
          <h1 className="text-5xl md:text-6xl font-bold font-brush text-white mb-10">
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
          <div className="flex items-center justify-between bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 h-[67px] py-4">
            <span className="text-white font-medium">
              10% Off for orders AED600 or above
            </span>
            <Button
              variant="outline"
              size="sm"
              className="bg-transparent border-white rounded-3xl text-white hover:bg-white hover:text-primary"
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
              className="bg-transparent rounded-3xl border-white text-white hover:bg-white hover:text-primary"
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
              className="bg-transparent border-white text-white hover:bg-white rounded-3xl hover:text-primary"
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
