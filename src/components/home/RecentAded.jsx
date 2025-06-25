"use client";
import React, { useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbShoppingBagPlus } from "react-icons/tb";
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
    y: 15,
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

const cartIconVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    x: 10,
    y: 5,
    backgroundColor: "transparent",
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
    backgroundColor: "transparent",
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
      duration: 1.5,
    },
  },
  hover: {
    scale: 1,
    backgroundColor: "transparent",
    transition: {
      duration: 0.5,
    },
  },
  tap: {
    scale: 0.95,
    backgroundColor: "transparent",
    transition: {
      duration: 0.3,
    },
  },
};

const ProductCard = ({ index, controls }) => {
  const product = productsData[index];
  const [isHovered, setIsHovered] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setCartClicked(true);

    // Reset animation after 500ms
    setTimeout(() => setCartClicked(false), 500);

    console.log(`Added ${product.title} to cart`);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: 0.2,
        transition: {
          duration: 0.3,
          ease: "easeOut",
        },
      }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      <Card className="w-full h-full cursor-pointer overflow-hidden bg-primary border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
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

        <CardContent className="p-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 2 }}
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

          <div>
            <span className="text-lg font-bold text-white">
              AED {product.price}
            </span>
            <span className="text-sm text-white">.00</span>
          </div>

          {/* Cart Icon */}
          <motion.button
            className="absolute bottom-3 right-3 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg bg-transparent"
            variants={cartIconVariants}
            initial="hidden"
            animate={isHovered ? "visible" : "hidden"}
            whileHover="hover"
            whileTap="tap"
            onClick={handleAddToCart}
          >
            <motion.div
              animate={
                cartClicked
                  ? {
                      scale: [1, 0.3, 1],
                      rotate: [0, 5, -2, 0],
                    }
                  : {}
              }
              transition={{ duration: 0.5 }}
            >
              <TbShoppingBagPlus size={32} />
            </motion.div>
          </motion.button>
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
        initial={{ opacity: 0, x: 20 }}
        animate={controls}
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-xl font-semibold text-white">
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
