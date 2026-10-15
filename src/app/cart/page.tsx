"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

type CartItem = {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const updatedCart = cart.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );
    updateCart(updatedCart);
  };

  const decreaseQuantity = (id: string) => {
    const updatedCart = cart
      .map((item) =>
        item._id === id ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter((item) => item.quantity > 0);
    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);
    updateCart(updatedCart);
    toast.success("Item removed");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await res.json();
      window.location.href = data.url;
    } catch {
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1
          className="text-ink text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Your cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">Your cart is empty.</p>
          </div>
        ) : (
          <div className="space-y-4 stagger">
            {cart.map((item) => (
              <div
                key={item._id}
                className="bg-surface border border-line rounded-2xl p-4 flex flex-col md:flex-row items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full md:w-28 h-40 md:h-28 object-cover rounded-xl"
                />

                <div className="flex-1 w-full text-center md:text-left">
                  <h2 className="text-ink text-lg font-semibold">
                    {item.name}
                  </h2>
                  <p className="text-accent mt-1">${item.price}</p>

                  <div className="flex justify-center md:justify-start items-center gap-3 mt-4">
                    <button
                      onClick={() => decreaseQuantity(item._id)}
                      className="w-9 h-9 flex items-center justify-center bg-bg border border-line rounded-lg text-ink hover:border-brand transition"
                    >
                      −
                    </button>
                    <span className="text-ink font-semibold w-6 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item._id)}
                      className="w-9 h-9 flex items-center justify-center bg-bg border border-line rounded-lg text-ink hover:border-brand transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
                  <p className="text-ink text-lg font-bold">
                    ${item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-400 border border-red-400/30 px-5 py-2 rounded-lg text-sm hover:bg-red-400/10 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-surface border border-line p-6 rounded-2xl flex justify-between items-center mt-6">
              <h2 className="text-ink text-xl font-semibold">Total</h2>
              <p className="text-2xl font-bold text-accent">
                ${totalPrice}
              </p>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full text-bg font-semibold py-3.5 rounded-xl mt-2 transition disabled:opacity-60 bg-brand hover:bg-brand-hover"
            >
              {checkingOut ? "Redirecting to checkout…" : "Proceed to checkout"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
