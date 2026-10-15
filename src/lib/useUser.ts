"use client";

import { useEffect, useState } from "react";

// One shared request for the whole page. Every component that calls
// useUser() gets the same promise, so /api/user/me is only hit once,
// even with several components (and React Strict Mode double-effects).
// Login/logout use a full page reload, which resets this cache.
let userPromise: Promise<any | null> | null = null;

function loadUser() {
  if (!userPromise) {
    userPromise = fetch("/api/user/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .catch(() => null);
  }
  return userPromise;
}

export function useUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    loadUser().then((u) => {
      if (active) {
        setUser(u);
        setLoading(false);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  return { user, loading };
}
