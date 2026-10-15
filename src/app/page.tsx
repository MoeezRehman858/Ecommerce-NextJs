"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import WelcomePopup from "@/components/WelcomePopup";
import { toast } from "react-hot-toast";
<<<<<<< HEAD
=======
import { useUser } from "@/lib/useUser";
>>>>>>> 414d771 (CSS Changes)

const CATEGORIES = ["All", "Phones", "Shoes", "Clothes"];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
<<<<<<< HEAD
  const [user, setUser] = useState<any>(null);
=======
  const { user } = useUser();
>>>>>>> 414d771 (CSS Changes)
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

<<<<<<< HEAD
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

=======
>>>>>>> 414d771 (CSS Changes)
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
<<<<<<< HEAD
    <div className="min-h-screen bg-[#0B0B10]">
      <WelcomePopup />
      <HeroSlider />
=======
    <div className="min-h-screen bg-bg">
      <WelcomePopup />
      <HeroSlider />
      <TrustStrip />
>>>>>>> 414d771 (CSS Changes)

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <svg
<<<<<<< HEAD
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5A66]"
=======
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-faint"
>>>>>>> 414d771 (CSS Changes)
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
<<<<<<< HEAD
              className="w-full bg-[#15151D] border border-[#2A2A35] text-white placeholder-[#5A5A66] pl-11 pr-4 py-3 rounded-xl outline-none focus:border-[#7C5CFC] transition text-sm"
=======
              className="w-full bg-surface border border-line text-ink placeholder:text-faint pl-11 pr-4 py-3 rounded-xl outline-none focus:border-brand transition text-sm"
>>>>>>> 414d771 (CSS Changes)
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
<<<<<<< HEAD
            <div className="flex gap-2 bg-[#15151D] border border-[#2A2A35] rounded-xl p-1">
=======
            <div className="flex gap-2 bg-surface border border-line rounded-xl p-1">
>>>>>>> 414d771 (CSS Changes)
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat
<<<<<<< HEAD
                      ? "text-[#0B0B10]"
                      : "text-[#8B8B99] hover:text-white"
                  }`}
                  style={
                    selectedCategory === cat
                      ? { background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }
                      : undefined
                  }
=======
                      ? "bg-brand text-bg"
                      : "text-muted hover:text-ink"
                  }`}
>>>>>>> 414d771 (CSS Changes)
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
<<<<<<< HEAD
              className="bg-[#15151D] border border-[#2A2A35] text-white text-sm px-3 py-3 rounded-xl outline-none focus:border-[#7C5CFC] transition"
=======
              className="bg-surface border border-line text-ink text-sm px-3 py-3 rounded-xl outline-none focus:border-brand transition"
>>>>>>> 414d771 (CSS Changes)
            >
              <option value="">Sort</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

<<<<<<< HEAD
        <h1
          className="text-white text-3xl md:text-4xl font-bold mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-display, sans-serif)" }}
        >
          Our products
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-[#8B8B99] text-sm">
=======
        <div className="mb-8">
          <span className="text-brand text-xs font-semibold tracking-[0.25em] uppercase">
            Shop
          </span>
          <h1
            className="text-ink text-3xl md:text-4xl font-bold mt-2 tracking-tight"
            style={{ fontFamily: "var(--font-display, sans-serif)" }}
          >
            Our products
          </h1>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted text-sm">
>>>>>>> 414d771 (CSS Changes)
              Nothing matches that search. Try a different term or category.
            </p>
          </div>
        ) : (
<<<<<<< HEAD
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
=======
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
>>>>>>> 414d771 (CSS Changes)
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

          <div className="flex flex-col gap-2 mt-4">
            <Link href={`/product/${product._id}`}>
              <button className="w-full border border-[#2A2A35] text-white py-2 rounded-lg text-sm hover:border-[#7C5CFC] transition">
=======
          <h2 className="text-ink font-semibold truncate">{product.name}</h2>
          <p className="text-accent font-bold mt-1">${product.price}</p>

          <div className="flex flex-col gap-2 mt-4">
            <Link href={`/product/${product._id}`}>
              <button className="w-full border border-line text-ink py-2 rounded-lg text-sm hover:border-brand transition">
>>>>>>> 414d771 (CSS Changes)
                View product
              </button>
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => onAddToCart(product)}
<<<<<<< HEAD
                className="flex-1 text-[#0B0B10] font-semibold py-2 rounded-lg text-sm transition"
                style={{ background: "linear-gradient(90deg, #7C5CFC, #33E6CC)" }}
=======
                className="flex-1 text-bg font-semibold py-2 rounded-lg text-sm transition bg-brand hover:bg-brand-hover"
>>>>>>> 414d771 (CSS Changes)
              >
                Add to cart
              </button>
              <button
                onClick={() => onAddToWishlist(product._id)}
                aria-label="Add to wishlist"
<<<<<<< HEAD
                className="w-10 flex items-center justify-center border border-[#2A2A35] rounded-lg text-[#8B8B99] hover:text-[#FF6B9E] hover:border-[#FF6B9E] transition"
=======
                className="w-10 flex items-center justify-center border border-line rounded-lg text-muted hover:text-heart hover:border-heart transition"
>>>>>>> 414d771 (CSS Changes)
              >
                ♥
              </button>
            </div>

            {isAdmin && (
              <div className="flex gap-2 pt-1">
                <Link href={`/admin/edit-product/${product._id}`} className="flex-1">
<<<<<<< HEAD
                  <button className="w-full text-amber-400 border border-amber-400/30 py-2 rounded-lg text-xs hover:bg-amber-400/10 transition">
=======
                  <button className="w-full text-soft border border-line py-2 rounded-lg text-xs hover:border-brand transition">
>>>>>>> 414d771 (CSS Changes)
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
<<<<<<< HEAD
=======

function TrustStrip() {
  const items = [
    {
      title: "Free shipping",
      text: "On orders over $50",
      icon: (
        <>
          <path d="M1 3h15v13H1z" />
          <path d="M16 8h4l3 3v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </>
      ),
    },
    {
      title: "Secure checkout",
      text: "Payments handled by Stripe",
      icon: (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </>
      ),
    },
    {
      title: "Easy returns",
      text: "7 days, no questions asked",
      icon: (
        <>
          <path d="M1 4v6h6" />
          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
        </>
      ),
    },
  ];

  return (
    <div className="border-y border-line bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 sm:grid-cols-3 gap-6 stagger">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-4">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-surface border border-line flex items-center justify-center text-brand">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                {item.icon}
              </svg>
            </div>
            <div>
              <p className="text-ink text-sm font-semibold">{item.title}</p>
              <p className="text-muted text-xs">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
>>>>>>> 414d771 (CSS Changes)
