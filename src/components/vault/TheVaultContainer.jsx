"use client";

import { ArrowLeft, Lock } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { CalenderLogo, CoinsLogo, Logo, MainLogo } from "../share/svg/Logo";
import {
  useForAccessRequestMutation,
  useUnlockTheVaultMutation,
} from "@/redux/featured/category/categoryApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const TheVaultContainer = () => {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [forAccessRequest] = useForAccessRequestMutation();
  const [unlockTheVault, { isLoading }] = useUnlockTheVaultMutation();
  const router = useRouter();

  const hasRequestedOTP = useRef(false);

  useEffect(() => {
    if (hasRequestedOTP.current) {
      return;
    }

    const requestOTP = async () => {
      try {
        hasRequestedOTP.current = true; // Mark as requested
        await forAccessRequest().unwrap();
        toast.success("OTP has been sent to your registered account");
      } catch (err) {
        const errorMessage = err?.data?.message || "Failed to request OTP.";
        toast.error(errorMessage);
        hasRequestedOTP.current = false; // Reset on error so user can try again
      }
    };

    requestOTP();
  }, []); // Empty dependency array

  const handleOtpSubmit = async () => {
    if (otp.trim() === "") {
      setOtpError("Please enter OTP.");
      return;
    }

    try {
      const response = await unlockTheVault(otp).unwrap();
      console.log("Success Response:", response);
      toast.success("Successfully unlock this category");
     
      setOtp("");
      setOtpError("");
      router.push("/");
    } catch (err) {
      console.log("Error Response:", err);
      const errorMessage =
        err?.data?.message || "Failed to unlock vault. Please try again.";
      setOtpError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-black h-[550px] rounded-2xl p-8 max-w-md w-full relative">
        {/* Close button */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Modal content */}
        <div className="text-center mx-auto">
          <div className="mb-6">
            {/* <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
                                <Lock className="w-10 h-10 text-white" />
                            </div> */}
            <h2 className="text-3xl font-bold text-white mb-2">The Vault</h2>
          </div>

          <div className="mb-6">
            <p className="text-white/80 mb-4">
              Minimum Requirements To Ask For Permission:
            </p>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <MainLogo className="bg-premium" color="#DB9D17" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <CalenderLogo />
                </div>
                <span className="text-[40px] font-bold font-brush">5</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                  <Logo />
                </div>
                <span className="text-[40px] font-bold font-brush">1000</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <CoinsLogo />
                </div>
                <span className="text-yellow-500 text-[40px] font-brush font-bold">
                  1000
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-white/70 text-start text-sm mb-2">
              OTP
            </label>
            <div className="relative">
              <input
                type="text"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value);
                  setOtpError(""); // Clear error when typing
                }}
                className="w-full border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
                placeholder="Enter OTP"
                autoComplete="off"
                maxLength="14"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleOtpSubmit();
                  }
                }}
              />
            </div>
            {otpError && (
              <p className="text-red-400 text-sm mt-2">{otpError}</p>
            )}
          </div>

          <button
            onClick={handleOtpSubmit}
            disabled={isLoading}
            className="w-full border border-white/40 p-2 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Unlocking..." : "Unlock The Vault"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TheVaultContainer;
