"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created");
      window.location.href = "/login";
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account 
        </h1>

        <div className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

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
            onClick={handleRegister}
            className="bg-blue-500 text-white py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-semibold"
            >
              Sign In
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}