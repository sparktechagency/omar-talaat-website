"use client";
// import { useDispatch } from "react-redux";
// import { addToCart } from "@/redux/cartSlice";
import { Card, CardContent } from "@/components/ui/card";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Indica Bliss",
    price: "$50",
    rating: 4.5,
    category: "Indica",
    image: "/assests/image5.png",
  },
  {
    id: 2,
    name: "Sativa Sunrise",
    price: "$60",
    rating: 4.7,
    category: "Sativa",
    image: "/assests/fresh-food.jpg",
  },
  {
    id: 3,
    name: "Hybrid Harmony",
    price: "$55",
    rating: 4.6,
    category: "Hybrid",
    image: "/assests/image5.png",
  },
  {
    id: 4,
    name: "Kush King",
    price: "$70",
    rating: 4.8,
    category: "Indica",
    image: "/assests/fresh-food.jpg",
  },
  {
    id: 5,
    name: "Golden Glow",
    price: "$65",
    rating: 4.9,
    category: "Sativa",
    image: "/assests/image5.png",
  },
  {
    id: 6,
    name: "Dream Diesel",
    price: "$58",
    rating: 4.1,
    category: "Hybrid",
    image: "/assests/fresh-food.jpg",
  },
  {
    id: 7,
    name: "Indica Bliss",
    price: "$50",
    rating: 4.5,
    category: "Indica",
    image: "/assests/image5.png",
  },
  {
    id: 8,
    name: "Sativa Sunrise",
    price: "$60",
    rating: 4.7,
    category: "Sativa",
    image: "/assests/fresh-food.jpg",
  },
];

export default function Products() {
  // const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    // dispatch(addToCart(product));
  };

  return (
    <section className="py-12 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="w-full text-center mx-auto mb-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            All Products
          </h2>
          <p className="text-white">
            Discover top-tier cannabis products, carefully curated to provide
            quality, potency, variety, and an exceptional experience.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="p-4 shadow-lg rounded-xl bg-transparent"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    height={200}
                    width={200}
                    className="w-full h-60 object-cover rounded-lg mx-auto"
                    priority={product.id === 1}
                  />
                </div>
                <p className="text-xl font-bold mt-2 absolute top-5 right-5 text-white">
                  {product.price}
                </p>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold mt-4 text-white">
                      {product.name}
                    </h3>

                    <div className="flex items-center mt-2 space-x-1">
                      {Array.from({ length: Math.floor(product.rating) }).map(
                        (_, index) => (
                          <FaStar key={index} className="text-yellow-500" />
                        )
                      )}

                      {/* Handle fractional part dynamically */}
                      {product.rating % 1 !== 0 && (
                        <div className="relative w-4 h-4 flex items-center justify-center">
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
                  <p className="text-gray-400">{product.category}</p>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-6 w-full bg-button text-white py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
