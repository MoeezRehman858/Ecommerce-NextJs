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
      className="fixed inset-0 bg-[#0B0B10]/80 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity duration-200"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <div
        className="bg-[#15151D] border border-[#2A2A35] rounded-3xl p-8 max-w-md w-full text-center relative transition-all duration-200"
        style={{
          transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(8px)",
          opacity: visible ? 1 : 0,
        }}
      >
        <button
          onClick={closePopup}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-[#8B8B99] hover:text-white hover:bg-[#2A2A35] transition"
        >
          ×
        </button>

        <span className="text-3xl">🎉</span>

        <h2
          className="text-white text-3xl font-bold mt-3 mb-2 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Welcome!
        </h2>

        <p className="text-[#8B8B99] mb-6 text-sm">
          Enjoy your first shopping experience with us.
        </p>

        <div className="rounded-2xl p-[1.5px]" style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}>
          <div className="bg-[#0B0B10] rounded-[15px] p-5">
            <p className="text-[#8B8B99] text-xs uppercase tracking-wide mb-2">
              Get 20% off your first order
            </p>

            <button
              onClick={copyCode}
              className="flex items-center justify-center gap-2 mx-auto text-2xl font-bold bg-gradient-to-r from-[#7C5CFC] to-[#33E6CC] bg-clip-text text-transparent"
            >
              WELCOME20
              <span className="text-xs font-medium text-[#5A5A66] mt-1">
                {copied ? "copied" : "tap to copy"}
              </span>
            </button>
          </div>
        </div>

        <button
          onClick={closePopup}
          className="w-full mt-6 text-[#0B0B10] font-semibold py-3 rounded-xl transition"
          style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
        >
          Start shopping
        </button>
      </div>
    </div>
  );
}