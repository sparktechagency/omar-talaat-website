"use client";

import { useState } from "react";
import { BsFillCaretRightFill } from "react-icons/bs";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import image15 from "../.../../../../public/assests/banner-bg.jpg";

const allProducts = [
  {
    id: 1,
    name: "Indica Bliss",
    price: "$50",
    description: "A premium Indica strain for relaxation.",
    image: "/assests/ourShop.png",
    rating: 4.5,
    category: "Cannabis",
  },
  {
    id: 2,
    name: "Sativa Sunrise",
    price: "$60",
    description: "A refreshing Sativa strain for energy.",
    image: "/assests/ourShop2.png",
    rating: 4.8,
    category: "Cannabis",
  },
  {
    id: 3,
    name: "Sativa Sunrise",
    price: "$60",
    description: "A refreshing Sativa strain for energy.",
    image: "/assests/ourShop2.png",
    rating: 4.8,
    category: "Cannabis",
  },
  {
    id: 4,
    name: "Hybrid Harmony",
    price: "$55",
    description: "A balanced Hybrid strain for both worlds.",
    image: "/assests/ourShop3.png",
    rating: 4.3,
    category: "Concentrates",
  },
  {
    id: 5,
    name: "Hybrid Harmony",
    price: "$55",
    description: "A balanced Hybrid strain for both worlds.",
    image: "/assests/ourShop3.png",
    rating: 4.3,
    category: "Concentrates",
  },
  {
    id: 6,
    name: "Hybrid Harmony",
    price: "$55",
    description: "A balanced Hybrid strain for both worlds.",
    image: "/assests/ourShop3.png",
    rating: 4.3,
    category: "Concentrates",
  },
  {
    id: 7,
    name: "Pure Flower",
    price: "$40",
    description: "A classic flower strain for calmness.",
    image: "/assests/ourShop3.png",
    rating: 4.7,
    category: "Flowers",
  },
  {
    id: 8,
    name: "Pure Flower",
    price: "$40",
    description: "A classic flower strain for calmness.",
    image: "/assests/ourShop3.png",
    rating: 4.7,
    category: "Flowers",
  },
  {
    id: 9,
    name: "Pure Flower",
    price: "$40",
    description: "A classic flower strain for calmness.",
    image: "/assests/ourShop3.png",
    rating: 4.7,
    category: "Flowers",
  },
  {
    id: 10,
    name: "Pre-Roll Delight",
    price: "$30",
    description: "Convenient pre-roll for easy use.",
    image: "/assests/image5.png",
    rating: 4.0,
    category: "Pre-Rolls",
  },
  {
    id: 11,
    name: "Pre-Roll Delight",
    price: "$30",
    description: "Convenient pre-roll for easy use.",
    image: "/assests/image5.png",
    rating: 4.0,
    category: "Pre-Rolls",
  },
  {
    id: 12,
    name: "Pre-Roll Delight",
    price: "$30",
    description: "Convenient pre-roll for easy use.",
    image: "/assests/image5.png",
    rating: 4.0,
    category: "Pre-Rolls",
  },
];

export default function OurShop() {
  const [activeTab, setActiveTab] = useState("Cannabis"); // Default active tab is "Cannabis"

  // Filter products based on the active tab
  const filteredProducts = allProducts.filter(
    (product) => product.category === activeTab
  );

  return (
    <section className="relative w-full h-[1050px] md:h-[600px] bg-[#18191b] my-12">
      {/* Background Image with Opacity Layer */}
      <div className="relative w-full h-full overflow-hidden rounded-b-[50px]">
        <Image
          src={image15}
          alt="Banner Image"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 p-2 md:p-10">
        {/* Title and Description */}
        <div className=" ml-6 mb:block">
          <h4 className="text-sm mb-4 text-red ">Our Shop</h4>
          <h2 className="text-3xl font-bold text-white">
            Buy Cannabis <br /> Here
          </h2>

          <div className="flex items-center justify-center text-center text-white px-4 flex-col md:flex-row">
            {/* Tabs */}
            <div className="md:w-1/4 space-y-4 mt-5 md:space-y-10 md:block grid grid-cols-2">
              {["Cannabis", "Concentrates", "Flowers", "Pre-Rolls"].map(
                (tab) => (
                  <div
                    key={tab}
                    className={`flex gap-3 cursor-pointer ${
                      activeTab === tab ? "text-white" : "text-description"
                    }`}
                    onClick={() => setActiveTab(tab)} // Set active tab on click
                  >
                    <BsFillCaretRightFill />
                    <p>{tab}</p>
                  </div>
                )
              )}
            </div>

            {/* Product Cards */}
            <div className="md:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 gap-y-4  md:gap-6 mt-6">
              {filteredProducts
                .slice(0, window.innerWidth < 768 ? 2 : 3) // Show 2 items on small screens, 3 on md+
                .map((product) => (
                  <Card
                    key={product.id}
                    className="p-2 shadow-lg rounded-xl bg-[#222]"
                  >
                    <div className="relative">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg mx-auto"
                      />
                    </div>
                    <CardContent className="mt-4 flex flex-col items-start w-full">
                      <h3 className="text-xl font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="text-description mt-1 text-start">
                        {product.description}
                      </p>

                      <div className="flex justify-between gap-12 items-start">
                        <div className="flex flex-col items-start">
                          <p className="text-white font-bold mt-2">
                            {product.price}
                          </p>

                          {/* Star Rating */}
                          <div className="flex items-center mt-2 space-x-1">
                            {Array.from({
                              length: Math.floor(product.rating),
                            }).map((_, index) => (
                              <FaStar key={index} className="text-yellow-500" />
                            ))}

                            {/* Handle fractional part dynamically */}
                            {product.rating % 1 !== 0 && (
                              <div className="relative w-4 h-4 flex items-start justify-center">
                                <FaStar className="text-gray-500" />
                                <FaStar
                                  className="text-yellow-500 absolute left-0 top-0"
                                  style={{
                                    clipPath: `inset(0 ${
                                      100 - (product.rating % 1) * 100
                                    }% 0 0)`,
                                  }}
                                />
                              </div>
                            )}

                            <span className="ml-1 text-gray-300">
                              {product.rating}
                            </span>
                          </div>
                        </div>

                        <Button className="mt-4 bg-button text-white py-2 rounded-lg">
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
