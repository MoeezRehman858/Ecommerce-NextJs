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
        item._id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  const removeItem = (id: string) => {
    const updatedCart = cart.filter((item) => item._id !== id);

    updateCart(updatedCart);

    toast.success("Item removed 🗑");
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cartItems: cart,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8"> Your Cart</h1>

      {cart.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow text-center">
          <h2 className="text-2xl font-semibold">Cart is empty</h2>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col md:flex-row items-center gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-32 h-56 md:h-32 object-cover rounded-xl"
              />

              <div className="flex-1 w-full text-center md:text-left">
                <h2 className="text-xl md:text-2xl font-semibold">
                  {item.name}
                </h2>

                <p className="text-gray-600 mt-2">${item.price}</p>

                <div className="flex justify-center md:justify-start items-center gap-4 mt-4">
                  <button
                    onClick={() => decreaseQuantity(item._id)}
                    className="bg-gray-200 px-4 py-2 rounded-lg text-xl"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">{item.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(item._id)}
                    className="bg-gray-200 px-4 py-2 rounded-lg text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
                <p className="text-xl font-bold">
                  ${item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeItem(item._id)}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-2xl shadow-md flex justify-between items-center">
            <h2 className="text-3xl font-bold">Total:</h2>

            <p className="text-3xl font-bold text-blue-600">${totalPrice}</p>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition mt-6"
          >
            Proceed to Checkout 💳
          </button>
        </div>
      )}
    </div>
  );
}
