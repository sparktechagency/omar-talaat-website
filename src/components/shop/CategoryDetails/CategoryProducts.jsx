"use client";
import React, { useState } from "react";
import Image from "next/image";

// Sample static data for categories
const categories = [
  {
    id: 1,
    title: "Coral Reef",
    description: "Explore the vibrant world of coral reef aquariums...",
    src: "/assets/category3.png",
    products: [
      { id: 1, name: "Coral Frags", price: "$29.99" },
      { id: 2, name: "Saltwater Aquarium Kit", price: "$199.99" },
    ],
  },
  {
    id: 2,
    title: "Ocean Depths",
    description: "Dive into the mysterious depths of the ocean...",
    src: "/assets/category2.png",
    products: [
      { id: 1, name: "Deep Sea Fish", price: "$59.99" },
      { id: 2, name: "Oceanic Filter System", price: "$129.99" },
    ],
  },
  // Add more categories here...
];

const CategoryProducts = () => {
  // You can manually select a category for now. E.g. using index 0 (for Coral Reef)
  const selectedCategory = categories[0]; // Set this to whichever category you want to show

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 pt-60">
      {/* Back button */}
      <button
        onClick={() => window.history.back()} // Goes back to the previous page
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        ← Back to Categories
      </button>

      <div className="md:flex">
        {/* Category Image */}
        <div className="md:w-1/2">
          <Image
            src={selectedCategory.src}
            alt={selectedCategory.title}
            width={500}
            height={400}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>

        {/* Category Details */}
        <div className="md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {selectedCategory.title}
          </h1>
          <p className="text-gray-600 leading-relaxed">
            {selectedCategory.description}
          </p>
        </div>
      </div>

      {/* Category Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {selectedCategory.products.map((product) => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600 mt-2">{product.price}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
