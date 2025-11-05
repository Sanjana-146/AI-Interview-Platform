import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext.jsx";

function Signup({ onToggle }) {
  const { backendUrl, setIsLoggedIn, setUser } = useContext(AppContext)
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!formData.fName.trim())
      newErrors.fName = "First name is required";
    if (!formData.lName.trim()) newErrors.lName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 10 digits";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must be at least 8 characters, include a number, an uppercase letter, and a special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await fetch(backendUrl + '/api/auth/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // ⬅️ This is important to receive the httpOnly cookie
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Signup failed.");
        return;
      }

      alert("Signup successful!");
      setIsLoggedIn(true);
      setUser(data.user);
      navigate("/");

    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong. Please try again.");
    }
  };
  const navigate = useNavigate();
  const handleToggle = (target) => {
    onToggle(); // this handles UI toggle logic
    navigate(target); // this updates the URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center opacity-75 text-white relative">
      <div className="absolute inset-0  opacity-30"></div>

      <div className="shadow-2xs shadow-blue-500  border border-white/10 z-10 bg-gradient-to-r from-[#0b0f14] via-[#0b0f14] to-[#0a0e14] w-[90%] max-w-md rounded-2xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 bg-[#2a2a2a] rounded-full p-1">
            <button
              onClick={() => handleToggle('/signup')}
              className="px-4 py-1 text-sm font-semibold bg-blue-500 text-white rounded-full"
            >
              Sign up
            </button>
            <button
              onClick={() => handleToggle('/signin')}
              className="px-4 py-1 text-sm font-semibold text-white"
            >
              Sign in
            </button>
          </div>

        </div>

        <h2 className="text-xl font-semibold mb-4">Create an <span className="text-blue-500">account</span> </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <div className="w-1/2">
              <input
                type="text"
                name="fName"
                placeholder="First name"
                value={formData.fName}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
              />
              {errors.fName && (
                <p className="text-red-400 text-sm mt-1">{errors.fName}</p>
              )}
            </div>

            <div className="w-1/2">
              <input
                type="text"
                name="lName"
                placeholder="Last name"
                value={formData.lName}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
              />
              {errors.lName && (
                <p className="text-red-400 text-sm mt-1">{errors.lName}</p>
              )}
            </div>
          </div>

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

          <div>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-sm text-gray-400 hover:text-white focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Create an account
          </button>
        </form>

       

       

        <p className="text-xs text-white mt-6 text-center">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms & Service
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;