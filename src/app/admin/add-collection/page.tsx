"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddCollectionPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
  }, []);

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

  const handleAddCollection = async () => {
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
        toast.success("Collection added");
        setName("");
        setDescription("");
        setImage("");
      } else {
        toast.error(data.message || "Failed to add collection");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex justify-center items-center">
        <h1 className="text-xl font-bold text-red-400">Access denied</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B10] flex justify-center items-center p-4 py-16">
      <div className="max-w-md w-full bg-[#15151D] border border-[#2A2A35] p-8 rounded-2xl">
        <h1
          className="text-white text-2xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Add collection
        </h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Collection name (e.g. Summer Collection)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
          />

          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm resize-none"
          />

          <label className="relative flex flex-col items-center justify-center border border-dashed border-[#2A2A35] hover:border-[#7C5CFC] rounded-xl p-6 cursor-pointer transition text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {uploading ? (
              <p className="text-[#8B8B99] text-sm">Uploading…</p>
            ) : image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg"
              />
            ) : (
              <>
                <p className="text-[#8B8B99] text-sm">
                  Click to upload a banner image
                </p>
                <p className="text-[#5A5A66] text-xs mt-1">PNG or JPG</p>
              </>
            )}
          </label>

          <button
            onClick={handleAddCollection}
            disabled={submitting || uploading}
            className="w-full text-[#0B0B10] font-semibold py-3 rounded-xl transition disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
          >
            {submitting ? "Adding…" : "Add collection"}
          </button>
        </div>
      </div>
    </div>
  );
}
