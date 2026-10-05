"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/collections/${resolvedParams.id}`);
      const data = await res.json();

      setCollection(data.collection);
      setProducts(data.products || []);
      setLoading(false);
    };

    fetchData();
  }, [resolvedParams.id]);

  const addToCart = (product: any) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const itemIndex = existingCart.findIndex(
      (item: any) => item._id === product._id,
    );

    if (itemIndex > -1) {
      existingCart[itemIndex].quantity += 1;
    } else {
      existingCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    toast.success("Added to cart");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-[#2A2A35] border-t-[#7C5CFC] animate-spin" />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-[#0B0B10] flex items-center justify-center">
        <p className="text-[#8B8B99]">Collection not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B10]">
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,11,16,0.2) 0%, rgba(11,11,16,0.9) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 p-6 md:p-10">
          <h1
            className="text-white text-3xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            {collection.name}
          </h1>
          {collection.description && (
            <p className="text-[#C8C8D2] text-sm md:text-base mt-2 max-w-xl">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {products.length === 0 ? (
          <div className="bg-[#15151D] border border-[#2A2A35] p-10 rounded-2xl text-center">
            <p className="text-[#8B8B99]">
              No products in this collection yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-[#15151D] border border-[#2A2A35] rounded-2xl overflow-hidden hover:border-[#7C5CFC] transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-white font-semibold truncate">
                    {product.name}
                  </h2>
                  <p className="text-[#33E6CC] font-bold mt-1">
                    ${product.price}
                  </p>

                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={`/product/${product._id}`}>
                      <button className="w-full border border-[#2A2A35] text-white py-2 rounded-lg text-sm hover:border-[#7C5CFC] transition">
                        View product
                      </button>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full text-[#0B0B10] font-semibold py-2 rounded-lg text-sm transition"
                      style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
