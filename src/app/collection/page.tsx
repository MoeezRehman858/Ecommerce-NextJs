"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    fetchCollections();
  }, []);

  return (
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-ink text-3xl md:text-4xl font-bold mb-10 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Collections
        </h1>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-line rounded-2xl h-64 animate-pulse"
              />
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">No collections yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger">
            {collections.map((col) => (
              <Link key={col._id} href={`/collections/${col._id}`}>
                <div className="relative rounded-2xl overflow-hidden h-64 border border-line group transition-transform duration-300 hover:-translate-y-1">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.85) 100%)",
                    }}
                  />
                  <div className="absolute bottom-0 left-0 p-5">
                    <h2
                      className="text-white text-xl font-bold tracking-tight"
                      style={{ fontFamily: "var(--font-display, sans-serif)" }}
                    >
                      {col.name}
                    </h2>
                    {col.description && (
                      <p className="text-soft text-sm mt-1 line-clamp-2">
                        {col.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
