"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit } from "lucide-react";

// Profile Tab Component
const ProfileTab = () => {
  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <div className="flex justify-start mb-8">
        <div className="relative">
          <Avatar className="w-32 h-32">
            <AvatarImage src="/assets/profile.png" alt="Profile" />
            <AvatarFallback className="text-2xl">EJ</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 rounded-full w-8 h-8"
          >
            <Edit className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label
            htmlFor="firstName"
            className="text-sm font-medium text-gray-300"
          >
            First name
          </Label>
          <p className="text-xs text-gray-400 mb-2">
            (Your First Name will be fully anonymous)
          </p>
          <Input
            id="firstName"
            placeholder="Emily Jane"
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="lastName"
            className="text-sm font-medium text-gray-300"
          >
            Last name
          </Label>
          <p className="text-xs text-gray-400 mb-2">
            (Your Last Name will be fully anonymous)
          </p>
          <Input
            id="lastName"
            placeholder="Emily Jane"
            className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="username" className="text-sm font-medium text-gray-300">
          Username
        </Label>
        <p className="text-xs text-gray-400 mb-2">
          (Your Username can be viewed by the public through the Leaderboard)
        </p>
        <Input
          id="username"
          placeholder="Emily Jane"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-gray-300">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="emily@gmail.com"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className="text-sm font-medium text-gray-300">
          Contact number
        </Label>
        <Input
          id="contact"
          placeholder="+99-01846875456"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="deliverTo"
          className="text-sm font-medium text-gray-300"
        >
          Deliver To
        </Label>
        <Input
          id="deliverTo"
          placeholder="example Location Here"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3">
        Save Changes
      </Button>
    </div>
  );
};

// Change Password Tab Component
const ChangePasswordTab = () => {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label
          htmlFor="currentPassword"
          className="text-sm font-medium text-gray-300"
        >
          Current Password
        </Label>
        <Input
          id="currentPassword"
          type="password"
          placeholder="Enter current password"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="newPassword"
          className="text-sm font-medium text-gray-300"
        >
          New Password
        </Label>
        <Input
          id="newPassword"
          type="password"
          placeholder="Enter new password"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="confirmPassword"
          className="text-sm font-medium text-gray-300"
        >
          Confirm New Password
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          className="bg-transparent border-gray-600 text-white placeholder:text-gray-400"
        />
      </div>

      <Button className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3">
        Update Password
      </Button>
    </div>
  );
};

// Leaderboard Tab Component
const LeaderboardTab = () => {
  const leaderboardData = [
    { rank: 1, username: "TopPlayer", score: 2500 },
    { rank: 2, username: "ProGamer", score: 2350 },
    { rank: 3, username: "ChampionX", score: 2200 },
    { rank: 4, username: "Emily Jane", score: 1980 },
    { rank: 5, username: "GameMaster", score: 1850 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-white mb-6">Leaderboard</h3>
      <div className="space-y-3">
        {leaderboardData.map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              player.username === "Emily Jane"
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-600 bg-gray-800/50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-sm font-bold">
                {player.rank}
              </div>
              <span className="text-white font-medium">{player.username}</span>
            </div>
            <div className="text-gray-300 font-semibold">
              {player.score.toLocaleString()} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// My Membership Tab Component
const MyMembershipTab = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-6">My Membership</h3>

      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 border-0">
        <CardContent className="p-6">
          <div className="text-center text-white">
            <h4 className="text-2xl font-bold mb-2">Premium Member</h4>
            <p className="text-purple-100 mb-4">Active since January 2024</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 border border-gray-600 rounded-lg">
          <h5 className="text-white font-semibold mb-2">Benefits</h5>
          <ul className="text-gray-300 text-sm space-y-1">
            <li>• Unlimited access</li>
            <li>• Priority support</li>
            <li>• Exclusive content</li>
            <li>• No advertisements</li>
          </ul>
        </div>

        <div className="p-4 border border-gray-600 rounded-lg">
          <h5 className="text-white font-semibold mb-2">
            Subscription Details
          </h5>
          <div className="text-gray-300 text-sm space-y-1">
            <p>Plan: Premium Monthly</p>
            <p>Next billing: July 25, 2025</p>
            <p>Amount: $9.99/month</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 border-gray-600 text-white hover:bg-gray-800"
        >
          Cancel Subscription
        </Button>
        <Button className="flex-1 bg-white text-black hover:bg-gray-200">
          Upgrade Plan
        </Button>
      </div>
    </div>
  );
};

// Main Profile Page Component
const ProfileDashboardComponents = () => {
  return (
    <div className="mt-16">
      <div className="max-w-6xl mx-auto">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 ">
            <TabsTrigger
              value="profile"
              className=" data-[state=active]:text-white data-[state=active]:border data-[state=active]:text-2xl"
            >
              Edit Profile
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className=" data-[state=active]:text-white data-[state=active]:border data-[state=active]:text-2xl"
            >
              Change Password
            </TabsTrigger>
            <TabsTrigger
              value="leaderboard"
              className=" data-[state=active]:text-white data-[state=active]:border data-[state=active]:text-2xl"
            >
              Leaderboard
            </TabsTrigger>
            <TabsTrigger
              value="membership"
              className=" data-[state=active]:text-white data-[state=active]:border data-[state=active]:text-2xl"
            >
              My Membership
            </TabsTrigger>
          </TabsList>

          <Card className="mt-6 border bg-black/85">
            <CardContent className="p-8">
              <TabsContent value="profile" className="mt-0">
                <ProfileTab />
              </TabsContent>

              <TabsContent value="password" className="mt-0">
                <ChangePasswordTab />
              </TabsContent>

              <TabsContent value="leaderboard" className="mt-0">
                <LeaderboardTab />
              </TabsContent>

              <TabsContent value="membership" className="mt-0">
                <MyMembershipTab />
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfileDashboardComponents;
