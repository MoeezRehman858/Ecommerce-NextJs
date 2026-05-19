"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");

      const data = await res.json();

      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
         All Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {product.name}
              </h2>

              <p className="text-blue-600 font-bold mt-2">
                ${product.price}
              </p>

              <Link href={`/product/${product._id}`}>
                <button className="w-full mt-4 bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition">
                  View Product
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}