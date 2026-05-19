"use client";

import { useEffect, useState } from "react";

export default function AddProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState<any>(null);

  // ✅ FETCH USER
  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
    };

    fetchUser();
  }, []);

  // ✅ ADD PRODUCT
  const handleAddProduct = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
        description,
        category,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Product added successfully ✅");

      setName("");
      setPrice("");
      setDescription("");
      setImage("");
      setCategory("");
    } else {
      alert(data.message || "Failed to add product");
    }
  };

  // ✅ BLOCK NORMAL USERS
  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500">Access Denied 🚫</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Add Product</h1>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <input
            type="file"
            accept="image/*"
            onChange={async (e: any) => {
              const file = e.target.files[0];

              const reader = new FileReader();

              reader.readAsDataURL(file);

              reader.onloadend = async () => {
                const res = await fetch("/api/upload", {
                  method: "POST",

                  headers: {
                    "Content-Type": "application/json",
                  },

                  body: JSON.stringify({
                    image: reader.result,
                  }),
                });

                const data = await res.json();

                setImage(data.url);
              };
            }}
            className="w-full border p-3 rounded-xl"
          />
          {image && (
            <img
              src={image}
              alt="Preview"
              className="w-full h-52 object-cover rounded-xl"
            />
          )}

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-3 rounded-xl"
          />

          <button
            onClick={handleAddProduct}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
