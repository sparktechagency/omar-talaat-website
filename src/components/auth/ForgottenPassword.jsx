"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForgotPasswordMutation } from "@/redux/featured/auth/authApi";
import { MainLogo } from "../share/svg/Logo";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgetPassword, { isLoading, error }] = useForgotPasswordMutation();
  const router = useRouter();

  // Handle form submission
  const handleSubmit =async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start submission

    try {
      // Call the API to send an OTP for password reset
      const response = await forgetPassword({ email });
      console.log(response)

      if (response?.data?.success) {
        // Redirect to the verify-otp page and pass email as a query parameter
        router.push(
          `/otp-verify?email=${encodeURIComponent(
            email
          )}&type=password-reset`
        );
      } else {
        console.error("Error during password reset request:", response?.error);
      }
    } catch (err) {
      console.error("Error during password reset request:", err);
      toast.error("There was an error sending the OTP. Please try again.");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center bg-black">
      {/* Left side image - hidden on small devices */}
      {/* <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <div className="h-auto max-h-[700px] w-full max-w-[700px] p-4">
          <Image
            src="/assests/forgotImage.png"
            alt="forgotten page image"
            width={700}
            height={700}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div> */}

      {/* Right side form - full width on small devices */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className=" backdrop-blur-md rounded-lg  w-full max-w-md mx-auto">
          {/* Email icon */}
          <div className="flex flex-col items-center justify-center">

            <div className="flex justify-center mb-4">
               <MainLogo className="w-32 h-32 " />
            </div>
            <h2 className="font-bold text-center mb-6 text-white text-xl md:text-2xl">
            Forgotten Password
          </h2>
          <p className="text-center text-white text-sm md:text-base">
           No worries, we`ll send you reset instructions.
          </p>

          </div>

          <div>
         

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  <span className="">*</span> Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 md:py-6 px-4 rounded-lg text-white border"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-10 md:h-12 text-white rounded-lg border mt-4 md:mt-6"
                disabled={isLoading}

              >
                {isLoading ? "Sending OTP..." : "Send OTP"}

              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
