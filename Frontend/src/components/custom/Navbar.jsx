
import React, { useEffect, useRef, useState, useContext} from "react";
import { gsap } from "gsap";
import { Menu, X , User} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // ✅ import router tools
import { AppContext } from "../../context/AppContext";
import Dashboard from './Dashboard.jsx'
import "./Navbar.css";

export default function Navbar() {
  const {isLoggedIn , user , setIsLoggedIn , setUser} = useContext(AppContext);
  const borderRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(borderRef.current, {
      backgroundPosition: "200% center",
      duration: 4,
      ease: "none",
      repeat: -1,
    });

    gsap.set(mobileMenuRef.current, { x: "100%" });
  }, []);

  useEffect(() => {
    if (menuOpen) {
      gsap.to(mobileMenuRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [menuOpen]);

  return (
    <nav className="relative max-w-[90%] sm:max-w-[900px] mx-auto rounded-lg p-[2px]">
      {/* Animated Border */}
      <div
        ref={borderRef}
        className="animated-border absolute inset-0 rounded-lg"
      ></div>

      {/* Inner Navbar */}
      <div className="relative bg-black text-white rounded-lg flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="font-bold text-lg cursor-pointer"
        >
          InterviewReady-AI
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-sm lg:text-base">
          <li className="cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/ats">ATS Score</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/practice">Practice Interviews</Link>
          </li>
          <li className="cursor-pointer">
            <Link to="/support">Support</Link>
          </li>
        </ul>

        {/* 🔄 MODIFIED: Conditional rendering for Auth button or User Profile */}
        <div className="hidden md:block">
          {isLoggedIn && user ? (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              <User size={20} />
              <span>
                Hi, {user.fName}
              </span>
            </Link>
          ) : (
            <button
              onClick={() => navigate("/signup")}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Get Started
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-2/3 h-full bg-black text-white flex flex-col gap-6 p-6 md:hidden z-50"
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={() => setMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Menu items */}
        <h4 onClick={() => navigate("/")} className="cursor-pointer">Home</h4>
        <h4 onClick={() => navigate("/ats")} className="cursor-pointer">ATS Score</h4>
        <h4 onClick={() => navigate("/practice")} className="cursor-pointer">Practice Interviews</h4>
        <h4 onClick={() => navigate("/support")} className="cursor-pointer">Support</h4>

        {isLoggedIn && user ? (
          <Link
            to="/dashboard"
            className="flex items-center justify-center gap-2 bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => setMenuOpen(false)}
          >
            <User size={20} />
            <span>
              Hi, {user.fName}
            </span>
          </Link>
        ) : (
          <button
            onClick={() => {
              navigate("/signup");
              setMenuOpen(false);
            }}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
}