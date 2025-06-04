"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const productsData = [
  {
    id: 1,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
  },
  {
    id: 2,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
  },
  {
    id: 3,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
  },
  {
    id: 4,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
  },
];

const ProductCard = ({ index }) => {
  const product = productsData[index];
  return (
    <Card className="bg-black shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden w-full">
      <div className="h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-900 via-blue-800 to-purple-800" />
      <CardContent className="p-4">
        <CardHeader className="p-0 mb-2">
          <CardTitle className="text-white text-base sm:text-lg font-semibold">
            {product.title}
          </CardTitle>
        </CardHeader>
        <p className="text-gray-400 text-sm mb-3">{product.subtitle}</p>
        <div className="flex items-center space-x-1">
          <span className="text-white text-xl font-bold">{product.price}</span>
          <span className="text-gray-400 text-sm align-top">.00</span>
        </div>
      </CardContent>
    </Card>
  );
};

const RecentAdded = () => {
  return (
      <div className="px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-3xl lg:text-5xl mb-6">Recent Added</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {productsData.map((_, idx) => (
          <ProductCard key={productsData[idx].id} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default RecentAdded;
