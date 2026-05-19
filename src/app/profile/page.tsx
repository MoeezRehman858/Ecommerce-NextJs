"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (!res.ok) {
        window.location.href = "/login"; // 🔥 protect route
        return;
      }

      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, []);
  if (!user) return <p>Loading...</p>;

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    window.location.href = "/login";
  };
  return (
    <div style={{ padding: "20px" }}>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
