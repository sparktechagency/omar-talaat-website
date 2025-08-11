
"use client";

import { useGetMyWalletQuery } from "@/redux/featured/auth/authApi";

export default function WalletInitializer() {
  useGetMyWalletQuery(); 
  return null;
}
