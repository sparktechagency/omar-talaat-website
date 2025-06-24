// utils/animations.js

// 🔵 ১. Bubble Animation (floating effect)
export const bubbleFloat = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🔄 ২. Bounce Animation
export const bounce = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// 🎯 ৩. Hover-expand Button Animation
export const circleToButton = {
  initial: {
    width: 50,
    height: 50,
    borderRadius: "999px",
    backgroundColor: "#1e40af", // tailwind blue-800
    color: "transparent",
  },
  hover: {
    width: 150,
    borderRadius: "12px",
    backgroundColor: "#1d4ed8", // tailwind blue-700
    color: "#fff",
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};
