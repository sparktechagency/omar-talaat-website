"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPasswordCom() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/login");
    }, 2000);
  };

  return (
    <div className="flex justify-between mx-30 h-screen items-center">
      <div className="h-[700px] w-[930px]">
        <Image
          src="/assests/resetImage.png"
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
            Reset Password
          </h2>
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
                  className="w-full py-6 px-4 text-black bg-white border border-[#2E2E2EF5] rounded-lg" // White background, black text
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
                  className="w-full py-6 px-4 text-black bg-white border border-[#2E2E2EF5] rounded-lg"
                  black
                  text
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
    </div>
  );
}
