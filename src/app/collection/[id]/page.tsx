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
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <p className="text-muted">Collection not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
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
              "linear-gradient(180deg, rgba(10,10,10,0.2) 0%, rgba(10,10,10,0.9) 100%)",
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
            <p className="text-soft text-sm md:text-base mt-2 max-w-xl">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {products.length === 0 ? (
          <div className="bg-surface border border-line p-10 rounded-2xl text-center">
            <p className="text-muted">
              No products in this collection yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-surface border border-line rounded-2xl overflow-hidden hover:border-brand transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-ink font-semibold truncate">
                    {product.name}
                  </h2>
                  <p className="text-accent font-bold mt-1">
                    ${product.price}
                  </p>

                  <div className="flex flex-col gap-2 mt-4">
                    <Link href={`/product/${product._id}`}>
                      <button className="w-full border border-line text-ink py-2 rounded-lg text-sm hover:border-brand transition">
                        View product
                      </button>
                    </Link>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full text-bg font-semibold py-2 rounded-lg text-sm transition bg-brand hover:bg-brand-hover"
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
