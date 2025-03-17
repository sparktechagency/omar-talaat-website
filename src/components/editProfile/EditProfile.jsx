"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function EditProfile() {
  // State for user data
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    profilePicture: "",
  });

  // Load user data (Demo user for now)
  useEffect(() => {
    const fetchedUser = {
      name: "Md Jowel Ahmed",
      email: "jowel@example.com",
      contact: "+8801712345678",
      profilePicture: "/assests/profile.png",
    };
    setUser(fetchedUser);
    setFormData(fetchedUser);
  }, []);

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
    // alert("Profile updated successfully!");
  };

  return (
    <div className="flex justify-center items-center ">
      <Card className="w-full max-w-lg shadow-lg bg-[#222] text-white border border-[#2E2E2EF5] my-3">
        <CardHeader className="text-center">
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          {user ? (
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
                <label className="block text-sm font-medium">Name</label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Contact Number Field */}
              <div>
                <label className="block text-sm font-medium">
                  Contact Number
                </label>
                <Input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full bg-button">
                Update Profile
              </Button>
            </form>
          ) : (
            <p className="text-center text-gray-500">No user found!</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
