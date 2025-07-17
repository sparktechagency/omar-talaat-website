"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Container from "../share/Container";
import { Button } from "../ui/button";
import styles from "./cartComponent.module.css";
import DoaFormModal from "../doaForm/DoaFormModal";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "CS Purple Hornets Zenithids",
      description:
        "Extra color, bring the food and everything, We recommend a spelling level of 2 meals. Spicy delivery Res HamsExtra color, bring the food and everything, We recommend a spelling level of 2 meals. Spicy delivery Res Hams ...",
      price: 99,
      quantity: 1,
      image: "/assets/category1.png",
    },
    {
      id: 2,
      name: "CS Purple Hornets Zenithids",
      description:
        "Extra color, bring the food and everything, We recommend a spelling level of 2 meals. Spicy delivery Res Hams...",
      price: 99,
      quantity: 1,
      image: "/assets/category4.png",
    },
  ]);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("8am-9pm");
  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [comments, setComments] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  // Calendar setup with dynamic month/year
  const currentDate = new Date();
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[calendarMonth];
  const currentYear = calendarYear.toString();

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

  // Description truncation logic with "See More/See Less"
  const DescriptionWithToggle = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedDescription = description.slice(0, 100);
    const fullDescription = description;

    return (
      <div className="relative">
        <p className="text-xs lg:text-sm mb-2">
          {isExpanded ? fullDescription : truncatedDescription}
          ...
          {description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="font-bold hover:underline"
            >
              {isExpanded ? "See Less" : "See More"}
            </button>
          )}
        </p>
      </div>
    );
  };

  // Navigation functions
  const goToPreviousMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
    setSelectedDate(null); // Reset selected date when changing month
  };

  const goToNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
    setSelectedDate(null); // Reset selected date when changing month
  };

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discount = 50;
  const deliveryCharge = subtotal >= 1000 ? 0 : 10; // Free delivery if subtotal >= 1000
  const total = subtotal - discount + deliveryCharge;

  // Progress bar calculation
  const freeDeliveryThreshold = 1000;
  const progressPercentage = Math.min(
    (subtotal / freeDeliveryThreshold) * 100,
    100
  );
  const remainingAmount = Math.max(freeDeliveryThreshold - subtotal, 0);

  return (
    <Container className="text-white p-3 sm:p-4 lg:p-8 mx-auto">
      <div>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-6 lg:mb-8">
          <div className={styles.imageWithBubbles}>
            <Image
              src="/assets/image 10.png"
              width={80}
              height={80}
              alt="Logo"
              className="w-16 h-16 sm:w-20 sm:h-20 lg:w-[105px] lg:h-[105px]"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-medium">
            Your Stash
          </h1>
        </div>

        <div>
          {/* Cart Items */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="opacity-15">
              <hr />
            </div>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 rounded-lg p-3 lg:p-4">
                    {/* Image */}
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        height={80}
                        width={80}
                        className="rounded-full w-16 h-16 sm:w-20 sm:h-20 lg:w-[80px] lg:h-[80px]"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 w-full">
                      <div className="w-full sm:w-auto">
                        {/* Title */}
                        <h3 className="font-medium text-sm lg:text-base mb-1 text-center sm:text-left">
                          {item.name}
                        </h3>
                        {/* Description */}
                        <DescriptionWithToggle description={item.description} />
                      </div>

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 lg:gap-10 mt-2 w-full justify-between">
                        {/* Quantity controls */}
                        <div className="flex w-[150px] sm:w-[180px] border px-2 sm:px-3 justify-between py-1 rounded-full items-center">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                          >
                            <Minus size={12} className="lg:w-4 lg:h-4" />
                          </button>
                          <span className="text-sm lg:text-base min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer rounded-full flex items-center justify-center transition-colors"
                          >
                            <Plus size={12} className="lg:w-4 lg:h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div>
                          <span className="font-medium text-xl sm:text-2xl lg:text-3xl">
                            ${item.price * item.quantity}
                          </span>
                        </div>

                        {/* Edit/Delete buttons */}
                        <div className="flex items-center gap-2 sm:gap-4">
                          <button className="cursor-pointer transition-colors">
                            <MdOutlineModeEdit
                              size={20}
                              className="sm:w-5 sm:h-5 lg:w-7 lg:h-7"
                            />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="cursor-pointer transition-colors"
                          >
                            <RxCross2
                              size={20}
                              className="sm:w-5 sm:h-5 lg:w-7 lg:h-7"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="opacity-15">
              <hr />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="group my-4 sm:my-6">
            <div className="w-full border rounded-full h-[20px] sm:h-[25px] lg:h-[30px] mb-2">
              <div
                className="bg-white h-[18px] sm:h-[23px] lg:h-[28px] rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {subtotal >= freeDeliveryThreshold ? (
              <p className="text-white text-xs sm:text-sm font-medium">
                🎉 Congratulations! You've qualified for free delivery!
              </p>
            ) : (
              <div className="flex gap-2 flex-wrap">
                <p className="text-xs sm:text-sm flex items-center">
                  Spend{" "}
                  <span className="ml-1 sm:ml-2 transition-all duration-300 group-hover:font-bold">
                    AED ${remainingAmount}
                  </span>{" "}
                  more and get free shipping! (Free shipping is from AED 1000).
                </p>
              </div>
            )}
          </div>

          {/* Delivery Options */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 xl:gap-32 w-full mt-6">
            <div className="w-full lg:w-5/8">
              {/* Promo Code */}
              <div className="mb-6 sm:mb-10">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 w-full sm:w-4/5 lg:w-3/5">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 rounded-full border px-3 py-1 lg:px-4 lg:py-2 text-sm lg:text-base text-gray-400 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="border text-white px-4 py-1 lg:px-6 lg:py-2 rounded-lg font-medium transition-colors">
                    Apply Promo Code
                  </button>
                </div>
              </div>

              <h2 className="text-lg font-medium lg:text-xl mb-4">
                Delivery Options
              </h2>
              <div className="space-y-4">
                <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  {/* Radio Buttons */}
                  <label className="flex items-center space-x-3 border rounded-2xl p-3 lg:p-5 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="Standard Delivery"
                      checked={deliveryType === "Standard Delivery"}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                    />
                    <span className="text-sm lg:text-base">
                      Standard Delivery{" "}
                      {subtotal >= freeDeliveryThreshold
                        ? "(FREE)"
                        : `(AED ${deliveryCharge})`}
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 border rounded-2xl p-3 lg:p-5 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="Free Delivery"
                      checked={deliveryType === "Free Delivery"}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                      disabled={subtotal < freeDeliveryThreshold}
                    />
                    <span
                      className={`text-sm lg:text-base ${
                        subtotal < freeDeliveryThreshold ? "text-gray-500" : ""
                      }`}
                    >
                      Free Delivery{" "}
                      {subtotal < freeDeliveryThreshold
                        ? "(Minimum AED 1000 required)"
                        : "(Qualified!)"}
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 border rounded-lg p-3 lg:p-4 cursor-pointer transition-colors">
                    <input
                      type="radio"
                      name="delivery"
                      value="Add To Previous Order"
                      checked={deliveryType === "Add To Previous Order"}
                      onChange={(e) => setDeliveryType(e.target.value)}
                      className="text-orange-500 w-4 h-4 lg:w-5 lg:h-5"
                    />
                    <span className="text-sm lg:text-base">
                      Add To Previous Order
                    </span>
                  </label>

                  {/* Order Number Input */}
                  <div>
                    <label
                      htmlFor="orderNumber"
                      className="text-sm lg:text-base text-gray-400"
                    >
                      Enter Previous Order Number:
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-4/5 lg:w-2/3 mt-2">
                      <input
                        type="text"
                        id="orderNumber"
                        value={orderNumber}
                        onChange={(e) => setOrderNumber(e.target.value)}
                        className="w-full border text-white rounded-lg p-2 lg:p-2 text-sm lg:text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Enter your previous order number"
                      />

                      <Button className="h-[42px] px-6 sm:px-10 w-full sm:w-auto">
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="w-full lg:w-3/8 mt-6 lg:mt-0">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-medium lg:text-xl">
                  Select Delivery Date
                </h3>
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button
                    onClick={goToPreviousMonth}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    ←
                  </button>
                  <span className="text-xs sm:text-sm lg:text-base text-gray-400 min-w-[80px] sm:min-w-[120px] text-center">
                    {currentMonth} {currentYear}
                  </span>
                  <button
                    onClick={goToNextMonth}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                  >
                    →
                  </button>
                </div>
              </div>

              <div className="rounded-lg p-2 sm:p-4 lg:p-0">
                <div className="grid grid-cols-7 gap-1 lg:gap-2 mb-4">
                  {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
                    <div
                      key={idx}
                      className="text-center text-xs sm:text-sm lg:text-lg font-bold py-1 sm:py-2 lg:py-3"
                    >
                      {day}
                    </div>
                  ))}

                  {calendarDays.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(day)}
                      className={`h-6 sm:h-8 lg:h-10 text-xs lg:text-sm rounded border-2 font-bold transition-colors ${
                        day
                          ? day === selectedDate
                            ? "bg-white text-black"
                            : "text-white hover:bg-gray-700"
                          : "invisible" // makes unavailable days invisible
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Time Selection */}
                <div className="mt-4">
                  <h2 className="text-sm lg:text-base font-medium mb-2">
                    Select Delivery Time
                  </h2>
                  <div className="flex items-center justify-between gap-3 sm:gap-6">
                    <button
                      onClick={() => setSelectedTime("8am-9pm")}
                      className={`relative px-3 py-2 lg:px-4 lg:py-3 w-1/2 rounded-lg text-xs sm:text-sm lg:text-base transition-colors border ${
                        selectedTime === "8am-9pm"
                          ? "text-white"
                          : "text-white hover:"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 left-2 transform -translate-y-1/2 ${
                          selectedTime === "8am-9pm"
                            ? "bg-white"
                            : "border-2 border-white"
                        } rounded-full w-4 h-4 sm:w-5 sm:h-5`}
                      ></span>
                      <span className="ml-6">8am-9pm</span>
                    </button>

                    <button
                      onClick={() => setSelectedTime("9am-10pm")}
                      className={`relative px-3 py-2 lg:px-4 w-1/2 lg:py-3 rounded-lg text-xs sm:text-sm lg:text-base transition-colors border ${
                        selectedTime === "9am-10pm"
                          ? "text-white"
                          : "text-white hover:"
                      }`}
                    >
                      <span
                        className={`absolute top-1/2 left-2 transform -translate-y-1/2 ${
                          selectedTime === "9am-10pm"
                            ? "bg-white"
                            : "border-2 border-white"
                        } rounded-full w-4 h-4 sm:w-5 sm:h-5`}
                      ></span>
                      <span className="ml-6">9am-10pm</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Promotional banner */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-10 sm:mt-16">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 lg:w-36 lg:h-36`}>
              <div className={styles.imageWithBubbles}>
                <Image
                  src="/assets/image 10.png"
                  alt="Delivery Image"
                  width={150}
                  height={150}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-2">
                You Can Fit Up To 4 More Corals
              </h2>
              <p className="text-xs sm:text-sm">
                For No Additional Delivery Charge, You can Add More Corals to
                your Stash!
              </p>
            </div>
          </div>

          {/* My Information */}
          <div className="mt-8 sm:mt-10">
            <h3 className="text-lg font-medium lg:text-xl mb-4">
              My Information
            </h3>
            <div className="border rounded-lg p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm lg:text-base text-gray-400">
                <div>
                  <span className="text-white font-medium">
                    Delivery Address:
                  </span>
                  <br />
                  Street Lane 4 at Duhwon Korangi, Sector Karachi 8239
                </div>
                <div>
                  <span className="text-white font-medium">Phone Number:</span>
                  <br />
                  +920000000000
                </div>
                <div>
                  <span className="text-white font-medium">Email:</span>
                  <br />
                  contact@email.com
                </div>
                <div>
                  <span className="text-white font-medium">Time Location:</span>
                  <br />
                  {deliveryType === "Add To Previous Order"
                    ? "Previous Order Instructions"
                    : "Current Order Instructions"}
                </div>
                <div>
                  <span className="text-white font-medium">
                    Previous OrderId:
                  </span>
                  <br />
                  {orderNumber ? orderNumber : "No previous order selected"}
                </div>
              </div>
            </div>
          </div>

          {/* Comments and Order Summary */}
          <div className="mt-6 lg:mt-8">
            <div className="flex flex-col lg:flex-row gap-6 justify-center lg:gap-10 w-full">
              {/* Comments */}
              <div className=" w-[483px]">
                <h3 className="text-lg font-medium lg:text-xl mb-4">
                  Comments
                </h3>
                <div className="rounded-lg border p-4 lg:p-6">
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Write comment"
                    className="w-full h-32 lg:h-50 border rounded-lg p-3 lg:p-4 text-sm lg:text-base text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button className="mt-4 border border-red-500 text-white px-4 py-2 lg:px-6 lg:py-3 rounded-lg text-sm lg:text-base w-full transition-colors">
                    Submit With Order
                  </button>
                </div>
              </div>

              {/* Order Summary */}
              <div className=" w-[483px]">
                <h3 className="text-lg font-medium lg:text-xl mb-4">
                  Order Summary
                </h3>
                <div className="border rounded-lg p-4 lg:p-6">
                  <div className="space-y-3 text-sm lg:text-base">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quantity:</span>
                      <span className="text-white">
                        {cartItems.reduce(
                          (sum, item) => sum + item.quantity,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Amount:</span>
                      <span className="text-white">AED {subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Discount:</span>
                      <span className="text-green-400">-AED {discount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Delivery Charge:</span>
                      <span
                        className={`${
                          deliveryCharge === 0
                            ? "text-green-400"
                            : "text-white"
                        }`}
                      >
                        {deliveryCharge === 0
                          ? "FREE"
                          : `AED ${deliveryCharge}`}
                      </span>
                    </div>
                    <div className="border-t border-gray-700 pt-3">
                      <div className="flex justify-between text-lg lg:text-xl font-semibold">
                        <span className="text-white">Final Amount:</span>
                        <span className="text-orange-500">AED {total}</span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <DoaFormModal
                    showAcceptButton={true}
                    triggerComponent={
                      <button className="w-full mt-6 sm:mt-9 border border-red-500 text-white py-2 sm:py-3 lg:py-[10px] rounded-lg font-medium text-base lg:text-lg transition-colors">
                        Proceed To Checkout
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
