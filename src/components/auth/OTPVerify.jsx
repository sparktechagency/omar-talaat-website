"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { registerSuccess } from "@/redux/featured/auth/authSlice";
import { useOtpVerifyMutation } from "@/redux/featured/auth/authApi";

export default function OTPVerify() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [verifyType, setVerifyType] = useState("");
  const [otpVerify] = useOtpVerifyMutation();
  const [verificationStatus, setVerificationStatus] = useState("");

  const router = useRouter();
  const searchParams = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // Get email and verification type from URL parameters
    const emailParam = searchParams.get("email");
    const typeParam = searchParams.get("type");

    if (emailParam) {
      setEmail(emailParam);
    } else {
      router.push("/login");
    }

    if (typeParam) {
      setVerifyType(typeParam);
    }
  }, [searchParams, router]);

  // Handle OTP change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits
    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input after entering a digit
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    } else if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Handle resend OTP
  const handleResendOTP = async () => {
    try {
      // Here you would call your API to resend the OTP
      // For example: await resendOTP(email);
      setVerificationStatus(
        "A new verification code has been sent to your email."
      );
    } catch (error) {
      setVerificationStatus(
        "Failed to resend verification code. Please try again."
      );
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const otpValue = Number(otp.join(""));

      // 🛠 Call your otpVerify API mutation
      const res = await otpVerify({ email, oneTimeCode: otpValue }).unwrap();
      console.log(res);
      if (res.success) {
        const { accessToken } = res.data;

        if (verifyType === "registration") {
          // Save token to localStorage
          localStorage.setItem("token", accessToken);

          // Dispatch to Redux
          dispatch(registerSuccess({ user: null, accessToken }));

          // Redirect to Home Page
          router.push("/");
        } else if (verifyType === "forgot-password") {
          // Forgot Password flow: move to reset-password page
          router.push(`/reset-password?email=${encodeURIComponent(email)}`);
        } else {
          // Default fallback
          router.push("/login");
        }
      } else {
        setVerificationStatus("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Verification failed:", error);
      setVerificationStatus("Verification failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row justify-center">
      {/* Left side image - hidden on small devices */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
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
      </div>

      {/* Right side form - full width on small devices */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#FCFCFC3B] border-2 border-[#A92C2C] backdrop-blur-md rounded-lg p-6 md:p-8 w-full max-w-md mx-auto">
          {/* Email icon */}
          <div className="flex items-center justify-center mb-6 md:mb-10">
            <div className="flex items-center justify-center bg-white w-12 h-12 md:w-16 md:h-16 rounded-full">
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
                  strokeWidth="2.33333"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
              <p>
                If you didn't receive a code.{" "}
                <span
                  className="text-blue-400 cursor-pointer hover:underline"
                  onClick={handleResendOTP}
                >
                  Resend
                </span>
              </p>
            </div>

            {verificationStatus && (
              <div className="text-center mb-4 text-yellow-400">
                {verificationStatus}
              </div>
            )}

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
                    onFocus={(e) => e.target.select()}
                    className="w-10 h-10 md:w-12 md:h-12 text-center bg-white text-black border border-red-500 rounded-lg p-0"
                  />
                ))}
              </div>

              <Button
                type="submit"
                className="w-full h-10 md:h-12 bg-button mt-6 md:mt-10"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
