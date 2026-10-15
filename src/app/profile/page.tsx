"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (!res.ok) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  if (!user) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
          <p className="text-[#8B8B99] text-sm">Loading your profile…</p>
=======
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
          <p className="text-muted text-sm">Loading your profile…</p>
>>>>>>> 414d771 (CSS Changes)
        </div>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B0B10] px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-white text-3xl font-bold mb-8 tracking-tight"
=======
    <div className="min-h-screen bg-bg px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <h1
          className="text-ink text-3xl font-bold mb-8 tracking-tight"
>>>>>>> 414d771 (CSS Changes)
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Your profile
        </h1>

<<<<<<< HEAD
        <div className="bg-[#15151D] border border-[#2A2A35] rounded-2xl overflow-hidden">
          {/* Header */}
          <div
            className="relative h-28"
            style={{
              background:
                "radial-gradient(120% 180% at 20% 0%, #1a1530 0%, #15151D 70%)",
            }}
          >
            <div className="absolute -bottom-10 left-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-[#0B0B10] border-4 border-[#15151D]"
                style={{ background: "linear-gradient(135deg, #7C5CFC, #33E6CC)" }}
=======
        <div className="bg-surface border border-line rounded-2xl overflow-hidden">
          {/* Header */}
          <div
            className="relative h-28 bg-bg border-b border-line"
          >
            <div className="absolute -bottom-10 left-8">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-bg border-4 border-surface bg-brand"
>>>>>>> 414d771 (CSS Changes)
              >
                {initial}
              </div>
            </div>
            {user.isAdmin && (
<<<<<<< HEAD
              <span className="absolute top-4 right-4 bg-[#0B0B10]/70 backdrop-blur text-[#33E6CC] text-[11px] font-medium px-3 py-1 rounded-full border border-[#2A2A35]">
=======
              <span className="absolute top-4 right-4 bg-bg/70 backdrop-blur text-accent text-[11px] font-medium px-3 py-1 rounded-full border border-line">
>>>>>>> 414d771 (CSS Changes)
                Admin
              </span>
            )}
          </div>

          {/* Body */}
          <div className="pt-14 px-8 pb-8">
<<<<<<< HEAD
            <h2 className="text-white text-xl font-semibold">{user.name}</h2>
            <p className="text-[#8B8B99] text-sm mt-1">{user.email}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
=======
            <h2 className="text-ink text-xl font-semibold">{user.name}</h2>
            <p className="text-muted text-sm mt-1">{user.email}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 stagger">
>>>>>>> 414d771 (CSS Changes)
              <InfoRow label="Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow
                label="Account type"
                value={user.isAdmin ? "Admin" : "Customer"}
              />
              <InfoRow
                label="Member since"
                value={
                  user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "—"
                }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/orders" className="flex-1">
<<<<<<< HEAD
                <button className="w-full border border-[#2A2A35] text-white py-3 rounded-xl text-sm hover:border-[#7C5CFC] transition">
=======
                <button className="w-full border border-line text-ink py-3 rounded-xl text-sm hover:border-brand transition">
>>>>>>> 414d771 (CSS Changes)
                  View orders
                </button>
              </Link>
              <Link href="/wishlist" className="flex-1">
<<<<<<< HEAD
                <button className="w-full border border-[#2A2A35] text-white py-3 rounded-xl text-sm hover:border-[#7C5CFC] transition">
=======
                <button className="w-full border border-line text-ink py-3 rounded-xl text-sm hover:border-brand transition">
>>>>>>> 414d771 (CSS Changes)
                  View wishlist
                </button>
              </Link>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full mt-3 py-3 rounded-xl text-sm font-semibold text-red-400 border border-red-400/30 hover:bg-red-400/10 transition disabled:opacity-60"
            >
              {loggingOut ? "Logging out…" : "Log out"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
<<<<<<< HEAD
    <div className="bg-[#0B0B10] border border-[#2A2A35] rounded-xl px-4 py-3">
      <p className="text-[#5A5A66] text-[11px] uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-white text-sm truncate">{value}</p>
    </div>
  );
}
=======
    <div className="bg-bg border border-line rounded-xl px-4 py-3">
      <p className="text-faint text-[11px] uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-ink text-sm truncate">{value}</p>
    </div>
  );
}
>>>>>>> 414d771 (CSS Changes)
