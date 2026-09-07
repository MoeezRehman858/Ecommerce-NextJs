"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const links = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0B10]/80 backdrop-blur-md border-b border-[#2A2A35]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <h1
            className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-[#7C5CFC] to-[#33E6CC] bg-clip-text text-transparent cursor-pointer"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            MyStore
          </h1>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#B8B8C4] hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.isAdmin && (
            <>
              <Link
                href="/orders"
                className="text-[#B8B8C4] hover:text-white transition"
              >
                Orders
              </Link>
              <Link
                href="/admin/add-product"
                className="text-[#33E6CC] hover:text-white transition"
              >
                Add Product
              </Link>
            </>
          )}

          {!user && (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="text-white border border-[#2A2A35] px-4 py-2 rounded-xl text-sm hover:border-[#7C5CFC] transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-[#0B0B10] font-semibold px-4 py-2 rounded-xl text-sm transition"
                style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <Link href="/profile" className="ml-2" aria-label="Profile">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-[#0B0B10] hover:scale-105 transition"
                style={{ background: "linear-gradient(135deg, #7C5CFC, #33E6CC)" }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white w-9 h-9 flex items-center justify-center border border-[#2A2A35] rounded-lg"
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#2A2A35] px-4 py-4 flex flex-col gap-4 text-sm bg-[#0B0B10]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[#B8B8C4] hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.isAdmin && (
            <>
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="text-[#B8B8C4] hover:text-white transition"
              >
                Orders
              </Link>
              <Link
                href="/admin/add-product"
                onClick={() => setMenuOpen(false)}
                className="text-[#33E6CC] hover:text-white transition"
              >
                Add Product
              </Link>
            </>
          )}

          {!user && (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white border border-[#2A2A35] px-4 py-2 rounded-xl text-center hover:border-[#7C5CFC] transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-[#0B0B10] font-semibold px-4 py-2 rounded-xl text-center transition"
                style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 pt-2 text-white"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-[#0B0B10]"
                style={{ background: "linear-gradient(135deg, #7C5CFC, #33E6CC)" }}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
              My Profile
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}