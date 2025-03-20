"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { useRouter } from "next/navigation";

export default function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router=useRouter()

  // Handle OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input after entering a digit
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
   router.push("/auth/reset-password")
  };

  return (
    <div className=" flex justify-center items-center  py-12 px-4">
      <div className="bg-[#222] text-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">
          Enter Verification Code
        </h2>

        <div className="text-center mb-6 text-sm text-gray-400">
          <p>
            If you didn’t receive a code.{" "}
            <span className="text-blue-400 cursor-pointer">Resend</span>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex justify-between mb-4">
            {otp.map((digit, index) => (
              <Input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                className="w-16 h-16 text-center bg-[#333] text-white border border-gray-500 rounded-lg"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-button mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending OTP..." : "Send OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
}
