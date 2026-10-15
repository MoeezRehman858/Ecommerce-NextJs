"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["Phones", "Shoes", "Clothes"];

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
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

  const uploadOneFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = async () => {
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: reader.result }),
          });
          const data = await res.json();
          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;
    });
  };

  const handleImagesUpload = async (e: any) => {
    const files = Array.from(e.target.files) as File[];
    if (files.length === 0) return;

    setUploading(true);
    try {
      const urls = await Promise.all(files.map(uploadOneFile));
      setImages((prev) => [...prev, ...urls]);
    } catch {
      toast.error("Some images failed to upload");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (url: string) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleAddProduct = async () => {
    if (!name || !price || images.length === 0) {
      toast.error("Name, price and at least one image are required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          image: images[0],
          images,
          description,
          category,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product added");
        setName("");
        setPrice("");
        setDescription("");
        setImages([]);
        setCategory(CATEGORIES[0]);
      } else {
        toast.error(data.message || "Failed to add product");
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
    <div className="min-h-screen bg-bg flex justify-center items-center p-4 py-16">
      <div className="max-w-md w-full bg-surface border border-line p-8 rounded-2xl">
        <h1
          className="text-ink text-2xl font-bold mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Add product
        </h1>

        <div className="flex flex-col gap-4">
          <Field placeholder="Product name" value={name} onChange={setName} />

          <Field
            placeholder="Price"
            type="number"
            value={price}
            onChange={setPrice}
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-bg border border-line text-ink p-3 rounded-xl outline-none focus:border-brand transition text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Multi-image upload */}
          <label className="relative flex flex-col items-center justify-center border border-dashed border-line hover:border-brand rounded-xl p-6 cursor-pointer transition text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {uploading ? (
              <p className="text-muted text-sm">Uploading…</p>
            ) : (
              <>
                <p className="text-muted text-sm">
                  Click to upload images
                </p>
                <p className="text-faint text-xs mt-1">
                  First image is the cover photo. You can add more than one.
                </p>
              </>
            )}
          </label>

          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <div key={img} className="relative">
                  <img
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="w-full h-16 object-cover rounded-lg"
                    style={
                      i === 0
                        ? { outline: "2px solid #ff8a3d" }
                        : undefined
                    }
                  />
                  <button
                    onClick={() => removeImage(img)}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-bg border border-line rounded-full text-ink text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleAddProduct}
            disabled={submitting || uploading}
            className="w-full text-bg font-semibold py-3 rounded-xl transition disabled:opacity-60 bg-brand hover:bg-brand-hover"
          >
            {submitting ? "Adding…" : "Add product"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm"
    />
  );
}
