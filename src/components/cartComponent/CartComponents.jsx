"use client";
import React, { useEffect, useState } from "react";
import Container from "../share/Container";
import CartItems from "./CartItems";
import DeliveryOptions from "./DeliveryOptions";
import CheckoutSummary from "./CheckoutSummary";
import { getCartProducts } from "../share/utils/cart";
import {
  useGetMyProfileQuery,
  useGetMyWalletQuery,
} from "@/redux/featured/auth/authApi";
import { toast } from "sonner";

const CheckoutPage = () => {
  const [discountAmount, setDiscountAmount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const { data: user } = useGetMyProfileQuery();
  const deliveryCharge = cartSubtotal >= 1000 ? 0 : 10;
  const total = cartSubtotal - discountAmount + deliveryCharge;
  const { data: wallet } = useGetMyWalletQuery();
  const walletData = wallet?.data;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("8am-9pm");
  const [deliveryType, setDeliveryType] = useState("Standard Delivery");
  const [comments, setComments] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [promoCodeData, setPromoCodeData] = useState(null);

  // Calendar setup with dynamic month/year
  const currentDate = new Date();
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());

  const userEmail = user?.data?.email;

  useEffect(() => {
    const items = getCartProducts(userEmail);
    setCartItems(items);
  }, [userEmail]);

  // When loading cart items, ensure each item has a quantity property and calculate subtotal
  useEffect(() => {
    console.log("=== CART LOADING DEBUG ===");
    console.log("UserEmail:", userEmail);
    
    const items = getCartProducts(userEmail);
    console.log("Raw cart items from localStorage:", items);
    
    // Ensure each item has a quantity property
    const itemsWithQuantity = items.map((item, index) => {
      console.log(`Processing cart item ${index}:`, item);
      return {
        ...item,
        quantity: item.quantity || 1,
      };
    });

    console.log("Items with quantity:", itemsWithQuantity);

    // Calculate subtotal from cart items
    const newSubtotal = itemsWithQuantity.reduce(
      (total, item) => {
        const itemTotal = item.price * item.quantity;
        console.log(`Item: ${item.name}, Price: ${item.price}, Quantity: ${item.quantity}, Total: ${itemTotal}`);
        return total + itemTotal;
      },
      0
    );

    console.log("Calculated subtotal:", newSubtotal);

    setCartItems(itemsWithQuantity);
    setCartSubtotal(newSubtotal);
    
    console.log("=== CART LOADING COMPLETE ===");
  }, [userEmail]);

  const handleQuantityChange = (productId, change) => {
    const updatedCart = cartItems.map((item) => {
      const itemId = item._id || item.id;
      if (itemId === productId) {
        const newQuantity = item.quantity + change;

        if (newQuantity < 1) return item;

        if (newQuantity > item.stock) {
          toast.error(`Only ${item.stock} in stock`);
          return item;
        }

        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    // Calculate new subtotal after quantity change
    const newSubtotal = updatedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setCartItems(updatedCart);
    setCartSubtotal(newSubtotal);
    localStorage.setItem(`cart-${userEmail}`, JSON.stringify(updatedCart));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter(
      (item) => (item._id || item.id) !== productId
    );

    // Calculate new subtotal after removing item
    const newSubtotal = updatedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    setCartItems(updatedCart);
    setCartSubtotal(newSubtotal);
    localStorage.setItem(`cart-${userEmail}`, JSON.stringify(updatedCart));
    toast.success("Product removed from cart.");
  };

  return (
    <Container className="text-white p-4 lg:p-8 mt-10 lg:mt-0 mx-auto">
      <div className="">
        <div className="lg:col-span-12 space-y-6 lg:space-y-8">
          {/* Cart Items Component */}
          <CartItems
            cartItems={cartItems}
            cartSubtotal={cartSubtotal}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={removeItem}
            walletData={walletData}
          />

          {/* Delivery Options Component */}
          <DeliveryOptions
            cartSubtotal={cartSubtotal}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            promoCode={promoCode}
            setPromoCode={setPromoCode}
            promoCodeData={promoCodeData}
            setPromoCodeData={setPromoCodeData}
            discountAmount={discountAmount}
            setDiscountAmount={setDiscountAmount}
            calendarMonth={calendarMonth}
            setCalendarMonth={setCalendarMonth}
            calendarYear={calendarYear}
            setCalendarYear={setCalendarYear}
            walletData={walletData}
          />

          {/* Checkout Summary Component */}
          <CheckoutSummary
            cartItems={cartItems}
            cartSubtotal={cartSubtotal}
            discountAmount={discountAmount}
            deliveryCharge={deliveryCharge}
            total={total}
            deliveryType={deliveryType}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            comments={comments}
            setComments={setComments}
            orderNumber={orderNumber}
            promoCodeData={promoCodeData}
            calendarMonth={calendarMonth}
            calendarYear={calendarYear}
            user={user}
            walletData={walletData}
          />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;