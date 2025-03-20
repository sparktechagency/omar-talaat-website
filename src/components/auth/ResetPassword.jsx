"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN's Input Component
import { Button } from "@/components/ui/button"; // ShadCN's Button Component
import { HiEye, HiEyeOff } from "react-icons/hi"; // Password eye icons for toggle
import { useRouter } from "next/navigation"; // Next.js useRouter hook for navigation

export default function ResetPasswordCom() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter(); // Initialize useRouter

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsSubmitting(true);

    // Simulate password update (you can replace it with your logic to update the password)
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to the login page after successful password update
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center py-12 text-white">
      <div className="bg-[#222] rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-center mb-6 text-sm">
          Password must have 8 characters
        </p>

        <form onSubmit={handleSubmit}>
          {/* New Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-6 px-4 text-white rounded-lg border border-[#2E2E2EF5]"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiEyeOff className="text-gray-500" />
                ) : (
                  <HiEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-6 px-4 text-white rounded-lg border border-[#2E2E2EF5]"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <HiEyeOff className="text-gray-500" />
                ) : (
                  <HiEye className="text-gray-500" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 bg-button mt-10"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
