"use client";

import Link from "next/link";
import { useState } from "react";
import { useUser } from "@/lib/useUser";

export default function Navbar() {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/product", label: "Products" },
    { href: "/collections", label: "Collections" },
    { href: "/cart", label: "Cart" },
    { href: "/wishlist", label: "Wishlist" },
  ];

  return (
    <nav className="nav-enter sticky top-0 z-50 bg-bg/80 backdrop-blur-md border-b border-line">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        <Link href="/">
          <h1
            className="text-xl md:text-2xl font-bold tracking-tight text-ink cursor-pointer"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            My<span className="text-brand">Store</span>
          </h1>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7 text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link text-soft hover:text-ink transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.isAdmin && (
            <>
              <Link
                href="/orders"
                className="nav-link text-soft hover:text-ink transition"
              >
                Orders
              </Link>
              <Link
                href="/admin/add-product"
                className="text-accent hover:text-ink transition"
              >
                Add Product
              </Link>
              <Link
                href="/admin/collections"
                className="text-accent hover:text-ink transition"
              >
                Manage Collections
              </Link>
            </>
          )}

          {!user && (
            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/login"
                className="text-ink border border-line px-4 py-2 rounded-xl text-sm hover:border-brand transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-bg font-semibold px-4 py-2 rounded-xl text-sm transition bg-brand hover:bg-brand-hover"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <Link href="/profile" className="ml-2" aria-label="Profile">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-bg hover:scale-105 transition bg-brand"
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </div>
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-ink w-9 h-9 flex items-center justify-center border border-line rounded-lg"
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
        <div className="md:hidden border-t border-line px-4 py-4 flex flex-col gap-4 text-sm bg-bg">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="nav-link text-soft hover:text-ink transition"
            >
              {link.label}
            </Link>
          ))}

          {user?.isAdmin && (
            <>
              <Link
                href="/orders"
                onClick={() => setMenuOpen(false)}
                className="nav-link text-soft hover:text-ink transition"
              >
                Orders
              </Link>
              <Link
                href="/admin/add-product"
                onClick={() => setMenuOpen(false)}
                className="text-accent hover:text-ink transition"
              >
                Add Product
              </Link>
              <Link
                href="/admin/collections"
                onClick={() => setMenuOpen(false)}
                className="text-accent hover:text-ink transition"
              >
                Manage Collections
              </Link>
            </>
          )}

          {!user && (
            <div className="flex flex-col gap-3 pt-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="text-ink border border-line px-4 py-2 rounded-xl text-center hover:border-brand transition"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-bg font-semibold px-4 py-2 rounded-xl text-center transition bg-brand hover:bg-brand-hover"
              >
                Sign Up
              </Link>
            </div>
          )}

          {user && (
            <Link
              href="/profile"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 pt-2 text-ink"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-bg bg-brand"
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
