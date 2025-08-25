"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // For toast notifications
import { useOtpVerifyMutation, useResendOtpMutation } from "@/redux/featured/auth/authApi";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { MainLogo } from "../share/svg/Logo";


export default function OTPVerify() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [otpVerify, { isLoading, error }] = useOtpVerifyMutation(); 
  const [resendOtp, { isLoading: isResendingOtp }] = useResendOtpMutation(); 

  // Get query parameters from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");
    const typeParam = urlParams.get("type");
    console.log(emailParam, typeParam);

    if (emailParam && typeParam) {
      setEmail(decodeURIComponent(emailParam)); // Decode the email
      setType(typeParam);
    }
  }, []);

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


  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    
    if (/^\d{4}$/.test(pastedData)) {
      const otpArray = pastedData.split("");
      setOtp(otpArray);
  
      // Autofocus the last input field
      const lastInput = document.getElementById(`otp-5`);
      if (lastInput) lastInput.focus();
    } else {
      toast.error("Please paste a 4-digit OTP.");
    }
  };
  

  // Handle OTP submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join(""); // Join the OTP array to create a string
    const oneTimeCode = parseInt(enteredOtp); // Convert OTP to integer for backend

    if (isNaN(oneTimeCode) || oneTimeCode.toString().length !== 4) {
      toast.error("Please enter a valid 4-digit OTP.");
      return;
    }

    setIsSubmitting(true); // Start submitting

    try {
      // Send OTP and email to the backend to verify
      const response = await otpVerify({ email, oneTimeCode });
      console.log("Reset token:", response?.data?.data?.verifyToken);

      // Handle success response
      if (response?.data?.success) {
        localStorage.setItem("verifyToken", response?.data?.data?.verifyToken);
        if (type === "password-reset") {
          router.push(
            `/reset-password?email=${encodeURIComponent(email)}`
          );  
        } else if (type === "registration") {
          router.push("/login"); 
        }

        toast.success("OTP verified successfully!");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("There was an error verifying the OTP.");
    } finally {
      setIsSubmitting(false); // End submitting
    }
  };


  // Handle Resend OTP
  const handleResendOTP  = async () => {
    try {
      // Resend OTP to the email
      const response = await resendOtp({ email }).unwrap();

      // Log the response for debugging
      console.log("Resend OTP Response:", response);

      if (response?.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error("There was an issue resending the OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      toast.error("There was an error resending the OTP.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center">
    {/* Left side image - hidden on small devices */}
    {/* <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
      <div className="h-auto max-h-[700px] w-full max-w-[700px] p-4">
        <Image
          src="/assests/otpImage.png"
          alt="OTP verification image"
          width={700}
          height={700}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div> */}

    {/* Right side form - full width on small devices */}
    <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
      <div className="rounded-lg p-6 md:p-8 w-full max-w-md mx-auto">
        {/* Email icon */}
        <div className="flex items-center justify-center mb-6 md:mb-10">
          <div className="flex justify-center mb-4">
            <MainLogo className="w-32 h-32 " />
          </div>
        </div>

        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            Enter Verification Code
          </h2>

          {email && (
            <p className="text-center mb-4 text-white">
              We've sent a verification code to <strong>{email}</strong>
            </p>
          )}

          <div className="text-center mb-4 md:mb-6 text-sm md:text-base text-white">
            <p className="text-white text-sm ">

              If you didn't receive a code.{" "}
              <span
                className="text-blue-400 cursor-pointer hover:underline"
                onClick={handleResendOTP}
              >
                Resend
              </span>
            </p>
          </div>

          {/* {verificationStatus && (
            <div className="text-center mb-4 text-yellow-400">
              {verificationStatus}
            </div>
          )} */}

          <form onSubmit={handleSubmit}>
            <div className="flex justify-around mb-4 mx-2 md:mx-10 gap-1 md:gap-2">
              {/* Changed from 6 digits to 4 digits */}
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  className="w-10 h-10 md:w-12 md:h-12 text-center bg-white text-black  rounded-lg p-0"
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full h-10 md:h-12 border text-white  rounded-lg mt-6 md:mt-10"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  );
}