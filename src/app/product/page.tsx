"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B0B10] px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-white text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight"
=======
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-ink text-3xl md:text-4xl font-bold text-center mb-10 tracking-tight"
>>>>>>> 414d771 (CSS Changes)
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          All products
        </h1>

        {loading ? (
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-[#15151D] border border-[#2A2A35] rounded-2xl h-80 animate-pulse"
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-surface border border-line rounded-2xl h-80 animate-pulse"
>>>>>>> 414d771 (CSS Changes)
              />
            ))}
          </div>
        ) : products.length === 0 ? (
<<<<<<< HEAD
          <p className="text-center text-[#8B8B99] text-sm py-24">
            No products yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
=======
          <p className="text-center text-muted text-sm py-24">
            No products yet. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
>>>>>>> 414d771 (CSS Changes)
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
<<<<<<< HEAD
      className="relative rounded-2xl p-[1px] transition-all duration-300"
      style={{
        background: hover
          ? "linear-gradient(135deg, #7C5CFC, #33E6CC)"
          : "#2A2A35",
      }}
    >
      <div className="bg-[#15151D] rounded-[15px] overflow-hidden h-full">
=======
      className="relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: hover
          ? "#ff8a3d"
          : "#26314a",
      }}
    >
      <div className="bg-surface rounded-[15px] overflow-hidden h-full">
>>>>>>> 414d771 (CSS Changes)
        <div className="relative overflow-hidden h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500"
            style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
          />
<<<<<<< HEAD
          <span className="absolute top-3 left-3 bg-[#0B0B10]/80 backdrop-blur text-[#33E6CC] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#2A2A35]">
=======
          <span className="absolute top-3 left-3 bg-bg/80 backdrop-blur text-accent text-[11px] font-medium px-2.5 py-1 rounded-full border border-line">
>>>>>>> 414d771 (CSS Changes)
            {product.category}
          </span>
        </div>

        <div className="p-4">
<<<<<<< HEAD
          <h2 className="text-white font-semibold truncate">{product.name}</h2>
          <p className="text-[#33E6CC] font-bold mt-1">${product.price}</p>

          <Link href={`/product/${product._id}`}>
            <button
              className="w-full mt-4 text-[#0B0B10] font-semibold py-2 rounded-lg text-sm transition"
              style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
=======
          <h2 className="text-ink font-semibold truncate">{product.name}</h2>
          <p className="text-accent font-bold mt-1">${product.price}</p>

          <Link href={`/product/${product._id}`}>
            <button
              className="w-full mt-4 text-bg font-semibold py-2 rounded-lg text-sm transition bg-brand hover:bg-brand-hover"
>>>>>>> 414d771 (CSS Changes)
            >
              View product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
