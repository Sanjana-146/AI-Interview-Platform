import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Signin({ onToggle }) {
  const { backendUrl, setIsLoggedIn, setUser } = useContext(AppContext)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await fetch(backendUrl + '/api/auth/signin', {
        method: "POST",
        credentials: "include", // To allow cookie to be stored
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Login successful!");
        setIsLoggedIn(true);
        setUser(data.user);
        navigate("/");
        // redirect or store token/session if needed
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-purple-900 opacity-30"></div>

      <div className="relative z-10 bg-[#1E1E1E] w-[90%] max-w-md rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 bg-[#2a2a2a] rounded-full p-1">
            <button onClick={onToggle} className="px-4 py-1 text-sm font-semibold text-white">Sign up</button>
            <button className="px-4 py-1 text-sm font-semibold bg-white text-black rounded-full">Sign in</button>
          </div>

        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password with Show/Hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] p-3 pr-16 rounded-md outline-none placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-3 -translate-y-1/2 p-1 rounded-md hover:opacity-90 focus:outline-none focus:ring"
              aria-label={showPassword ? "Hide password" : "Show password"}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}{" "}
              {/* ✅ icon only */}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        </form>



        <p className="text-xs text-gray-500 mt-6 text-center">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms & Service
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;