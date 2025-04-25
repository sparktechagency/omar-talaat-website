// AuthLayout.jsx
import React from "react";

const AuthLayout = ({ children }) => {
  const bgImage = "https://i.ibb.co.com/C5dPm7xb/Frame-2147226698.png"; // You can define the bgImage variable here or pass it as a prop

  return (
    <div
      style={{
        background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, rgba(0, 0, 0, 0.70) 100%), url(${bgImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
      }}
    >
      <div className="w-full" style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
