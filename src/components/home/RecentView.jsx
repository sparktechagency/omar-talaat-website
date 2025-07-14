"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbShoppingBagPlus } from "react-icons/tb";
import Image from "next/image";

// ✅ Import variants from external file
import {
  containerVariants,
  cardVariants,
  imageVariants,
  cartIconVariants,
} from "@/components/share/utils/motionVariants";
import { toast } from "sonner";

const productsData = [
  {
    id: 1,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/gallary.png",
  },
  {
    id: 2,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/gallary.png",
  },
  {
    id: 3,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/gallary.png",
  },
  {
    id: 4,
    title: "CS Purple Hornets Zoanthids",
    subtitle: "Cut to Order",
    price: "99",
    image: "/assets/gallary.png",
  },
];

const ProductCard = ({ product, controls }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    toast.success(`Add to cart successfully`);
  };

  return (
    <>
        <motion.div
       variants={cardVariants}
       initial="hidden"
       animate={controls}
       whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
       onHoverStart={() => setIsHovered(true)}
       onHoverEnd={() => setIsHovered(false)}
       className="relative rounded-3xl overflow-hidden"  // Ensure rounded-3xl and overflow-hidden are here
     >
       <div className="w-full h-96 cursor-pointer rounded-3xl shadow-2xl overflow-hidden bg-primary hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
         <CardHeader className="p-0">
           <motion.div
             className="relative w-full h-64 overflow-hidden"
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
     
         <CardContent className="p-4 relative bg-[#181818] h-28 rounded-b-3xl">  {/* Add rounded-b-3xl here if not already */}
           <motion.div
             initial={{ opacity: 0, y: 2 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.3, duration: 0.4 }}
           >
             <CardTitle className="text-sm font-medium text-white mb-1 line-clamp-2">
               {product.title}
             </CardTitle>
             <motion.p
               className="text-xs text-white"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.4, duration: 0.4 }}
             >
               {product.subtitle}
             </motion.p>
           </motion.div>
     
           {/* Price Area */}
           <div className="absolute bottom-2 left-4 flex items-end rounded-b-3xl gap-1">
             <motion.span
               className="text-lg font-bold text-white"
               animate={isHovered ? { opacity: 0 } : { opacity: 1 }}
               transition={{ duration: 0.3 }}
             >
               AED
             </motion.span>
             <motion.div
               className="flex items-baseline gap-0.5"
               animate={isHovered ? { x: -36 } : { x: 0 }}
               transition={{ duration: 0.5 }}
             >
               <span className="text-lg font-bold text-white">
                 {product.price}
               </span>
               <motion.span
                 className="text-sm text-white"
                 animate={isHovered ? { y: -10, scale: 0.8 } : { y: 0, scale: 1 }}
                 transition={{ duration: 0.5 }}
                 style={{ transformOrigin: "bottom left" }}
               >
                 .00
               </motion.span>
             </motion.div>
           </div>
     
           {/* Cart Button */}
           <motion.button
             className="absolute bottom-3 right-4 w-10 h-10 cursor-pointer hover:scale-110 rounded-full flex items-center justify-center text-black bg-white p-2"
             variants={cartIconVariants}
             initial="hidden"
             animate={isHovered ? "visible" : "hidden"}
             onClick={handleAddToCart}
           >
             <TbShoppingBagPlus size={32} className="scale-110"/>
           </motion.button>
         </CardContent>
       </div>
     </motion.div>

      {/* Toast message */}
      <motion.div
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={
          showSuccessMessage
            ? { opacity: 1, x: 0, scale: 1 }
            : { opacity: 0, x: 100, scale: 0.8 }
        }
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {showSuccessMessage && (
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Successfully added to cart!
          </div>
        )}
      </motion.div>
    </>
  );
};

const RecentAdded = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      className="w-full px-4 mb-12 lg:px-0 container mx-auto"
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className="mb-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: 20 },
          visible: { opacity: 1, x: 0 },
        }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-xl font-semibold text-white">
          Recent View
        </CardTitle>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {productsData.map((product) => (
          <motion.div key={product.id} variants={cardVariants} layout>
            <ProductCard product={product} controls={controls} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default RecentAdded;
