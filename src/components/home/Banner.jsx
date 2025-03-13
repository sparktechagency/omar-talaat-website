"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import image15 from "../.../../../../public/assests/banner-bg.jpg";

export default function Banner() {
  return (
    <section className="relative w-full h-[500px] bg-[#18191b] my-12">
      {/* Background Image */}
      <div className="relative w-full h-full overflow-hidden rounded-b-[50px]">
        <Image
          src={image15}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-2">
            High Quality, High Standards, Your Choice
          </h1>
          <p className="text-2xl sm:text-3xl md:text-4xl font-black mb-6">
            Premium cannabis, trusted <br /> quality, your way.
          </p>
          {/* Optional Button */}
          <Button className="mt-4">Learn More</Button>
        </div>
      </div>
    </section>
  );
}
