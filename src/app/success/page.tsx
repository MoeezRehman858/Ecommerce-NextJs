"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function SuccessPage() {
  useEffect(() => {
    const saveOrder = async () => {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      const totalAmount = cart.reduce(
        (sum: number, item: any) =>
          sum + item.price * item.quantity,
        0
      );

      await fetch("/api/orders", {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          items: cart,
          totalAmount,
        }),
      });

      localStorage.removeItem("cart");
    };

    saveOrder();
  }, []);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">

      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full">

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Payment Successful ✅
        </h1>

        <p className="text-gray-600 mb-6">
          Your order has been placed successfully.
        </p>

        <Link href="/">
          <button className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition">
            Continue Shopping
          </button>
        </Link>

      </div>
    </div>
  );
}