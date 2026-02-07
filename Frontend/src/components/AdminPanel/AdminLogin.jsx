import { useState } from "react";

const ADMIN_ID = "admin123";
const ADMIN_PASS = "password123";

export default function AdminLogin({ setIsAuth }) {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (id === ADMIN_ID && pass === ADMIN_PASS) {
      setIsAuth(true);
    } else {
      setError("Wrong User ID or Password");
      setTimeout(() => setError(""), 2000);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#020d1c] p-4">
        <form
          onSubmit={handleLogin}
          className={`bg-white p-6 rounded-xl w-80 space-y-4 shadow-2xl shadow-blue-700
          animate-login ${error ? "animate-shake" : ""}`}
        >
          <h2 className="text-xl font-bold text-center">
            Admin <span className="text-blue-600">Login</span>
          </h2>

          {/* Admin ID */}
          <input
            type="text"
            placeholder="Admin ID"
            className="w-full border p-2 rounded outline-none
              focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            onChange={(e) => setId(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded outline-none
              focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            onChange={(e) => setPass(e.target.value)}
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            className="w-full bg-blue-600 text-white py-2 rounded
              hover:bg-blue-500 hover:scale-[1.02]
              active:scale-95 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>

      {/* 🔹 Custom Animations */}
      <style>
        {`
          /* Card fade + scale */
          .animate-login {
            animation: fadeScale 0.6s ease-out;
          }

          @keyframes fadeScale {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }

          /* Error shake */
          .animate-shake {
            animation: shake 0.4s;
          }

          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </>
  );
}