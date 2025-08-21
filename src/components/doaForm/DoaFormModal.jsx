"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { usePaymentMutation } from "@/redux/featured/cart/cartPageApi";
import { useGetMyProfileQuery } from "@/redux/featured/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DoaFormModal({ 
  showAcceptButton = false, 
  triggerComponent, 
  cartItems, 
  cartSubtotal, 
  discountAmount, 
  deliveryCharge, 
  total, 
  deliveryType, 
  selectedDate, 
  selectedTime, 
  comments, 
  orderNumber, 
  promoCodeData,
  calendarMonth,
  calendarYear
}) {
  const [open, setOpen] = useState(false);
  const [payment, { isLoading: isPaymentLoading }] = usePaymentMutation();
  const { data: user } = useGetMyProfileQuery();
  const router = useRouter();
  
  const handlePayment = () => {
    // Detailed validation
    console.log("=== PAYMENT DEBUG START ===");
    console.log("Cart Items received:", cartItems);
    console.log("Cart Items type:", typeof cartItems);
    console.log("Cart Items is array:", Array.isArray(cartItems));
    console.log("Cart Items length:", cartItems?.length);
    console.log("User data:", user?.data);
    
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      console.error("Cart validation failed:", { cartItems, isArray: Array.isArray(cartItems), length: cartItems?.length });
      toast.error('Your cart is empty or invalid');
      return;
    }

    if (!user?.data) {
      console.error("User validation failed:", user);
      toast.error('Please login to proceed with payment');
      return;
    }

    // Log each cart item to see structure
    cartItems.forEach((item, index) => {
      console.log(`Cart Item ${index}:`, {
        item,
        _id: item._id,
        id: item.id,
        quantity: item.quantity,
        name: item.name
      });
    });

    // Validate that cart items have required fields
    const invalidItems = cartItems.filter(item => !item._id && !item.id);
    if (invalidItems.length > 0) {
      console.error("Items without ID:", invalidItems);
      toast.error('Some cart items are missing product IDs');
      return;
    }

    // Format date for API
    const deliveryDateObj = selectedDate 
      ? new Date(calendarYear || new Date().getFullYear(), calendarMonth || new Date().getMonth(), selectedDate) 
      : new Date();
    const formattedDate = deliveryDateObj.toISOString();

    // Convert delivery type to lowercase for API
    const getDeliveryTypeForAPI = (type) => {
      switch(type) {
        case "Standard Delivery":
          return "standard";
        case "Free Delivery":
          return "standard"; // Change this to "standard" since free is just standard with 0 cost
        case "Add To Previous Order":
          return "previous_order";
        default:
          return "standard";
      }
    };

    // Prepare products array with validation - EXACTLY matching your API format
    const products = cartItems.map(item => {
      const productId = item._id || item.id;
      const quantity = parseInt(item.quantity) || 1;
      
      console.log(`Processing item: productId=${productId}, quantity=${quantity}`);
      
      return {
        productId: productId,
        quantity: quantity
      };
    }).filter(product => product.productId); // Remove any items without productId

    console.log("Processed products array:", products);
    console.log("Products length:", products.length);

    if (products.length === 0) {
      console.error("No valid products after processing");
      toast.error('No valid products found in cart');
      return;
    }

    // Generate a simple order ID (you can modify this logic)
    const orderId = `ORD${Date.now()}`;

    // Prepare order data EXACTLY matching your API specification
    const orderData = {
      orderId: orderId,
      userId: user.data._id,
      products: products,
      deliveryType: getDeliveryTypeForAPI(deliveryType),
      comments: comments || "No additional comments",
      deliveryFee: parseFloat(deliveryCharge) || 0.0,
      finalAmount: parseFloat(total?.toFixed(2)) || 0.0,
      deliveryDate: formattedDate,
      deliveryTime: selectedTime || "8am-9pm",
      discount: parseFloat(discountAmount?.toFixed(2)) || 0.0,
      shippingAddress: user.data.address || "Default Address"
    };

    // Add previous order ID if delivery type is "Add To Previous Order"
    if (deliveryType === "Add To Previous Order" && orderNumber) {
      orderData.previousOrderId = orderNumber;
    }

    // If promo code is applied, add it to the order data
    if (promoCodeData) {
      orderData.promoCodeId = promoCodeData.promoCodeId._id;
      orderData.promoCode = promoCodeData.promoCode;
    }

    console.log("Final order data structure:");
    console.log(JSON.stringify(orderData, null, 2));
    
    // Additional validation before sending
    console.log("=== FINAL VALIDATION ===");
    console.log("orderId:", orderData.orderId);
    console.log("userId:", orderData.userId);
    console.log("products:", orderData.products);
    console.log("products is array:", Array.isArray(orderData.products));
    console.log("products length:", orderData.products.length);
    
    if (!orderData.userId) {
      console.error("Missing userId");
      toast.error('User ID is missing');
      return;
    }
    
    if (!Array.isArray(orderData.products) || orderData.products.length === 0) {
      console.error("Invalid products array:", orderData.products);
      toast.error('Products array is invalid');
      return;
    }

    console.log("=== SENDING API REQUEST ===");

    // Call payment API
    payment(orderData)
      .unwrap()
      .then(response => {
        console.log("Payment response:", response);
        
        if (response.success && response.data?.url) {
          toast.success(response.message || "Order created successfully! Redirecting to payment...");
          
          // Clear cart from localStorage after successful order creation
          if (user?.data?.email) {
            localStorage.removeItem(`cart-${user.data.email}`);
          }
          
          // Navigate to payment URL
          window.location.href = response.data.url;
        } else {
          toast.error(response.message || 'Payment failed');
        }
      })
      .catch(error => {
        console.error("=== PAYMENT ERROR ===");
        console.error("Full error object:", error);
        console.error("Error data:", error.data);
        console.error("Error message:", error.message);
        
        // More detailed error handling
        if (error.data?.error) {
          const errorMessages = error.data.error.map(err => `${err.path}: ${err.message}`).join(', ');
          toast.error(`Validation Error: ${errorMessages}`);
          console.error("Validation errors:", error.data.error);
        } else {
          toast.error(error.data?.message || 'Payment processing failed');
        }
      });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {triggerComponent ? (
        <DialogTrigger asChild>{triggerComponent}</DialogTrigger>
      ) : null}
      <DialogContent className="sm:max-w-[800px] bg-black p-10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">DOA Form</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">1. Acceptance of Terms</h3>
            <p className="text-sm text-gray-300">
              By accessing or using We Share Together, you agree to these Terms and Conditions. We reserve the right to update or modify
              these Terms at any time, and such changes will be effective immediately upon posting. It is your responsibility to review these
              Terms periodically.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">2. Eligibility</h3>
            <p className="text-sm text-gray-300">
              You must be at least 18 years old to use We Share Together. By using our platform, you represent that you are at least 18 years of
              age or have the consent of a parent or legal guardian to use our services.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">3. Account Registration</h3>
            <p className="text-sm text-gray-300">
              To use certain features of the platform, you must create an account. When you register, you agree to provide accurate, complete,
              and up-to-date information. You are responsible for maintaining the confidentiality of your account information and for all
              activities under your account.
            </p>
          </div>

          {/* Order Summary in Modal */}
          {/* <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
            <h4 className="text-lg font-semibold mb-3">Order Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>AED {cartSubtotal?.toFixed(2) || '0.00'}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Discount:</span>
                  <span>-AED {discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{deliveryCharge === 0 ? 'FREE' : `AED ${deliveryCharge}`}</span>
              </div>
              <div className="border-t border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>AED {total?.toFixed(2) || '0.00'}</span>
                </div>
              </div>
            </div>
          </div> */}

          {showAcceptButton && (
            <div className="mt-6 text-end">
              <Button 
                onClick={handlePayment} 
                disabled={isPaymentLoading}
                className="text-white py-2 cursor-pointer px-6 rounded-lg hover:opacity-90"
              >
                {isPaymentLoading ? 'Processing Payment...' : 'I Accept'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}