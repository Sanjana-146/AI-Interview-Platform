import React, { useState } from "react";
import Signup from "./Signup";
import Login from "./Signin";
import { useLocation , useNavigate } from "react-router-dom";
import "../components/custom/FloatingBackground.css";

export default function AuthContainer() {
   const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    if (location.pathname === "/signup") {
      navigate("/signin");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-r from-[#0b0f14] via-[#0b0f14] to-[#0a0e14] text-white px-4"
    >
      {/* Floating Boxes Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="box"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
      <div className="relative z-10 w-full max-w-md">
        {location.pathname === "/signup" ? (
          <Signup onToggle={handleToggle} />
        ) : location.pathname === "/signin" ? (
          <Login onToggle={handleToggle} />
        ) : null}
      </div>
    </div>
  );
}
