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
  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState(CATEGORIES[0]);
<<<<<<< HEAD
  const [collectionId, setCollectionId] = useState("");
  const [collections, setCollections] = useState<any[]>([]);
=======
>>>>>>> 414d771 (CSS Changes)
  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [productLoading, setProductLoading] = useState(true);
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

<<<<<<< HEAD
    const fetchCollections = async () => {
      const res = await fetch("/api/collections");
      const data = await res.json();
      setCollections(Array.isArray(data) ? data : []);
    };

    fetchUser();
    fetchCollections();
=======
    fetchUser();
>>>>>>> 414d771 (CSS Changes)
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setImages(
        Array.isArray(data.images) && data.images.length > 0
          ? data.images
          : data.image
            ? [data.image]
            : [],
      );
      setCategory(data.category || CATEGORIES[0]);
<<<<<<< HEAD
      setCollectionId(data.collection || "");
=======
>>>>>>> 414d771 (CSS Changes)
      setProductLoading(false);
    };

    fetchProduct();
  }, [resolvedParams.id]);

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

  const handleUpdate = async () => {
    if (images.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`/api/products/${resolvedParams.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          description,
          image: images[0],
          images,
          category,
<<<<<<< HEAD
          collection: collectionId,
=======
>>>>>>> 414d771 (CSS Changes)
        }),
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
<<<<<<< HEAD
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
=======
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
>>>>>>> 414d771 (CSS Changes)
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
<<<<<<< HEAD
      <div className="min-h-screen bg-[#0B0B10] flex justify-center items-center">
=======
      <div className="min-h-screen bg-bg flex justify-center items-center">
>>>>>>> 414d771 (CSS Changes)
        <h1 className="text-xl font-bold text-red-400">Access denied</h1>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B0B10] flex justify-center items-center p-4 py-16">
      <div className="max-w-md w-full bg-[#15151D] border border-[#2A2A35] p-8 rounded-2xl">
        <h1
          className="text-white text-2xl font-bold mb-6 tracking-tight"
=======
    <div className="min-h-screen bg-bg flex justify-center items-center p-4 py-16">
      <div className="max-w-md w-full bg-surface border border-line p-8 rounded-2xl">
        <h1
          className="text-ink text-2xl font-bold mb-6 tracking-tight"
>>>>>>> 414d771 (CSS Changes)
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
<<<<<<< HEAD
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm resize-none"
=======
            className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm resize-none"
>>>>>>> 414d771 (CSS Changes)
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
<<<<<<< HEAD
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
=======
            className="w-full bg-bg border border-line text-ink p-3 rounded-xl outline-none focus:border-brand transition text-sm"
>>>>>>> 414d771 (CSS Changes)
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

<<<<<<< HEAD
          <select
            value={collectionId}
            onChange={(e) => setCollectionId(e.target.value)}
            className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
          >
            <option value="">No collection</option>
            {collections.map((col) => (
              <option key={col._id} value={col._id}>
                {col.name}
              </option>
            ))}
          </select>

          <label className="relative flex flex-col items-center justify-center border border-dashed border-[#2A2A35] hover:border-[#7C5CFC] rounded-xl p-6 cursor-pointer transition text-center">
=======
          <label className="relative flex flex-col items-center justify-center border border-dashed border-line hover:border-brand rounded-xl p-6 cursor-pointer transition text-center">
>>>>>>> 414d771 (CSS Changes)
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {uploading ? (
<<<<<<< HEAD
              <p className="text-[#8B8B99] text-sm">Uploading…</p>
            ) : (
              <p className="text-[#8B8B99] text-sm">
=======
              <p className="text-muted text-sm">Uploading…</p>
            ) : (
              <p className="text-muted text-sm">
>>>>>>> 414d771 (CSS Changes)
                Click to add more images
              </p>
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
<<<<<<< HEAD
                        ? { outline: "2px solid #33E6CC" }
=======
                        ? { outline: "2px solid #ff8a3d" }
>>>>>>> 414d771 (CSS Changes)
                        : undefined
                    }
                  />
                  <button
                    onClick={() => removeImage(img)}
<<<<<<< HEAD
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-[#0B0B10] border border-[#2A2A35] rounded-full text-white text-xs"
=======
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center bg-bg border border-line rounded-full text-ink text-xs"
>>>>>>> 414d771 (CSS Changes)
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpdate}
            disabled={submitting || uploading}
<<<<<<< HEAD
            className="w-full text-[#0B0B10] font-semibold py-3 rounded-xl transition disabled:opacity-60"
            style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
=======
            className="w-full text-bg font-semibold py-3 rounded-xl transition disabled:opacity-60 bg-brand hover:bg-brand-hover"
>>>>>>> 414d771 (CSS Changes)
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
<<<<<<< HEAD
      className="w-full bg-[#0B0B10] border border-[#2A2A35] text-white placeholder-[#5A5A66] p-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
=======
      className="w-full bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm"
>>>>>>> 414d771 (CSS Changes)
    />
  );
}
