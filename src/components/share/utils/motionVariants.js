// animations/motionVariants.js

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95, 
  },
  visible: {
    opacity: 1,
    y: 15,
    scale: 1,
    transition: {
      duration: 0.8, 
      ease: "easeInOut", 
      delay: 0.3, 
    },
  },
};




export const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

export const cartIconVariants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};
