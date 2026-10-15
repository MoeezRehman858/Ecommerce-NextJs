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
            Join the
            <br />
            <span className="text-brand">front row.</span>
          </h1>
          <p className="text-muted text-sm md:text-base max-w-xs">
            Create an account to track orders, save your wishlist, and check
            out faster next time.
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
            Create your account
          </h2>
          <p className="text-muted text-sm mb-8">
            Already have one?{" "}
            <Link
              href="/login"
              className="text-ink underline underline-offset-4 hover:text-soft"
            >
              Sign in
            </Link>
          </p>

          <div className="flex flex-col gap-4">
            <Field label="Full name" type="text" value={name} onChange={setName} />
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
              onClick={handleRegister}
              disabled={loading}
              className="mt-2 py-3 rounded-xl font-semibold text-bg bg-brand hover:bg-brand-hover transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>

            <p className="text-center text-faint text-xs mt-2">
              By continuing you agree to our Terms and Privacy Policy.
            </p>
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
