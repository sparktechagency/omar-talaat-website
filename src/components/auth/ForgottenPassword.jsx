"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the verify-otp page and pass email as a query parameter
    router.push(`/otp-verify?email=${email}`);
  };

  return (
    <div className="flex justify-between mx-60 h-screen items-center">
      <div className="h-[700px] w-[700px]">
        <Image
          src="/assests/forgotImage.png"
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
          {" "}
          <div className=" flex items-center justify-center bg-white w-16 h-16 rounded-full ">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              // padding="20px"
            >
              <path
                d="M18.0846 8.75016L22.168 4.66683M24.5013 2.3335L22.168 4.66683L24.5013 2.3335ZM13.2896 13.5452C13.892 14.1395 14.3709 14.8472 14.6987 15.6274C15.0265 16.4076 15.1967 17.245 15.1995 18.0912C15.2023 18.9375 15.0377 19.776 14.7152 20.5583C14.3927 21.3407 13.9185 22.0516 13.3201 22.65C12.7217 23.2484 12.0109 23.7225 11.2285 24.0451C10.4461 24.3676 9.60763 24.5322 8.76137 24.5294C7.91511 24.5265 7.07776 24.3563 6.29755 24.0285C5.51734 23.7008 4.80967 23.2219 4.2153 22.6195C3.04645 21.4093 2.39969 19.7884 2.41431 18.106C2.42892 16.4236 3.10376 14.8142 4.29346 13.6245C5.48316 12.4348 7.09254 11.76 8.77497 11.7453C10.4574 11.7307 12.0783 12.3775 13.2885 13.5463L13.2896 13.5452ZM13.2896 13.5452L18.0846 8.75016L13.2896 13.5452ZM18.0846 8.75016L21.5846 12.2502L25.668 8.16683L22.168 4.66683L18.0846 8.75016Z"
                stroke="#656565"
                strokeWidth="2.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-center mb-4">
            Forgot Password
          </h2>
          <p className="text-center mb-6">
            No worries, we'll send you reset instructions.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                <span className="">*</span> Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-6 px-4 rounded-lg text-black bg-white" // Added bg-white to make the background white
                required
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-button mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
