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
    <div className="min-h-screen bg-bg flex flex-col md:flex-row">
      {/* Brand panel */}
      <div className="w-full md:w-[42%] bg-surface border-b md:border-b-0 md:border-r border-line p-8 md:p-12 flex flex-col justify-between min-h-[200px] md:min-h-screen">
        <Link href="/">
          <span
            className="text-ink font-bold text-xl tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            My<span className="text-brand">Store</span>
          </span>
        </Link>

        <div className="mt-10 md:mt-0">
          <h1
            className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-4 text-ink"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Welcome
            <br />
            <span className="text-brand">back.</span>
          </h1>
          <p className="text-muted text-sm md:text-base max-w-xs">
            Sign in to pick up your cart, check order status, and get back to
            shopping.
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-0">
        <div className="w-full max-w-sm">
          <h2
            className="text-ink text-2xl font-bold mb-1 tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Sign in
          </h2>
          <p className="text-muted text-sm mb-8">
            New here?{" "}
            <Link
              href="/signup"
              className="text-ink underline underline-offset-4 hover:text-soft"
            >
              Create an account
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            <Field
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
            />

            {error && <p className="text-sm text-red-400 -mt-1">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-2 py-3 rounded-xl font-semibold text-bg bg-brand hover:bg-brand-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
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
  return (
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg border border-line text-ink placeholder:text-faint rounded-xl px-4 py-3 outline-none focus:border-brand transition text-sm"
    />
  );
}
