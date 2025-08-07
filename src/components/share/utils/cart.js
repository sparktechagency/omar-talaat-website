// utils/cart.js

import { toast } from "sonner";


export const saveProductToCart = (product, userEmail, quantity = 1) => {
  console.log("from cart ", quantity)
  if (!userEmail || !product ) return;

  const productId = product._id || product.id;
  if (!productId) return;

  const key = `cart-${userEmail}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  const isExist = existing.find((item) => (item._id || item.id) === productId);

  if (!isExist) {
    const updated = [{ ...product, quantity }, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
    toast.success("Product added to cart successfully!");
  } else {
    toast.info("Product already in cart.");
  }
};





// ✅ Function to get cart products for current user
export const getCartProducts = (userEmail) => {
  if (!userEmail) return [];
  const key = `cart-${userEmail}`;
  return JSON.parse(localStorage.getItem(key)) || [];
};

// ✅ Optional: remove product from cart
export const removeProductFromCart = (productId, userEmail) => {
  const key = `cart-${userEmail}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];

  const updated = existing.filter(
    (item) => (item._id || item.id) !== productId
  );

  localStorage.setItem(key, JSON.stringify(updated));
  toast.success("Product removed from cart.");
};


// ✅ Optional: clear full cart for this user
export const clearCart = (userEmail) => {
  const key = `cart-${userEmail}`;
  localStorage.removeItem(key);
  toast.success("Cart cleared.");
};


