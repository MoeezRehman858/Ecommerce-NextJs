"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/";
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch {
      setError("Couldn't reach the server. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B10] flex flex-col md:flex-row">
      {/* Brand panel */}
      <div
        className="relative w-full md:w-[42%] min-h-[220px] md:min-h-screen overflow-hidden flex flex-col justify-between p-8 md:p-12"
        style={{
          background:
            "radial-gradient(120% 90% at 85% 90%, #12202b 0%, #0B0B10 55%)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 82%)",
        }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 animate-[float1_10s_ease-in-out_infinite]"
            style={{ background: "#33E6CC", bottom: "-40px", right: "-40px" }}
          />
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 animate-[float2_8s_ease-in-out_infinite]"
            style={{ background: "#7C5CFC", top: "20px", left: "-30px" }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <Link href="/" className="relative z-10">
          <span className="text-white font-bold text-xl tracking-tight" style={{ fontFamily: "var(--font-display, sans-serif)" }}>
            MyStore
          </span>
        </Link>

        <div className="relative z-10">
          <h1
            className="text-white text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Welcome
            <br />
            <span className="bg-gradient-to-r from-[#33E6CC] to-[#7C5CFC] bg-clip-text text-transparent">
              back.
            </span>
          </h1>
          <p className="text-[#8B8B99] text-sm md:text-base max-w-xs">
            Sign in to pick up your cart, check order status, and get back to
            shopping.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-0">
        <div className="w-full max-w-sm">
          <h2
            className="text-white text-2xl font-bold mb-1 tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Sign in
          </h2>
          <p className="text-[#8B8B99] text-sm mb-8">
            New here?{" "}
            <Link href="/signup" className="text-[#33E6CC] hover:underline">
              Create an account
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            <FloatingInput
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <FloatingInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {error && (
              <p className="text-sm text-[#FF6B6B] -mt-1">{error}</p>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="relative mt-2 py-3 rounded-xl font-semibold text-[#0B0B10] transition disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #33E6CC, #7C5CFC)",
              }}
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, -25px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(25px, 20px); }
        }
      `}</style>
    </div>
  );
}

function FloatingInput({
  label,
  type,
  value,
  onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className="relative rounded-xl p-[1.5px] transition-all duration-300"
      style={{
        background: focused
          ? "linear-gradient(90deg, #33E6CC, #7C5CFC)"
          : "#2A2A35",
      }}
    >
      <input
        type={type}
        placeholder={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-[#15151D] text-white placeholder-[#5A5A66] rounded-[10px] px-4 py-3 outline-none text-sm"
      />
    </div>
  );
}
