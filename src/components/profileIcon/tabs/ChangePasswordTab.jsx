"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useChangePasswordMutation } from "@/redux/featured/auth/authApi";
import { toast } from "sonner";


export default function ChangePasswordTab() {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword,confirmPassword }).unwrap();
      toast.success("Password updated successfully.");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(err?.data?.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <>
      {/* Toast container */}
      {/* <Toaster position="top-right" /> */}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <Label htmlFor="currentPassword" className="text-sm font-medium text-gray-300">
            Current Password
          </Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Enter current password"
            className="bg-transparent border-gray-600 text-white placeholder-gray-400"
            value={formData.currentPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword" className="text-sm font-medium text-gray-300">
            New Password
          </Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Enter new password"
            className="bg-transparent border-gray-600 text-white placeholder-gray-400"
            value={formData.newPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-300">
            Confirm New Password
          </Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="bg-transparent border-gray-600 text-white placeholder-gray-400"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3"
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update Password"}
        </Button>
      </form>
    </>
  );
}
