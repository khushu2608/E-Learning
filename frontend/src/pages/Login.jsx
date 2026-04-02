import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      const { success, message, token, name, role, error } = result;

      if (success) {
        handleSuccess("Login Successful");

        localStorage.setItem("token", token);
        localStorage.setItem("name", name);
        localStorage.setItem("role", role);

        if (role === "student") {
          navigate("/student");
        } else {
          navigate("/instructor");
        }
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else {
        handleError(message || "Something went wrong!");
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          name="email"
          value={loginData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password */}
        <input
          type="password"
          name="password"
          value={loginData.password}
          placeholder="Enter your password"
          onChange={handleChange}
          required
          className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>

        {/* Extra */}
        <p className="text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Signup
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;