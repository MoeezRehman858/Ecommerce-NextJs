"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import WelcomePopup from "@/components/WelcomePopup";
import { toast } from "react-hot-toast";
import { useUser } from "@/lib/useUser";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    };

    fetchCategories();
  }, []);

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
    <div className="min-h-screen bg-bg">
      <WelcomePopup />
      <HeroSlider />
      <TrustStrip />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* Filter bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-10 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-faint"
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
              className="w-full bg-surface border border-line text-ink placeholder:text-faint pl-11 pr-4 py-3 rounded-xl outline-none focus:border-brand transition text-sm"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2 bg-surface border border-line rounded-xl p-1 max-w-full overflow-x-auto">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-medium transition ${
                    selectedCategory === cat
                      ? "bg-brand text-bg"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-surface border border-line text-ink text-sm px-3 py-3 rounded-xl outline-none focus:border-brand transition"
            >
              <option value="">Sort</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

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
              Nothing matches that search. Try a different term or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 stagger">
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
      className="relative rounded-2xl p-[1px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: hover
          ? "#ff8a3d"
          : "#26314a",
      }}
    >
      <div className="bg-surface rounded-[15px] overflow-hidden h-full">
        <div className="relative overflow-hidden h-56">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition duration-500"
            style={{ transform: hover ? "scale(1.05)" : "scale(1)" }}
          />
          <span className="absolute top-3 left-3 bg-bg/80 backdrop-blur text-accent text-[11px] font-medium px-2.5 py-1 rounded-full border border-line">
            {product.category}
          </span>
        </div>

        <div className="p-4">
          <h2 className="text-ink font-semibold truncate">{product.name}</h2>
          <p className="text-accent font-bold mt-1">${product.price}</p>

          <div className="flex flex-col gap-2 mt-4">
            <Link href={`/product/${product._id}`}>
              <button className="w-full border border-line text-ink py-2 rounded-lg text-sm hover:border-brand transition">
                View product
              </button>
            </Link>

            <div className="flex gap-2">
              <button
                onClick={() => onAddToCart(product)}
                className="flex-1 text-bg font-semibold py-2 rounded-lg text-sm transition bg-brand hover:bg-brand-hover"
              >
                Add to cart
              </button>
              <button
                onClick={() => onAddToWishlist(product._id)}
                aria-label="Add to wishlist"
                className="w-10 flex items-center justify-center border border-line rounded-lg text-muted hover:text-heart hover:border-heart transition"
              >
                ♥
              </button>
            </div>

            {isAdmin && (
              <div className="flex gap-2 pt-1">
                <Link href={`/admin/edit-product/${product._id}`} className="flex-1">
                  <button className="w-full text-soft border border-line py-2 rounded-lg text-xs hover:border-brand transition">
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
