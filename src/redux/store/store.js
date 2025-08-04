import { configureStore } from "@reduxjs/toolkit";
import { api } from "../baseUrl/baseUrl";
import authReducer from "../featured/auth/authSlice";
import cartReducer from "../featured/cart/cartSlice";

const store = configureStore({ 
    reducer: {
        [api.reducerPath]: api.reducer,
        auth: authReducer,
        cart: cartReducer,
    },
    middleware: (getDefaultMiddleware) =>getDefaultMiddleware().concat(api.middleware), // Add the middleware
});

export default store; // Export the store