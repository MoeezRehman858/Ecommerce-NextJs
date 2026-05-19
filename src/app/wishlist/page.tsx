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
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("Added to cart 🛒");
  };
  const removeFromWishlist = async (productId: string) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        productId,
      }),
    });

    if (res.ok) {
      setWishlist(wishlist.filter((item) => item.product._id !== productId));

      toast.success("Removed from wishlist ");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl shadow">
          <p>No wishlist items yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{item.product.name}</h2>

                <p className="text-gray-600 mt-1">${item.product.price}</p>

                <div className="flex flex-col gap-2 mt-4">
                  <Link href={`/product/${item.product._id}`}>
                    <button className="w-full bg-black text-white py-2 rounded-lg">
                      View Product
                    </button>
                  </Link>

                  <button
                    onClick={() => addToCart(item.product)}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg"
                  >
                    Add To Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.product._id)}
                    className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
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
  );
}
