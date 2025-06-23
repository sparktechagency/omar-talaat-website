"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const productsData = [
  {
    id: 1,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/category1.png",
  },
  {
    id: 2,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/category9.png",
  },
  {
    id: 3,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/category5.png",
  },
  {
    id: 4,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/category4.png",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const priceVariants = {
  hover: {
    scale: 1.1,
    color: "#10b981",
    transition: {
      duration: 0.2,
    },
  },
};

const ProductCard = ({ index, controls }) => {
  const product = productsData[index];

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -8,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.2 },
      }}
      whileTap={{ scale: 0.98 }}
    >
      <Card className="w-full h-full  cursor-pointer overflow-hidden bg-primary border border-gray-200 hover:border-gray-300 transition-colors duration-300">
        <CardHeader className="p-0">
          <motion.div
            className="relative w-full h-48 overflow-hidden"
            variants={imageVariants}
            whileHover="hover"
          >
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-500"
            />
            <motion.div
              className="absolute inset-0 bg-black opacity-0"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </CardHeader>

        <CardContent className="p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <CardTitle className="text-sm font-medium text-white mb-1 line-clamp-2">
              {product.title}
            </CardTitle>
            <motion.p
              className="text-xs text-white mb-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {product.subtitle}
            </motion.p>
          </motion.div>

          <motion.div
            className="flex items-baseline space-x-1"
            variants={priceVariants}
            whileHover="hover"
          >
            <span className="text-lg font-bold text-white">
              AED {product.price}
            </span>
            <span className="text-sm text-white">.00</span>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RecentAdded = () => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      className="w-full px-4 lg:px-0 container mx-auto"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: -20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-xl font-semibold text-white ">
          Recent Added
        </CardTitle>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {productsData.map((_, idx) => (
          <motion.div key={idx} variants={cardVariants} layout>
            <ProductCard index={idx} controls={controls} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentAdded;
