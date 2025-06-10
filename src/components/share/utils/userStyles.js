export const getUserStyles = (userType) => {
  switch (userType) {
    case "normal":
      return {
        bg: "bg-black",
        text: "text-gray-800",
        border: "border-gray-300",
        logo: "#fff",
        buttonBg: "bg-gray-200",
        buttonText: "text-black",
      };
    case "silver":
      return {
        bg: "bg-red-500",
        text: "text-black",
        border: "border-slate-500",
        logo: "#a0a0a0",
        buttonBg: "bg-slate-300",
        buttonText: "text-black",
      };
    case "premium":
      return {
        bg: "bg-yellow-700",
        text: "text-yellow-900",
        border: "border-yellow-500",
        logo: "#FFD700", // gold color
        buttonBg: "bg-yellow-500",
        buttonText: "text-white",
      };
    default:
      return {
        bg: "bg-white",
        text: "text-black",
        border: "border-gray-200",
        logo: "#000000",
        buttonBg: "bg-gray-100",
        buttonText: "text-black",
      };
  }
};
