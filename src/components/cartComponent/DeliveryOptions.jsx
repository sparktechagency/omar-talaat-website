"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { LeftSideArrow, RightSideArrow } from "../share/svg/Logo";
import { getUserPlan } from "../share/utils/getUserPlan";
import { useApplyPromoCodeMutation } from "@/redux/featured/cart/cartPageApi";
import { toast } from "sonner";

const DeliveryOptions = ({
  cartSubtotal,
  deliveryType,
  setDeliveryType,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  orderNumber,
  setOrderNumber,
  promoCode,
  setPromoCode,
  promoCodeData,
  setPromoCodeData,
  discountAmount,
  setDiscountAmount,
  calendarMonth,
  setCalendarMonth,
  calendarYear,
  setCalendarYear,
  walletData
}) => {
  const { plan, classes, svgColor, iconColor } = getUserPlan(walletData);
  const [applyPromoCode, { isLoading: isPromoLoading }] = useApplyPromoCodeMutation();
  
  const deliveryCharge = cartSubtotal >= 1000 ? 0 : 10;
  const freeDeliveryThreshold = 1000;

  // Get current date info
  const today = new Date();
  const currentDate = today.getDate();
  const currentMonthIndex = today.getMonth();
  const currentYear = today.getFullYear();

  // Handle promo code application
  const handlePromoCodeApply = () => {
    if (promoCode.trim()) {
      applyPromoCode({ promoCode: promoCode.trim() })
        .unwrap()
        .then((response) => {
          if (response.data?.valid && response.data?.claim) {
            const { claim } = response.data;
            
            // Check if promo code is not used and is claimed
            if (!claim.isUsed && claim.status === "claimed") {
              const { percentageOff } = claim.promoCodeId;
              const discount = (cartSubtotal * percentageOff) / 100;
              setDiscountAmount(discount);
              setPromoCodeData(claim);
              toast.success(response.data.message || "Promo code applied successfully!");
            } else if (claim.isUsed) {
              toast.error("This promo code has already been used");
            } else {
              toast.error("This promo code is not valid for use");
            }
          } else {
            toast.error(response.data?.message || 'Invalid promo code');
          }
        })
        .catch((error) => {
          console.error("Promo code error:", error);
          toast.error(error.data?.message || 'Failed to apply promo code');
        });
    } else {
      toast.error('Please enter a promo code');
    }
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentMonth = monthNames[calendarMonth];
  const currentYearDisplay = calendarYear.toString();
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();

  const calendarDays = [];
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  // Add empty cells for days after the end of the month to complete the grid
  const totalCells = Math.ceil((firstDayOfMonth + daysInMonth) / 7) * 7;
  const emptyCellsAtEnd = totalCells - (firstDayOfMonth + daysInMonth);
  for (let i = 0; i < emptyCellsAtEnd; i++) {
    calendarDays.push(null);
  }

  // Check if we can go to previous month (only if we're not in current month)
  const canGoToPreviousMonth = () => {
    // If we're viewing current month and current year, disable previous
    if (calendarYear === currentYear && calendarMonth === currentMonthIndex) {
      return false;
    }
    // Otherwise, we can go to previous month (as long as it doesn't go past current month)
    return true;
  };

  // Check if a day is selectable (only future dates from tomorrow)
  const isDaySelectable = (day) => {
    if (!day) return false;
    
    // If viewing current month and year
    if (calendarYear === currentYear && calendarMonth === currentMonthIndex) {
      return day > currentDate; // Only days after today
    }
    
    // If viewing future months/years, all days are selectable
    if (calendarYear > currentYear || 
        (calendarYear === currentYear && calendarMonth > currentMonthIndex)) {
      return true;
    }
    
    // Past months are not selectable
    return false;
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    if (!canGoToPreviousMonth()) return;
    
    let newMonth = calendarMonth;
    let newYear = calendarYear;
    
    if (calendarMonth === 0) {
      newMonth = 11;
      newYear = calendarYear - 1;
    } else {
      newMonth = calendarMonth - 1;
    }
    
    // Don't go past current month
    if (newYear < currentYear || (newYear === currentYear && newMonth < currentMonthIndex)) {
      return;
    }
    
    setCalendarMonth(newMonth);
    setCalendarYear(newYear);
    setSelectedDate(null);
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setSelectedDate(null);
  };

  return (
    <div className="flex lg:gap-32 md:gap-8 flex-col lg:flex-row justify-between w-full">
      <div className="lg:w-5/8 w-full">
        {/* Promo Code */}
        <div className="mb-4 lg:mb-10">
          <div className="flex space-x-6 lg:w-3/5 w-full">
            <div className={`flex-1 rounded-full ${classes.border}`}>
              <div className={`${classes.inner} rounded-full flex items-center pl-8`}>
                <input
                  type="text"
                  placeholder="Enter promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className={`w-full bg-transparent text-sm lg:text-base placeholder-gray-500 focus:outline-none`}
                />
              </div>
            </div>
            <button
              onClick={handlePromoCodeApply}
              disabled={isPromoLoading}
              className={`${classes.border} rounded-2xl font-medium transition-colors`}
            >
              <div className={`${classes.inner} rounded-2xl px-4 py-1 lg:px-6 lg:py-2`}>
                {isPromoLoading ? 'Applying...' : 'Apply Promo Code'}
              </div>
            </button>
          </div>
        </div>

        <h2 className="text-lg font-medium lg:text-xl mb-4">Delivery Options</h2>
        <div className="space-y-4">
          <div className="lg:space-y-5 space-y-2 mb-5 lg:mb-8 ">
            {/* Radio Buttons */}
            <label className={`flex items-center space-x-3 ${classes.border} rounded-2xl h-12 lg:h-16 cursor-pointer transition-colors`}>
              <div className={`${classes.inner} rounded-2xl flex items-center gap-2 pl-10`}>
                <input
                  type="radio"
                  name="delivery"
                  value="Standard Delivery"
                  checked={deliveryType === "Standard Delivery"}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className={` text-orange-500 w-4 h-4 lg:w-5 lg:h-5`}
                />
                <span className="text-sm lg:text-base">
                  Standard Delivery{" "}
                  {cartSubtotal >= freeDeliveryThreshold
                    ? "(FREE)"
                    : `(AED ${deliveryCharge})`}
                </span>
              </div>
            </label>

            <label className={`flex items-center space-x-3 ${classes.border} rounded-2xl h-12 lg:h-16 cursor-pointer transition-colors`}>
              <div className={`${classes.inner} rounded-2xl flex items-center gap-2 pl-10`}>
                <input
                  type="radio"
                  name="delivery"
                  value="Free Delivery"
                  checked={deliveryType === "Free Delivery"}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                  disabled={cartSubtotal < freeDeliveryThreshold}
                />
                <span className={`text-sm lg:text-base ${
                  cartSubtotal < freeDeliveryThreshold ? "text-gray-500" : ""
                }`}>
                  Free Delivery{" "}
                  {cartSubtotal < freeDeliveryThreshold
                    ? "(Minimum AED 1000 required)"
                    : "(Qualified!)"}
                </span>
              </div>
            </label>

            <label className={`flex items-center ${classes.border} rounded-2xl h-12 lg:h-16 cursor-pointer transition-colors`}>
              <div className={`${classes.inner} rounded-2xl flex items-center gap-2 pl-10`}>
                <input
                  type="radio"
                  name="delivery"
                  value="Add To Previous Order"
                  checked={deliveryType === "Add To Previous Order"}
                  onChange={(e) => setDeliveryType(e.target.value)}
                  className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                />
                <span className="text-sm lg:text-base">Add To Previous Order</span>
              </div>
            </label>

            {/* Order Number Input */}
            <div>
              <label htmlFor="orderNumber" className="text-sm lg:text-base text-gray-400">
                Enter Previous Order Number:
              </label>
              <div className=" flex items-center gap-6 lg:w-2/3 w-full">
                <div className={`w-full mt-[10px] ${classes.border} rounded-2xl h-10 lg:h-12`}>
                  <div className={`${classes.inner} rounded-2xl flex items-center pl-8 `}>
                    <input
                      type="text"
                      id="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      className={`w-full bg-transparent text-sm lg:text-base placeholder-gray-500 focus:outline-none`}
                      placeholder="Enter your previous order number"
                    />
                  </div>
                </div>
                <Button className="h-[42px] px-10 mt-[10px]">Submit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="lg:w-3/8 w-full">
        <div className="flex items-center justify-between lg:mb-4 mb-">
          <h3 className="text-lg lg:font-bold lg:text-[22px] text-[16px] font-medium">
            Select Delivery Date
          </h3>
          <div className="flex items-center space-x-4 lg:space-x-2">
            <div className="flex items-center space-x-3 lg:space-x-2">
              <span className="text-lg lg:font-bold lg:text-[22px] text-[16px] font-medium">
                {currentMonth}
              </span>
              <span className="text-lg lg:font-bold lg:text-[22px] text-[16px] font-medium">
                {currentYearDisplay}
              </span>
            </div>
            <div className="flex items-center ">
              <button
                onClick={goToPreviousMonth}
                disabled={!canGoToPreviousMonth()}
                className={`transition-colors p-1 ${
                  canGoToPreviousMonth() 
                    ? "text-gray-400 hover:text-white" 
                    : "text-gray-600 cursor-not-allowed opacity-50"
                }`}
              >
                <LeftSideArrow />
              </button>
              <button
                onClick={goToNextMonth}
                className="text-white hover:text-white transition-colors p-1"
              >
                <RightSideArrow />
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-lg px-4 lg:p-0">
          <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-4">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="text-center text-xs lg:text-lg font-bold py-3">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => {
              const isSelectable = isDaySelectable(day);
              return (
                <button
                  key={index}
                  onClick={() => isSelectable && setSelectedDate(day)}
                  className={`h-8 w-8 lg:h-12 lg:w-12 text-xs lg:text-sm rounded border-2 font-bold transition-colors flex items-center justify-center ${
                    day
                      ? isSelectable
                        ? day === selectedDate
                          ? `${classes.bg} text-black border-white`
                          : `text-white ${classes.border2} hover:${classes.bg} rounded-lg hover:text-white cursor-pointer`
                        : `text-gray-500 ${classes.border2} cursor-not-allowed rounded-lg opacity-50`
                      : `${classes.border2} cursor-default`
                  }`}
                  disabled={!isSelectable}
                >
                  {day ? day : ""}
                </button>
              );
            })}
          </div>

          {/* Time Selection */}
          <div>
            <h2 className="text-sm lg:text-base font-medium mb-2">
              Select Delivery Time
            </h2>
            <div className="flex items-center justify-between gap-6">
              <button
                onClick={() => setSelectedTime("8am-9pm")}
                className={`relative px-3 py-2 lg:px-4 lg:py-3 w-1/2 text-sm lg:text-base transition-colors ${
                  classes.border2
                } ${
                  selectedTime === "8am-9pm"
                    ? "text-white"
                    : "text-white hover:"
                }`}
              >
                <span
                  className={`absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 border-2 ${
                    classes.border2
                  } ${selectedTime === "8am-9pm" ? classes.bg : ""}`}
                ></span>
                8am-9pm
              </button>

              <button
                onClick={() => setSelectedTime("9am-10pm")}
                className={`relative px-3 py-2 lg:px-4 w-1/2 lg:py-3 text-sm lg:text-base transition-colors ${
                  classes.border2
                } ${
                  selectedTime === "9am-10pm"
                    ? "text-white"
                    : "text-white hover:"
                }`}
              >
                <span
                  className={`absolute top-1/2 left-2 transform -translate-y-1/2 w-5 h-5 border-2 ${
                    classes.border2
                  } ${selectedTime === "9am-10pm" ? classes.bg : ""}`}
                ></span>
                9am-10pm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;