import React, { useState } from "react";
import Signup from "./signup";
import Login from "./Signin";
import { useLocation , useNavigate } from "react-router-dom";


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
    <>
      {location.pathname === "/signup" ? (
        <Signup onToggle={handleToggle} />
      ) : location.pathname === "/signin" ? (
        <Login onToggle={handleToggle} />
      ) : null}
    </>
  );
}
