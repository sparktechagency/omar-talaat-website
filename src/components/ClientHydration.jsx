// components/ClientHydration.js
'use client'

import { initializeCart, selectCartIsHydrated } from '@/redux/featured/cart/cartSlice';
import { initializeWishlist } from '@/redux/featured/shop/shopSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { initializeCart, selectCartIsHydrated } from '@/store/slices/cartSlice';
// import { initializeWishlist, selectShopIsHydrated } from '@/store/slices/shopSlice';
// import { initializeAuth, selectAuthIsHydrated } from '@/store/slices/authSlice';

export default function ClientHydration({ children }) {
  const dispatch = useDispatch();
  const cartHydrated = useSelector(selectCartIsHydrated);
//   const shopHydrated = useSelector(selectShopIsHydrated);
//   const authHydrated = useSelector(selectAuthIsHydrated);

  useEffect(() => {
    // Initialize all slices with localStorage data after client-side hydration
    if (!cartHydrated) {
      dispatch(initializeCart());
    }
    // if (!shopHydrated) {
    //   dispatch(initializeWishlist());
    // }
    // if (!authHydrated) {
    //   dispatch(initializeAuth());
    // }
  }, [dispatch, cartHydrated]);

  // Don't render children until hydration is complete to prevent UI flickers
  const isFullyHydrated = cartHydrated ;

  if (!isFullyHydrated) {
    // Show a loading spinner or skeleton while hydrating
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return children;
}