import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function Signin({ onToggle }) {
  // const { backendUrl, setIsLoggedIn, setUser } = useContext(AppContext)
  const backendUrl = ""; 
  const setIsLoggedIn = (status) => console.log(`User logged in status set to: ${status}`);
  const setUser = (user) => console.log("User context set to:", user);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  
  // --- State for Forgot Password Modal ---
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [loading, setLoading] = useState(false);


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

  // --- Function to handle the forgot password request ---
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      alert("Please enter your email address.");
      return;
    }
    setLoading(true);

    try {
      // This is the new endpoint you need to create on your backend
      const response = await fetch(backendUrl + '/api/auth/send-reset-otp', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();

      if (data.success) {
        alert("A password reset OTP has been sent to your email.");
        setIsForgotModalOpen(false);
        // Navigate to the reset page, passing the email along so the next page knows who is resetting
        navigate("/reset-password", { state: { email: forgotEmail } });
      } else {
        alert(data.message || "Failed to send OTP. Please check the email address.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center  opacity-75 text-white relative">
      <div className="absolute inset-0  opacity-30"></div>

      <div className="relative shadow-2xs shadow-blue-500 border border-white/10 bg-gradient-to-r from-[#0b0f14] via-[#0b0f14] to-[#0a0e14] w-[90%] max-w-md rounded-2xl  p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2 bg-[#2a2a2a] rounded-full p-1">
            <button onClick={onToggle} className="px-4 py-1 text-sm font-semibold text-white">Sign up</button>
            <button className="px-4 py-1 text-sm font-semibold bg-white text-black rounded-full">Sign in</button>
          </div>

        </div>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-4">Welcome  <span className="text-blue-500">Back</span></h2>

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

          <div className="text-left mt-4">
            <div className="text-right">
              <button type="button" onClick={() => setIsForgotModalOpen(true)} className="text-sm text-gray-400 hover:underline">
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition"
          >
            Sign In
          </button>
        </form>



        <p className="text-xs text-white mt-6 text-center">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline">
            Terms & Service
          </Link>
        </p>
      </div>
    </div>
    {/* --- Forgot Password Modal --- */}
      {isForgotModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-[#1E1E1E] p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h3 className="text-xl font-semibold mb-4">Reset Password</h3>
            <p className="text-gray-400 mb-6">Enter your email address and we will send you an OTP to reset your password.</p>
            <form onSubmit={handleForgotPassword}>
              <input type="email" placeholder="Enter your registered email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="w-full bg-[#2a2a2a] p-3 rounded-md outline-none placeholder:text-gray-400 mb-4" />
              <div className="flex gap-4">
                <button type="button" onClick={() => setIsForgotModalOpen(false)} className="w-full bg-[#2a2a2a] text-white font-semibold py-3 rounded-md hover:bg-gray-600 transition">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="w-full bg-white text-black font-semibold py-3 rounded-md hover:bg-gray-200 transition disabled:opacity-50">
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      </>
  );
}

export default Signin;