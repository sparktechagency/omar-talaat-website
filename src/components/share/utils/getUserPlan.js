// utils/getUserPlan.js
export const getUserPlan = (wallet) => {
  if (!wallet) {
    return {
      plan: "free",
      classes: {
        border: "relative rounded-full p-[2px] bg-white",
        inner: "bg-[#181818] rounded-full w-full h-full flex items-center justify-center",
        border2: "border border-white",
        text: "text-white",
        bg: "bg-white",
      },
    };
  }

  if (wallet.normalPlan) {
    return {
      plan: "normal",
      classes: {
        border: "relative  p-[2px] bg-gradient-to-l from-[#fff] to-[#fff]",
        inner: "bg-[#000]  w-full h-full ",
        border2: "border-transparent rounded-full bg-clip-border [border-image:linear-gradient(270deg,#fff,#fff)_1]",
        text: "bg-gradient-to-l from-[#fff] to-[#fff] bg-clip-text text-transparent",
         text3: "text-black",
         text2: "text-white",
        bg: "bg-gradient-to-l from-[#fff] to-[#fff]",
      },
      svgColor: "#fff",
      iconColor:"#fff",

    };
  }

  if (wallet.advancePlan) {
    return {
      plan: "advance",
      classes: {
        border: "relative  p-[2px] bg-gradient-to-l from-[#057199] to-[#69CDFF]",
        inner: "bg-[#000]  w-full h-full ",
        border2:
        "border-transparent rounded-full bg-clip-border [border-image:linear-gradient(270deg,#057199,#69CDFF)_1]",
        text: "bg-gradient-to-l from-[#057199] to-[#69CDFF] bg-clip-text text-transparent",
        text2: "text-white",
        text3: "text-black",
     
        bg: "bg-gradient-to-l from-[#057199] to-[#69CDFF]",
      },
      svgColor: "#69CDFF",
      iconColor:"#69CDFF",

    };
  }

  if (wallet.premiumPlan) {
    return {
      plan: "premium",
      classes: {
        border: "relative  p-[2px] bg-gradient-to-l from-[#FEF488] to-[#DB9D17]",
        inner: "bg-[#000]  w-full h-full ",
        border2:
        "border-transparent rounded-full bg-clip-border [border-image:linear-gradient(90deg,#FEF488,#DB9D17)_1]",
        text: "bg-gradient-to-r from-[#FEF488] to-[#DB9D17] bg-clip-text text-transparent",
        text3: "text-black",

        text2: "text-white",
        bg: "bg-gradient-to-r from-[#FEF488] to-[#DB9D17]",
      },
      svgColor: "#DB9D17",
      iconColor:"#DB9D17",

    };
  }

  return {
    plan: "free",
    classes: {
      border: "relative p-[2px] bg-white",
      inner: "bg-[#000]  w-full h-full flex items-center justify-center",
      text: "text-white",
      bg: "bg-white",
    },
  };
};
