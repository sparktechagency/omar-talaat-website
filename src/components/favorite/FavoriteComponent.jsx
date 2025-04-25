// pages/index.js
"use client"

import { useState } from "react";
import { Heart, Download, ArrowLeft, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function FavoriteComponent() {
  const [showDetails, setShowDetails] = useState(false);

  const yogaClass = {
    title: "Gentle Morning Stretch",
    duration: "11 Min",
    description:
      "Yoga is a holistic practice that blends physical postures, breath control, meditation, and ethical principles to promote overall well-being. Rooted in ancient Indian traditions, yoga offers a pathway to connect the mind, body, and spirit, fostering balance and harmony in daily life.",
    details:
      "Through a variety of physical poses (asanas), yoga strengthens and tones the body, enhances flexibility, and improves posture. The focus on conscious breathing (pranayama) helps calm the nervous system, reduce stress, and increase mental clarity. Additionally, yoga encourages mindfulness and self-awareness, cultivating a sense of inner peace and relaxation.",
    equipment: "None",
  };

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleBackClick = () => {
    setShowDetails(false);
  };

  if (showDetails) {
    return (
      <div className="max-w-4xl mx-auto p-4 bg-white">
        <div className="mb-4">
          <Button
            variant="ghost"
            className="text-gray-600"
            onClick={handleBackClick}
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </Button>
        </div>

        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-6">
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <PlayCircle size={80} className="text-white opacity-80" />
          </div>
          <img
            src="/api/placeholder/800/500"
            alt="Person meditating on rooftop"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 text-white rounded-full h-10 w-10"
            >
              <Heart size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 text-white rounded-full h-10 w-10"
            >
              <Download size={20} />
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold">{yogaClass.title}</h1>
            <p className="text-gray-500">{yogaClass.duration}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-rose-500 mb-2">
              About this Class
            </h2>
            <p className="text-gray-700 mb-4">{yogaClass.description}</p>
            <p className="text-gray-700">{yogaClass.details}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-rose-500 mb-2">
              Props/Equipment Needed
            </h2>
            <p className="text-gray-700">{yogaClass.equipment}</p>
          </div>

          <Button className="w-full bg-rose-500 hover:bg-rose-600 text-white py-6">
            Watch Now
          </Button>
        </div>
      </div>
    );
  }

  // Classes list view
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {[1, 2, 3, 4].map((index) => (
        <Card key={index} className="overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
              <img
                src="/api/placeholder/400/300"
                alt="Person in yoga pose"
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{yogaClass.title}</h2>
                  <p className="text-gray-500 mb-4">{yogaClass.duration}</p>

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-rose-500">
                      About this Class
                    </h3>
                    <p className="text-sm text-gray-700 mt-2">
                      {yogaClass.description}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {yogaClass.details}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="text-rose-500">
                    <Heart size={20} />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download size={20} />
                  </Button>
                </div>
              </div>
            </CardContent>
          </div>
          <CardFooter className="bg-gray-50 px-4 py-3 flex justify-between">
            <Button
              variant="outline"
              className="text-gray-700 border-gray-300"
              onClick={handleDetailsClick}
            >
              Details
            </Button>
            <Button className="bg-rose-500 hover:bg-rose-600 text-white">
              Watch Now
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
