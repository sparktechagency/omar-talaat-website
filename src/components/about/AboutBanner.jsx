"use client";

import Image from "next/image";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import image15 from "../../../public/assests/image15.png";
import image5 from "../../../public/assests/image5.png";
import { GiMachineGun } from "react-icons/gi";
import { PiFlowerLotusLight } from "react-icons/pi";



export default function AboutBanner() {
  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center lg:items-start justify-center p-4 lg:p-8 text-white">
      {/* Left Section - Images */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start mb-8 lg:mb-0">
        <div className="relative">
          {/* First Image */}
          <Image
            src="/assests/aboutPage.png"
            alt="Image 1"
            height={600}
            width={800}
            objectFit="cover"
            className="rounded-lg"
          />
          {/* Second Image - Positioned relative to the first image */}
          <div className="absolute bottom-2 -right-0 md-right-16 lg:right-32">
            <Image
              src="/assests/aboutPage2.png"
              alt="Image 2"
              height={120}
              width={150}
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Right Section - FAQ */}
      <div className="w-full lg:w-1/2 mt-10 lg:mt-0">
        <h2 className="text-3xl font-bold text-red mb-3">
          Welcome to Qilo co.
        </h2>
        <h2 className="text-3xl font-bold mb-2">
          Cultivating Quality, Inspiring Wellness .
        </h2>
        <p className="mb-6">
          At Qilo co., we are dedicated to cultivating premium, high-quality
          cannabis products that inspire wellness, enhance lives, and promote
          natural harmony. Our passion lies in creating exceptional experiences,
          fostering community connections, and empowering individuals through
          the power of cannabis.
        </p>
        <div className="w-80 space-y-6">
          <ul>
            <li className="flex items-center gap-4">
              <PiFlowerLotusLight className="text-3xl text-white" size={50} />
              <span>
                <h2 className=" font-bold">Plant Based Ingredients</h2>
                <p className="text-description text-sm">
                  We craft products with pure, plant-based ingredients for
                  natural wellness solutions.
                </p>
              </span>
            </li>
          </ul>
          <ul>
            <li className="flex items-center gap-4">
              <GiMachineGun className=" text-white" size={45}/>
              <span>
                <h2 className=" font-bold">Third Party Lab Tested</h2>
                <p className="text-description text-sm">
                  Our products are third-party lab tested to ensure safety and
                  quality.
                </p>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
