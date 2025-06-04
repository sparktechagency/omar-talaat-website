export const getUserStyles = (userType) => {
  switch (userType) {
    case "normal":
      return {
        bg: "bg-black",
        text: "text-gray-800",
        border: "border-gray-300",
      };
    case "silver":
      return {
        bg: "bg-red-500",
        text: "text-black",
        border: "border-slate-500",
      };
    case "premium":
      return {
        bg: "bg-yellow-700",
        text: "text-yellow-900",
        border: "border-yellow-500",
      };
    default:
      return {
        bg: "bg-white",
        text: "text-black",
        border: "border-gray-200",
      };
  }
};
