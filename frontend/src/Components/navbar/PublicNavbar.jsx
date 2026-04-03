import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function PublicNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-md">

      {/* Logo */}
      <h1
        onClick={() => navigate("/")}
        className="text-2xl font-extrabold text-blue-600 cursor-pointer tracking-wide hover:scale-105 transition duration-200"
      >
        E-Learning
      </h1>

      {/* Buttons */}
      <div className="flex gap-5">

        {/* Login */}
        <button
          onClick={() => navigate("/login")}
          className={`px-5 py-2 rounded-lg font-semibold transition duration-200
            ${location.pathname === "/login"
              ? "bg-blue-500 text-white"
              : "border border-blue-500 text-blue-500 hover:bg-blue-100"}
          `}
        >
          Login
        </button>

        {/* Signup */}
        <button
          onClick={() => navigate("/")}
          className={`px-5 py-2 rounded-lg font-semibold transition duration-200
            ${location.pathname === "/"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-blue-500 text-white hover:bg-blue-600"}
          `}
        >
          Sign Up
        </button>

      </div>
    </nav>
  );
}

export default PublicNavbar;