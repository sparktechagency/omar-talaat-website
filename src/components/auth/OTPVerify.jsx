"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input after entering a digit
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus(); // Automatically focus on next input
    } else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus(); // Move to previous input if value is deleted
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Do OTP validation and then navigate
    if (otp.join("").length === 6) {
      router.push("/reset-password");
    } else {
      alert("Please enter the full OTP.");
    }
  };

  return (
    <div className="flex justify-between mx-60 h-screen items-center">
      <div className="h-[700px] w-[700px]">
        <Image
          src="/assests/otpImage.png"
          alt="forgotten page image"
          height={700}
          width={700}
          className="object-cover w-full h-full"
        />
      </div>
      <div
        style={{
          background: "#FCFCFC3B",
          padding: 30,
          paddingBottom: 40,
          borderRadius: 15,
          maxWidth: 500,
          width: "100%",
          zIndex: 1,
          border: "2px solid #A92C2C",
          backdropFilter: "blur(10px)",
        }}
      >
        {/* Add SVG here */}
        <div className="flex items-center justify-center mb-10">
          <div className="flex items-center justify-center bg-white w-16 h-16 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M25.6693 6.99984C25.6693 5.7165 24.6193 4.6665 23.3359 4.6665H4.66927C3.38594 4.6665 2.33594 5.7165 2.33594 6.99984M25.6693 6.99984V20.9998C25.6693 22.2832 24.6193 23.3332 23.3359 23.3332H4.66927C3.38594 23.3332 2.33594 22.2832 2.33594 20.9998V6.99984M25.6693 6.99984L14.0026 15.1665L2.33594 6.99984"
                stroke="#656565"
                stroke-width="2.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Enter Verification Code
          </h2>

          <div className="text-center mb-6 text-sm text-white">
            <p>
              If you didn't receive a code.{" "}
              <span className="text-blue-400 cursor-pointer">Resend</span>
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-around mb-4 mx-10">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onFocus={(e) => e.target.select()} // Select the value when the input is focused
                  className="w-12 h-12 text-center bg-white text-black border border-red-500 rounded-lg"
                />
              ))}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-button mt-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Verify OTP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
