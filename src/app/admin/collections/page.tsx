"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function AdminCollectionsPage() {
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [collections, setCollections] = useState<any[]>([]);
  const [loadingCollections, setLoadingCollections] = useState(true);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      setUserLoading(false);
    };

    fetchUser();
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    const res = await fetch("/api/collections");
    const data = await res.json();
    setCollections(Array.isArray(data) ? data : []);
    setLoadingCollections(false);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setUploading(true);
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: reader.result }),
        });
        const data = await res.json();
        setImage(data.url);
      } catch {
        toast.error("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
  };

  const handleCreate = async () => {
    if (!name || !image) {
      toast.error("Name and a banner image are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, image }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Collection created");
        setName("");
        setDescription("");
        setImage("");
        setShowForm(false);
        fetchCollections();
      } else {
        toast.error(data.message || "Failed to create collection");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-bg flex justify-center items-center">
        <h1 className="text-xl font-bold text-red-400">Access denied</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1
            className="text-ink text-3xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Collections
          </h1>

          <button
            onClick={() => setShowForm(!showForm)}
            className="text-bg font-semibold px-5 py-2.5 rounded-xl text-sm transition bg-brand hover:bg-brand-hover"
          >
            {showForm ? "Cancel" : "+ New collection"}
          </button>
        </div>

        {showForm && (
          <div className="bg-surface border border-line rounded-2xl p-6 mb-8">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Collection name (e.g. Summer Collection)"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm"
              />

              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm resize-none"
              />

              <label className="relative flex flex-col items-center justify-center border border-dashed border-line hover:border-brand rounded-xl p-5 cursor-pointer transition text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                {uploading ? (
                  <p className="text-muted text-sm">Uploading…</p>
                ) : image ? (
                  <img
                    src={image}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <p className="text-muted text-sm">
                    Click to upload a banner image
                  </p>
                )}
              </label>

              <button
                onClick={handleCreate}
                disabled={submitting || uploading}
                className="text-bg font-semibold py-3 rounded-xl transition disabled:opacity-60 bg-brand hover:bg-brand-hover"
              >
                {submitting ? "Creating…" : "Create collection"}
              </button>
            </div>
          </div>
        )}

        {loadingCollections ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-line rounded-2xl h-48 animate-pulse"
              />
            ))}
          </div>
        ) : collections.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">
              No collections yet. Create your first one above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 stagger">
            {collections.map((col) => (
              <Link key={col._id} href={`/admin/collections/${col._id}`}>
                <div className="relative rounded-2xl overflow-hidden h-48 border border-line hover:border-brand transition duration-300 hover:-translate-y-1 group">
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
                  <div className="absolute bottom-0 left-0 p-4">
                    <h2 className="text-white font-bold">{col.name}</h2>
                    <p className="text-muted text-xs mt-0.5">
                      Manage products
                    </p>
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
