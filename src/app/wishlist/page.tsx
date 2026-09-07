"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const res = await fetch("/api/wishlist", {
      credentials: "include",
    });

    const data = await res.json();
    setWishlist(Array.isArray(data) ? data : []);
  };

  const addToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const itemIndex = existingCart.findIndex(
      (item: any) => item._id === product._id,
    );

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart");
  };

  const removeFromWishlist = async (productId: string) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    if (res.ok) {
      setWishlist(wishlist.filter((item) => item.product._id !== productId));
      toast.success("Removed from wishlist");
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B10] px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          My wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-[#15151D] border border-[#2A2A35] p-10 rounded-2xl text-center">
            <p className="text-[#8B8B99]">No wishlist items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-[#15151D] border border-[#2A2A35] rounded-2xl overflow-hidden hover:border-[#7C5CFC] transition"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-white font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-[#33E6CC] font-bold mt-1">
                    ${item.product.price}
                  </p>

                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={`/product/${item.product._id}`}>
                      <button className="w-full border border-[#2A2A35] text-white py-2 rounded-lg text-sm hover:border-[#7C5CFC] transition">
                        View product
                      </button>
                    </Link>

                    <button
                      onClick={() => addToCart(item.product)}
                      className="w-full text-[#0B0B10] font-semibold py-2 rounded-lg text-sm transition"
                      style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
                    >
                      Add to cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.product._id)}
                      className="w-full text-red-400 border border-red-400/30 py-2 rounded-lg text-sm hover:bg-red-400/10 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
