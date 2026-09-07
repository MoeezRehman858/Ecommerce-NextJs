"use client";

import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("Fill in every field to continue.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        window.location.href = "/login";
      } else {
        setError(data.message || "Something went wrong. Try again.");
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
            "radial-gradient(120% 90% at 15% 10%, #1a1530 0%, #0B0B10 55%)",
          clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)",
        }}
      >
        {/* floating gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute w-72 h-72 rounded-full blur-3xl opacity-40 animate-[float1_9s_ease-in-out_infinite]"
            style={{ background: "#7C5CFC", top: "-40px", left: "-60px" }}
          />
          <div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-30 animate-[float2_11s_ease-in-out_infinite]"
            style={{ background: "#33E6CC", bottom: "40px", right: "-40px" }}
          />
        </div>

        {/* noise texture */}
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
            Join the
            <br />
            <span className="bg-gradient-to-r from-[#7C5CFC] to-[#33E6CC] bg-clip-text text-transparent">
              front row.
            </span>
          </h1>
          <p className="text-[#8B8B99] text-sm md:text-base max-w-xs">
            Create an account to track orders, save your wishlist, and check
            out faster next time.
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
            Create your account
          </h2>
          <p className="text-[#8B8B99] text-sm mb-8">
            Already have one?{" "}
            <Link href="/login" className="text-[#33E6CC] hover:underline">
              Sign in
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            <FloatingInput
              label="Full name"
              type="text"
              value={name}
              onChange={setName}
            />
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
              onClick={handleRegister}
              disabled={loading}
              className="relative mt-2 py-3 rounded-xl font-semibold text-[#0B0B10] transition disabled:opacity-60 disabled:cursor-not-allowed"
              style={{
                background: "linear-gradient(90deg, #7C5CFC, #33E6CC)",
              }}
            >
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="text-center text-[#5A5A66] text-xs mt-2">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, 30px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-25px, -20px); }
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
          ? "linear-gradient(90deg, #7C5CFC, #33E6CC)"
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
