"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import WelcomePopup from "@/components/WelcomePopup";
import { toast } from "react-hot-toast";

const CATEGORIES = ["All", "Phones", "Shoes", "Clothes"];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      if (!res.ok) {
        console.log(await res.text());
        return;
      }

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

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

  const addToWishlist = async (productId: string) => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Added to wishlist");
    } else {
      toast.error(data.message);
    }
  };

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setProducts(products.filter((product) => product._id !== id));
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low") return a.price - b.price;
      if (sort === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#0B0B10]">
      <WelcomePopup />
      <HeroSlider />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5A66]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#15151D] border border-[#2A2A35] text-white placeholder-[#5A5A66] pl-11 pr-4 py-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 bg-[#15151D] border border-[#2A2A35] rounded-xl p-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat
                      ? "text-[#0B0B10]"
                      : "text-[#8B8B99] hover:text-white"
                  }`}
                  style={
                    selectedCategory === cat
                      ? { background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }
                      : undefined
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-[#15151D] border border-[#2A2A35] text-white text-sm px-3 py-3 rounded-xl outline-none focus:border-[#7C5CFC] transition"
            >
              <option value="">Sort</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <h1
          className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Our products
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#8B8B99] text-sm">
              Nothing matches that search. Try a different term or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                isAdmin={user?.isAdmin}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isAdmin,
  onAddToCart,
  onAddToWishlist,
  onDelete,
}: {
  product: any;
  isAdmin: boolean;
  onAddToCart: (p: any) => void;
  onAddToWishlist: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative rounded-2xl p-[1px] transition-all duration-300"
      style={{
        background: hover
          ? "linear-gradient(135deg, #7C5CFC, #33E6CC)"
          : "#2A2A35",
      }}
    >
      <div className="bg-[#15151D] rounded-[15px] overflow-hidden h-full">
        <div className="relative overflow-hidden h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500"
            style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
          />
          <span className="absolute top-3 left-3 bg-[#0B0B10]/80 backdrop-blur text-[#33E6CC] text-[11px] font-medium px-2.5 py-1 rounded-full border border-[#2A2A35]">
            {product.category}
          </span>
        </div>

        <div className="p-4">
          <h2 className="text-white font-semibold truncate">{product.name}</h2>
          <p className="text-[#33E6CC] font-bold mt-1">${product.price}</p>

          <div className="flex flex-col gap-2 mt-4">
            <Link href={`/product/${product._id}`}>
              <button className="w-full border border-[#2A2A35] text-white py-2 rounded-lg text-sm hover:border-[#7C5CFC] transition">
                View product
              </button>
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 text-[#0B0B10] font-semibold py-2 rounded-lg text-sm transition"
                style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
              >
                Add to cart
              </button>
              <button
                onClick={() => onAddToWishlist(product._id)}
                aria-label="Add to wishlist"
                className="w-10 flex items-center justify-center border border-[#2A2A35] rounded-lg text-[#8B8B99] hover:text-[#FF6B9E] hover:border-[#FF6B9E] transition"
              >
                ♥
              </button>
            </div>

            {isAdmin && (
              <div className="flex gap-2 pt-1">
                <Link href={`/admin/edit-product/${product._id}`} className="flex-1">
                  <button className="w-full text-amber-400 border border-amber-400/30 py-2 rounded-lg text-xs hover:bg-amber-400/10 transition">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => onDelete(product._id)}
                  className="flex-1 text-red-400 border border-red-400/30 py-2 rounded-lg text-xs hover:bg-red-400/10 transition"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
