"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/me", {
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl font-bold cursor-pointer">
          MyStore
        </h1>
      </Link>

      <div className="flex flex-wrap justify-center items-center gap-4 text-sm md:text-lg">
        <Link href="/" className="hover:text-blue-500 transition">
          Home
        </Link>
        <Link href="/product" className="hover:text-blue-500 transition">
          Products
        </Link>

        <Link href="/cart" className="hover:text-blue-500 transition">
          Cart
        </Link>
        <Link href="/wishlist" className="hover:text-blue-500 transition">
          Wishlist
        </Link>

        {user?.isAdmin && (
          <>
            <Link href="/orders" className="hover:text-blue-500 transition">
              Orders
            </Link>

            <Link
              href="/admin/add-product"
              className="hover:text-blue-500 transition"
            >
              Add Product
            </Link>
          </>
        )}

        {!user && (
          <>
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
            >
              Sign In
            </Link>

            <Link
              href="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
