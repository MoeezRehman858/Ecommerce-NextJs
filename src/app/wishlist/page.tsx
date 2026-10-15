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
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-ink text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          My wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">No wishlist items yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-surface border border-line rounded-2xl overflow-hidden hover:border-brand transition"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-ink font-semibold truncate">
                    {item.product.name}
                  </h2>
                  <p className="text-accent font-bold mt-1">
                    ${item.product.price}
                  </p>

                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={`/product/${item.product._id}`}>
                      <button className="w-full border border-line text-ink py-2 rounded-lg text-sm hover:border-brand transition">
                        View product
                      </button>
                    </Link>

                    <button
                      onClick={() => addToCart(item.product)}
                      className="w-full text-bg font-semibold py-2 rounded-lg text-sm transition bg-brand hover:bg-brand-hover"
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
