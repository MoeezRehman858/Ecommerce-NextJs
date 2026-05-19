"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Login successful");
      window.location.href = "/";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome Back 👋
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Sign In
          </button>

          <p className="text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-semibold"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}