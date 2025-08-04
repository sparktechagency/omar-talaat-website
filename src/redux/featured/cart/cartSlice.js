// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Helper functions for localStorage
const getCartFromStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    if (!cart || cart === "undefined" || cart === "null") return { items: [], total: 0, totalItems: 0 };
    try {
      return JSON.parse(cart);
    } catch {
      return { items: [], total: 0, totalItems: 0 };
    }
  }
  return { items: [], total: 0, totalItems: 0 };
};

const saveCartToStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Calculate cart totals
const calculateTotals = (items) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, total };
};

// SSR-safe initial state - don't access localStorage here
const initialState = {
  items: [],
  total: 0,
  totalItems: 0,
  isOpen: false,
  loading: false,
  error: null,
  isHydrated: false, // Track hydration status
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Initialize cart from storage (call this after hydration)
    initializeCart: (state) => {
      const cartFromStorage = getCartFromStorage();
      state.items = cartFromStorage.items;
      state.total = cartFromStorage.total;
      state.totalItems = cartFromStorage.totalItems;
      state.isHydrated = true;
    },

    // Add item to cart
    addToCart: (state, action) => {
      const { id, name, price, image, stock, ...otherProps } = action.payload;
      
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        if (existingItem.quantity < stock) {
          existingItem.quantity += 1;
        } else {
          state.error = "Maximum stock limit reached";
          return;
        }
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          stock,
          quantity: 1,
          ...otherProps
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.total = totals.total;
      state.error = null;
      
      saveCartToStorage({
        items: state.items,
        total: state.total,
        totalItems: state.totalItems
      });
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.total = totals.total;
      
      saveCartToStorage({
        items: state.items,
        total: state.total,
        totalItems: state.totalItems
      });
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        if (quantity > 0 && quantity <= item.stock) {
          item.quantity = quantity;
          
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.total = totals.total;
          state.error = null;
          
          saveCartToStorage({
            items: state.items,
            total: state.total,
            totalItems: state.totalItems
          });
        } else if (quantity > item.stock) {
          state.error = "Quantity exceeds available stock";
        }
      }
    },

    increaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item && item.quantity < item.stock) {
        item.quantity += 1;
        
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.total = totals.total;
        state.error = null;
        
        saveCartToStorage({
          items: state.items,
          total: state.total,
          totalItems: state.totalItems
        });
      } else if (item && item.quantity >= item.stock) {
        state.error = "Maximum stock limit reached";
      }
    },

    decreaseQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.items.find(item => item.id === itemId);
      
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.total = totals.total;
          
          saveCartToStorage({
            items: state.items,
            total: state.total,
            totalItems: state.totalItems
          });
        } else {
          state.items = state.items.filter(cartItem => cartItem.id !== itemId);
          
          const totals = calculateTotals(state.items);
          state.totalItems = totals.totalItems;
          state.total = totals.total;
          
          saveCartToStorage({
            items: state.items,
            total: state.total,
            totalItems: state.totalItems
          });
        }
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.totalItems = 0;
      state.error = null;
      
      if (typeof window !== "undefined") {
        localStorage.removeItem("cart");
      }
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },

    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCartError: (state, action) => {
      state.error = action.payload;
    },

    clearCartError: (state) => {
      state.error = null;
    },

    applyDiscount: (state, action) => {
      const { discountAmount, discountPercentage } = action.payload;
      
      if (discountAmount) {
        state.total = Math.max(0, state.total - discountAmount);
      } else if (discountPercentage) {
        state.total = state.total * (1 - discountPercentage / 100);
      }
      
      saveCartToStorage({
        items: state.items,
        total: state.total,
        totalItems: state.totalItems
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
  setCartLoading,
  setCartError,
  clearCartError,
  applyDiscount,
  initializeCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartTotalItems = (state) => state.cart.totalItems;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartLoading = (state) => state.cart.loading;
export const selectCartError = (state) => state.cart.error;
export const selectCartIsHydrated = (state) => state.cart.isHydrated;