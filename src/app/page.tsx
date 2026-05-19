"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
import { toast } from "react-hot-toast";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("");
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);
  const fetchUser = async () => {
    const res = await fetch("/api/user/me", {
      credentials: "include",
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data);
    }
  };

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

    toast.success("Added to cart ✅");
  };
  const addToWishlist = async (productId: string) => {
    const res = await fetch("/api/wishlist", {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        productId,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Added to wishlist ❤️");
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
      if (sort === "low") {
        return a.price - b.price;
      }

      if (sort === "high") {
        return b.price - a.price;
      }

      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <HeroSlider />
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 rounded-xl border outline-none"
        />

        {/* CATEGORY */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-xl border"
        >
          <option value="All">All Categories</option>
          <option value="Phones">Phones</option>
          <option value="Shoes">Shoes</option>
          <option value="Clothes">Clothes</option>
        </select>

        {/* SORT */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="p-3 rounded-xl border"
        >
          <option value="">Sort</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-center"> Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>

              <p className="text-gray-600 mt-1">${product.price}</p>

              <div className="flex flex-col gap-2 mt-4">
                <Link href={`/product/${product._id}`}>
                  <button className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
                    View Product
                  </button>
                </Link>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product._id)}
                  className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition"
                >
                  Wishlist
                </button>
                {user?.isAdmin && (
                  <>
                    <Link href={`/admin/edit-product/${product._id}`}>
                      <button className="w-full bg-yellow-500 text-white py-2 rounded-lg">
                        Edit Product
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="w-full bg-red-500 text-white py-2 rounded-lg"
                    >
                      Delete Product
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
