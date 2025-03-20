"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you're using ShadCN's Button component
import { Input } from "@/components/ui/input"; // Assuming you're using ShadCN's Input component
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the verify-otp page and pass email as a query parameter
    router.push(`/auth/verify-otp?email=${email}`);
  };

  return (
    <div className="flex justify-center items-center py-12 text-white">
      <div className="bg-[#222] rounded-lg p-8 shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-4">Forgot Password</h2>
        <p className="text-center mb-6">
          Enter your email below to reset your password
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
              className="w-full py-6 px-4 rounded-lg border border-gray-300"
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
  );
}
