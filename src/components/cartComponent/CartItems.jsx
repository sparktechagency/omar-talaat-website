"use client";
import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { MdOutlineModeEdit } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { getImageUrl } from "../share/imageUrl";
import { getUserPlan } from "../share/utils/getUserPlan";
import { toast } from "sonner";
import styles from "./cartComponent.module.css";

const CartItems = ({ 
  cartItems, 
  cartSubtotal, 
  onQuantityChange, 
  onRemoveItem, 
  walletData 
}) => {
  const { plan, classes, svgColor, iconColor } = getUserPlan(walletData);
  
  // Progress bar calculation
  const freeDeliveryThreshold = 1000;
  const progressPercentage = Math.min(
    (cartSubtotal / freeDeliveryThreshold) * 100,
    100
  );
  const remainingAmount = Math.max(freeDeliveryThreshold - cartSubtotal, 0);

  // Description truncation logic with "See More/See Less"
  const DescriptionWithToggle = ({ description }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const truncatedDescription = description?.slice(0, 100);
    const fullDescription = description;

    return (
      <div className="relative ">
        <p className="text-sm lg:text-sm mb-2 ">
          {isExpanded ? fullDescription : truncatedDescription}
          ...
          {description?.length > 100 && (
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

  return (
    <div className="space-y-4 lg:space-y-8">
      {/* Header */}
      <div className="flex items-center justify-center gap-2  lg:mb-8 lg:col-span-12">
        <div className={styles.imageWithBubbles}>
          <Image
            src="/assets/image 10.png"
            width={105}
            height={105}
            alt="Logo"
            className="w-20 h-20 lg:w-[105px] lg:h-[105px]"


          />
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium">
          Your Stash
        </h1>
        <div className="w-6 h-6 lg:hidden"></div>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        <div className="opacity-15">
          <hr className="" />
        </div>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="space-y-3">
              <div className="flex items-center space-x-2  rounded-lg p-2">

                {/* Image on the left side */}
                <div>
                  <Image
                    src={getImageUrl(item.images[0])}
                    alt={item.name}
                    height={60}
                    width={60}
                    className="rounded-full lg:w-[80px] lg:h-[80px] w-[40px] h-[40px]"
                  />
                </div>

                {/* Content on the right side */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3 ">
                  <div className="lg:w-[585px] w-full">
                    {/* Title */}
                    <h3 className="font-medium hidden lg:block text-sm lg:text-base mb-1">
                      {item.name}
                    </h3>
                    <h3 className="font-medium text-sm lg:hidden lg:text-base mb-1">
                      {item.name.slice(0, 15)}
                    </h3>
                    {/* Description */}
                    <div className="hidden lg:block">
                      <DescriptionWithToggle description={item.description} />
                    </div>
                  </div>
                </div>

                <div className="flex lg:gap-40 gap-2 items-center justify-between mt-2">
                  <div className={`${classes.border} flex lg:w-[187px] w-full border h-8 lg:h-12 justify-between rounded-full items-center space-x-`}>
                    {/* Quantity controls */}
                    <div className={`${classes.inner} rounded-full flex items-center justify-center`}>
                      <button
                        onClick={() => onQuantityChange(item._id || item.id, -1)}
                        className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer rounded-full flex items-center justify-center hover: transition-colors"
                      >
                        <Minus size={12} className="lg:w-4 lg:h-4" />
                      </button>
                      <span className="text-sm lg:text-base min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onQuantityChange(item._id || item.id, 1)}
                        className="w-6 h-6 lg:w-8 lg:h-8 cursor-pointer rounded-full flex items-center justify-center hover: transition-colors"
                      >
                        <Plus size={12} className="lg:w-4 lg:h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 lg:space-x-1">
                    {/* Price - now shows total for this item */}
                    <div>
                      <span className="font-medium lg:text-xl">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Edit button */}
                  <div className="flex items-center space-x-1 lg:space-x-1">
                    {/* <button className={`cursor-pointer transition-colors ${iconColor}`}>
                      <MdOutlineModeEdit size={24} className={`w-5 h-5 lg:w-7 lg:h-7 `} />
                    </button> */}

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item._id || item.id)}
                      className=" cursor-pointer transition-colors"
                    >
                      <RxCross2 size={24} className="w-5 h-5 lg:w-7 lg:h-7" />

                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="opacity-15">
          <hr className="" />
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="group">
        <div className="flex justify-between items-center mb-10">
          {/* Optional heading and progress value */}
        </div>

        <div className={`w-full ${classes.border} rounded-full h-[30px] m-2`}>
          <div
            className={`${classes.bg} h-[28px] rounded-full transition-all duration-500`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {cartSubtotal >= freeDeliveryThreshold ? (
          <p className="text-white text-sm font-medium">
            🎉 Congratulations! You've qualified for free delivery!
          </p>
        ) : (
          <div className="flex gap-2">
            <p className="text-sm flex h-6">
              Spend{" "}
              <span className=" w-25 ml-3 transition-all duration-300 group-hover:scale-115 group-hover:font-bold  ">
                AED ${remainingAmount.toFixed(2)}
              </span>{" "}
              more and get free shipping! (Free shipping is from AED 1000).
            </p>
          </div>
        )}
      </div>

      {/* Additional Corals Section */}
      <div className="flex justify-center items-center space-y-7 mt-8 lg:mt-16">
        <div className={`w-24 h-24 lg:w-36 lg-h-36 `}>
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
        <div>
          <h2 className="text-center text-xl md:text-xl lg:text-5xl xl:text-[56px] lg:font-bold mb-3 lg:mb-5">
            You Can Fit Up To 4 More Corals
          </h2>
          <p className="text-[14px] text-center">
            For No Additional Delivery Charge, You can Add More Corals to your Stash!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItems;