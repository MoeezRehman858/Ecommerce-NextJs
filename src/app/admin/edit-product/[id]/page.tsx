"use client";

import { useEffect, useState } from "react";
import { use } from "react";

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

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`/api/products/${resolvedParams.id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setDescription(data.description);
      setImage(data.image);
    };

    fetchProduct();
  }, [resolvedParams.id]);

  const handleUpdate = async () => {
    const res = await fetch(`/api/products/${resolvedParams.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        description,
        image,
      }),
    });

    if (res.ok) {
      alert("Product updated ✅");
    } else {
      alert("Update failed");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h1>Edit Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Price"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />

      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />

      <button onClick={handleUpdate}>
        Update Product
      </button>
    </div>
  );
}