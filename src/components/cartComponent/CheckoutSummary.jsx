"use client";
import React from "react";
import DoaFormModal from "../doaForm/DoaFormModal";
import { getUserPlan } from "../share/utils/getUserPlan";

const CheckoutSummary = ({
  cartItems,
  cartSubtotal,
  discountAmount,
  deliveryCharge,
  total,
  deliveryType,
  selectedDate,
  selectedTime,
  comments,
  setComments,
  orderNumber,
  promoCodeData,
  calendarMonth,
  calendarYear,
  user,
  walletData
}) => {
  const { plan, classes, svgColor, iconColor } = getUserPlan(walletData);

  return (
    <div className="mt-6 lg:mt-0">
      {/* My Information */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-center lg:text-[40px] lg:font-bold mb-4">
          My Information
        </h3>
        <div className={`${classes.border} rounded-2xl `}>
          <div className={`${classes.inner} rounded-2xl p-4`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 text-sm lg:text-base text-gray-400">
              <div>
                <span className="text-white font-medium">Delivery Address:</span>
                <br />
                {user?.data?.address || "Street Lane 4 at Duhwon Korangi, Sector Karachi 8239"}
              </div>
              <div>
                <span className="text-white font-medium">Phone Number:</span>
                <br />
                {user?.data?.phone || "+920000000000"}
              </div>
              <div>
                <span className="text-white font-medium">Email:</span>
                <br />
                {user?.data?.email || "contact@email.com"}
              </div>
              <div>
                <span className="text-white font-medium">Time Location:</span>
                <br />
                {deliveryType === "Add To Previous Order"
                  ? "Previous Order Instructions"
                  : "Current Order Instructions"}
              </div>
              <div>
                <span className="text-white font-medium">Previous OrderId:</span>
                <br />
                {orderNumber ? orderNumber : "No previous order selected"}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10 justify-center w-full">
        {/* Comments */}
        <div className="lg:w-[550px] w-full">
          <h3 className="text-lg font-medium lg:text-[40px] lg:font-bold mb-6 text-center">
            Comments
          </h3>
          <div className={`rounded-lg ${classes.border} rounded-xl`}>
            <div className={`${classes.inner} rounded-xl h-5 lg:p-9 `}>
              <div className="">
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Write comment"
                  className={`w-full h-32 lg:h-67 border rounded-lg p-3 lg:p-4 text-sm lg:text-base text-white placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500`}
                />
              </div>
              <button
                className={`mt-12 border flex justify-center items-center text-white px-4 py-2 lg:px-5 lg:py-3 rounded-lg text-sm lg:text-[22px] w-1/2 mx-auto transition-colors`}
              >
                Submit With Order
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-[550px] w-full">
          <h3 className="text-lg font-medium lg:text-[40px] lg:font-bold mb-6 text-center">
            Sub Total
          </h3>
          <div className={`${classes.border} rounded-lg `}>
            <div className={`${classes.inner} p-4 lg:p-6 rounded-lg`}>
              <div className="space-y-3 text-sm lg:text-base">
                <div className="flex justify-between text-[22px] font-bold">
                  <span className="">Quantity:</span>
                  <span className="text-white">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-[22px] font-bold">
                  <span className="">Amount:</span>
                  <span className="text-white">AED {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[22px] font-bold">
                  <span className="">Discount:</span>
                  <span className={discountAmount > 0 ? "text-green-400" : "text-white"}>
                    {discountAmount > 0 ? `-AED ${discountAmount.toFixed(2)}` : 'No discount applied'}
                  </span>
                </div>
                {promoCodeData && (
                  <div className="flex justify-between text-[16px] text-green-400">
                    <span>Applied promo code:</span>
                    <span>{promoCodeData.promoCode} ({promoCodeData.promoCodeId.percentageOff}% off)</span>
                  </div>
                )}
                <div className="flex justify-between text-[22px] font-bold">
                  <span className="">Delivery Charge:</span>
                  <span className={`${
                    deliveryCharge === 0 ? "text-green-400" : "text-white"
                  }`}>
                    {deliveryCharge === 0 ? "FREE" : `AED ${deliveryCharge}`}
                  </span>
                </div>
                <div className="border-t border-gray-600 pt-2">
                  <div className="flex justify-between text-[22px] font-bold text-lg">
                    <span className="text-white">Final Amount:</span>
                    <span className="text-white">AED {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              {/* Checkout Button */}
              <DoaFormModal
                showAcceptButton={true}
                cartItems={cartItems}
                cartSubtotal={cartSubtotal}
                discountAmount={discountAmount}
                deliveryCharge={deliveryCharge}
                total={total}
                deliveryType={deliveryType}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                comments={comments}
                orderNumber={orderNumber}
                promoCodeData={promoCodeData}
                calendarMonth={calendarMonth}
                calendarYear={calendarYear}
                triggerComponent={
                  <div 
                    className="w-full mt-9 p-[5px] rounded-lg bg-gradient-to-r from-[#900001] via-[#FF6728] to-[#C20002]"
                    onClick={() => {
                      console.log("=== CHECKOUT BUTTON CLICKED ===");
                      console.log("cartItems being passed to modal:", cartItems);
                      console.log("promoCodeData:", promoCodeData);
                      console.log("promoCodeId to send to backend:", promoCodeData?.promoCodeId?._id);
                      console.log("=== END CHECKOUT DEBUG ===");
                    }}
                  >
                    <button className="w-full h-full cursor-pointer bg-black text-white py-3 lg:py-[43px] px-4 rounded-lg font-bold text-lg lg:text-[40px]">
                      Proceed To Checkout
                    </button>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;