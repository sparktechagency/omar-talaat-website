"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Flame, Calendar, DollarSign } from "lucide-react";
import Image from "next/image";

export default function ProfileDashboardComponents() {
  // State for user data
  const [user, setUser] = useState({
    name: "Isabella Olivia",
    email: "example@gmail.com",
    contact: "+1234567890",
    profilePicture: "https://i.ibb.co.com/qHGmP2p/Ellipse-1.png",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profilePicture: "",
  });

  const [open, setOpen] = useState(false);

  // Initialize form data when user data is available
  useEffect(() => {
    setFormData(user);
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle profile picture selection
  const handleProfileClick = () => {
    document.getElementById("profileInput").click();
  };

  // Handle file change (for profile picture)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: URL.createObjectURL(file) });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    setUser(formData);
    setOpen(false); // Close the modal after submission
  };

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-lg border mt-6">
      <div className="flex items-center justify-center mb-8 relative">
        <div className="">
          <div className="flex items-center">
            <Image
              src={user.profilePicture}
              alt="Profile"
              height={100}
              width={100}
              className="w-24 h-24 rounded-full object-cover m-2 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Edit Profile Button with Modal */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="destructive"
              className="bg-red absolute top-0 right-5 "
            >
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture */}
              <div className="flex justify-center">
                <Image
                  src={formData.profilePicture}
                  alt="Profile"
                  height={100}
                  width={100}
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
                  onClick={handleProfileClick}
                />
              </div>
              <input
                type="file"
                id="profileInput"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="py-6"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="py-6"
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Contact Number
                </label>
                <Input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="py-6"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 py-6"
              >
                Update Profile
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <Flame size={24} />
              </div>
              <h3 className="font-medium">Streak</h3>
            </div>
            <p className="text-4xl font-bold mt-4">34 Days</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <Clock size={24} />
              </div>
              <h3 className="font-medium">Yoga Sessions</h3>
            </div>
            <p className="text-4xl font-bold mt-4">0 Session</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-red-500">
                <Clock size={24} />
              </div>
              <h3 className="font-medium">Total Mat Time</h3>
            </div>
            <p className="text-4xl font-bold mt-4">0 Min</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="text-red-500">
              <DollarSign size={24} />
            </div>
            <h3 className="font-medium">6Month Plan Running</h3>
          </div>

          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-6xl font-bold text-red-500 mb-4">50</p>
            <p className="text-xl mb-4">Days Remaining</p>

            <div className="flex items-center gap-2">
              <Calendar className="text-gray-700" size={20} />
              <p className="text-lg">Expires On Dec 31, 2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
