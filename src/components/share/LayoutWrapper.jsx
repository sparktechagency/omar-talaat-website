"use client";
import { usePathname } from "next/navigation";
import PrivateRoute from "./PrivateRoute";
// import PrivateRoute from "@/app/PrivateRoute";

const LayoutWrapper = ({ children }) => {
  const pathname = usePathname();

  // List of routes that are public
  const publicRoutes = [
    
    "/login",
    "/about",
    "/register",

    "/forgot-password",
    "/otp-verify",
    "/reset-password",
    "/user-create",
    // "/contact",
    // "/shop"
  ];

  // If the current page is a public route, don't wrap it with PrivateRoute
  const isPublicPage = publicRoutes.includes(pathname);

  return isPublicPage ? children : <PrivateRoute>{children}</PrivateRoute>;
};

export default LayoutWrapper;