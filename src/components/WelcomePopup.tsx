"use client";

import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("welcomePopup");

    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem("welcomePopup", "true");
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative animate-bounce">

        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-4xl font-bold mb-3">
          🎉 Welcome!
        </h2>

        <p className="text-gray-600 mb-4">
          Enjoy your first shopping experience with us.
        </p>

        <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mb-6">
          <p className="text-lg font-semibold">
            🔥 Get 20% OFF
          </p>

          <p className="text-2xl font-bold text-red-500 mt-2">
            WELCOME20
          </p>
        </div>

        <button
          onClick={closePopup}
          className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Start Shopping
        </button>
      </div>
    </div>
  );
}