"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import toast from "react-hot-toast";

const CATEGORIES = ["Phones", "Shoes", "Clothes"];

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      setUserLoading(false);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
      setCategory(data.category || CATEGORIES[0]);
      setProductLoading(false);
    };

    fetchProduct();
  }, [resolvedParams.id]);

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

  const handleUpdate = async () => {
    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, description, image, category }),
      });

      if (res.ok) {
        toast.success("Product updated");
      } else {
        toast.error("Update failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (userLoading || productLoading) {
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
          Edit product
        </h1>

        <div className="flex flex-col gap-4">
          <Field placeholder="Name" value={name} onChange={setName} />

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
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm resize-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

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
              <p className="text-[#8B8B99] text-sm">Click to upload an image</p>
            )}
          </label>

          <button
            onClick={handleUpdate}
            disabled={submitting || uploading}
            className="w-full text-[#0B0B10] font-semibold py-3 rounded-xl transition disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
          >
            {submitting ? "Updating…" : "Update product"}
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
      className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
    />
  );
}
