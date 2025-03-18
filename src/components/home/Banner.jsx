"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import banner from "../.../../../../public/assests/banner1.png";
import banner1 from "../.../../../../public/assests/banner.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Array of banner images and content
  const banners = [
    {
      image: banner1,
      title: "High Quality, High Standards, Your Choice",
      description: "Premium cannabis, trusted quality, your way.",
      buttonText: "Learn More",
    },
    {
      image: banner,
      title: "Experience The Difference",
      description: "Carefully selected varieties for every preference.",
      buttonText: "Shop Now",
    },
    {
      image: banner1,
      title: "High Quality, High Standards, Your Choice",
      description: "Premium cannabis, trusted quality, your way.",
      buttonText: "Learn More",
    },
  ];

  // Function to go to next slide with smooth transition
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Function to go to previous slide with smooth transition
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 700);
  };

  // Auto slide functionality - slides every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 2 seconds as requested

    return () => clearInterval(interval);
  }, []);

  // Function to handle dot navigation
  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  };

  return (
    <section className="relative w-full h-[500px] bg-[#18191b] my-12 overflow-hidden">
      {/* Carousel Container */}
      <div
        className="flex transition-all ease-in-out duration-700 h-full"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${banners.length * 100}%`,
        }}
      >
        {banners.map((banner, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
          
            {/* Background Image */}
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src={banner.image}
                alt={`Banner Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
                priority={index === 0}
              />
            </div>

            {/* Text Overlay - Ensures text stays centered */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6 sm:px-12">
              <div className="max-w-2xl">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {banner.title}
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-medium leading-snug">
                  {banner.description}
                </p>
                <Button className="mt-4 px-6 py-3 text-lg">
                  {banner.buttonText}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls - Moved to the bottom */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center space-x-6">
        {/* Indicator Dots */}
        <div className="flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-white"
                  : "bg-red-300 bg-opacity-10 hover:bg-opacity-30"
              }`}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
