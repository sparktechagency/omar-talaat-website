"use client"

import React, { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  Heart,
  Share2,
  Eye,
  ShoppingCart,
} from "lucide-react";
import Image from "next/image";
import { CoinsLogo, Logo } from "../share/svg/Logo";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const productImages = [
    "https://i.ibb.co/fYZx5zCP/Region-Gallery-Viewer.png",
    "https://i.ibb.co/JR01nZWv/underwater-landscape-23-2150440386.jpg",
    "https://i.ibb.co/JWgXSZcb/vibrant-coral-reef-aquarium-ornament-stunning-underwater-scene-191095-85646.jpg",
    "https://i.ibb.co/fYZx5zCP/Region-Gallery-Viewer.png",
  ];

  const relatedProducts = [
    {
      id: 1,
      name: "Rainbow Zoanthids",
      price: 89.50,
      image:
        "https://i.ibb.co/JWgXSZcb/vibrant-coral-reef-aquarium-ornament-stunning-underwater-scene-191095-85646.jpg",
    },
    {
      id: 2,
      name: "Fire Zoanthids",
      price: 75.50,
      image: "https://i.ibb.co/JR01nZWv/underwater-landscape-23-2150440386.jpg",
    },
    {
      id: 3,
      name: "Green Bay Packers",
      price: 125.60,
      image: "https://i.ibb.co/fYZx5zCP/Region-Gallery-Viewer.png",
    },
    {
      id: 4,
      name: "Blue Hornets",
      price: 95.50,
      image:
        "https://i.ibb.co/JWgXSZcb/vibrant-coral-reef-aquarium-ornament-stunning-underwater-scene-191095-85646.jpg",
    },
  ];

  const handleQuantityChange = (change) => {
    setQuantity(Math.max(1, quantity + change));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative   rounded-2xl overflow-hidden border border-purple-500/20">
              <Image
                src={productImages[selectedImage]}
                alt="CS Purple Hornets Zoanthids"
                height={747}
                width={747}
                className="w-full h-[600px]  object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Thumbnail Images */}
            {/* <div className="grid grid-cols-4 gap-3">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-purple-500 ring-2 ring-purple-500/50"
                      : "border-gray-700 hover:border-purple-400"
                  }`}
                >
                  <img
                    src={image}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div> */}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-2 ">
              {/* <div className="flex items-center gap-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full  text-purple-300 border text-sm">
                  <span className="w-2 h-2  rounded-full mr-2"></span>
                  CS Purple Hornets Zoanthids
                </div>
              </div> */}
              <h1 className="text-3xl lg:text-4xl font-bold mb-6 text-white ">
                CS Purple Hornets Zoanthids
              </h1>

              {/* <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span>512</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>235</span>
                </div>
              </div> */}
            </div>

            {/* Price */}
            <div className="space-y-2 mb-16">
              <div className="text-2xl font-bold text-white mb-9">
                AED 99.50
              </div>
              <div className="flex items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2 ">
                  <Logo />
                  <p className="font-brush text-3xl">512</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <CoinsLogo />
                  <p className="font-brush text-3xl">235</p>
                </div>
              </div>
            </div>

            <div className="flex items-center mb-8 gap-4">
              {/* Quantity Selector */}
              <div className="w-1/3  space-y-3">
                {/* <label className="text- font-bold text-gray-300">
                  Quantity
                </label> */}
                <div className="flex text-center justify-center items-center gap-3">
                  <div className="flex w-full justify-center items-center border border-gray-700 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="p-2 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 text-center min-w-[3rem]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="p-2 hover:bg-gray-800"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="w-2/3 space-y-3 ">
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 text-lg font-semibold rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to cart
                </button>
                {/* 
              <div className="flex gap-3">
                <button className="flex-1 border border-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
                <button className="flex-1 border border-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div> */}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">Description:</h3>
              <p className="text-gray-300 leading-relaxed">
                Cut to order. A frag will be cut upon ordering. We recommend a
                waiting time of 2 weeks before delivery! These stunning Purple
                Hornets Zoanthids feature vibrant purple polyps with striking
                patterns that will add incredible color to your reef aquarium.
              </p>
            </div>

            {/* Care Instructions */}
            {/* <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white">
                Care Instructions:
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-purple-400 font-medium">Lighting:</p>
                  <p className="text-gray-300">Medium to High</p>
                </div>
                <div className="space-y-1">
                  <p className="text-purple-400 font-medium">Flow:</p>
                  <p className="text-gray-300">Low to Medium</p>
                </div>
                <div className="space-y-1">
                  <p className="text-purple-400 font-medium">Difficulty:</p>
                  <p className="text-gray-300">Beginner</p>
                </div>
                <div className="space-y-1">
                  <p className="text-purple-400 font-medium">Placement:</p>
                  <p className="text-gray-300">Bottom to Middle</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        {/* You may also like section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 border border-gray-800 hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer group rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="aspect-square rounded-lg mb-4 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute top-2 right-2">
                      <button className="h-8 w-8 hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-medium text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-white opacity-50 italic">Cut to Order</p>
                  <p className="text-xl font-bold text-purple-400 ml-2">
                    AED {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
