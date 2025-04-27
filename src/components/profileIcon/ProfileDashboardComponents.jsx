import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Flame, Calendar, DollarSign } from "lucide-react";
import Image from "next/image";

export default function ProfileDashboardComponents() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-center mb-8">
        <div className="">
          <div className=" flex items-center">
            <Image
              src="https://i.ibb.co.com/qHGmP2p/Ellipse-1.png"
              alt="Profile"
              height={100}
              width={100}
              className="w-24 h-24 rounded-full object-cover m-2 mx-auto"
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Isabella Olivia</h2>
            <p className="text-gray-600">example@gmail.com</p>
          </div>
        </div>
        {/* <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
          Edit Profile
        </Button> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
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
