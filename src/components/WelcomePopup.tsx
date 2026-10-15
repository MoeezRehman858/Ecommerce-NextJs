"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("welcomePopup");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
        requestAnimationFrame(() => setVisible(true));
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setVisible(false);
    setTimeout(() => setShowPopup(false), 200);
    localStorage.setItem("welcomePopup", "true");
  };

  const copyCode = () => {
    navigator.clipboard.writeText("WELCOME20");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed inset-0 bg-bg/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="bg-surface border border-line rounded-3xl p-8 max-w-md w-full text-center relative transition-all duration-200"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
          opacity: visible ? 1 : 0,
        }}
      >
        <button
          onClick={closePopup}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-muted hover:text-ink hover:bg-line transition"
        >
          ×
        </button>

        <span className="text-3xl">🎉</span>

        <h2
          className="text-ink text-3xl font-bold mt-3 mb-2 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Welcome!
        </h2>

        <p className="text-muted mb-6 text-sm">
          Enjoy your first shopping experience with us.
        </p>

        <div className="rounded-2xl border border-dashed border-line">
          <div className="bg-bg rounded-[15px] p-5">
            <p className="text-muted text-xs uppercase tracking-wide mb-2">
              Get 20% off your first order
            </p>

            <button
              onClick={copyCode}
              className="flex items-center justify-center gap-2 mx-auto text-2xl font-bold text-accent"
            >
              WELCOME20
              <span className="text-xs font-medium text-faint mt-1">
                {copied ? "copied" : "tap to copy"}
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={closePopup}
          className="w-full mt-6 text-bg font-semibold py-3 rounded-xl transition bg-brand hover:bg-brand-hover"
        >
          Start shopping
        </button>
      </div>
    </div>
  );
}
