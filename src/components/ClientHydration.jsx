// components/ClientHydration.js
'use client'

import Spinner from '@/app/(commonLayout)/Spinner';
import { initializeCart, selectCartIsHydrated } from '@/redux/featured/cart/cartSlice';
import { initializeWishlist } from '@/redux/featured/shop/shopSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function ClientHydration({ children }) {
  const dispatch = useDispatch();
  const cartHydrated = useSelector(selectCartIsHydrated);

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
      <div className="flex items-center bg-transparent justify-center min-h-screen">
       <Spinner />
      </div>
    );
  }

  return children;
}