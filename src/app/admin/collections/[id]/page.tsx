"use client";

import { useEffect, useState, use } from "react";
import toast from "react-hot-toast";

export default function AdminCollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  const [user, setUser] = useState<any>(null);
  const [userLoading, setUserLoading] = useState(true);
  const [collection, setCollection] = useState<any>(null);
  const [inCollection, setInCollection] = useState<any[]>([]);
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/user/me", { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      }
      setUserLoading(false);
    };

    fetchUser();
    loadData();
  }, [resolvedParams.id]);

  const loadData = async () => {
    const [collectionRes, allProductsRes] = await Promise.all([
      fetch(`/api/collections/${resolvedParams.id}`),
      fetch("/api/products"),
    ]);

    const collectionData = await collectionRes.json();
    const allProductsData = await allProductsRes.json();

    setCollection(collectionData.collection);
    setInCollection(collectionData.products || []);
    setAllProducts(Array.isArray(allProductsData) ? allProductsData : []);
    setLoading(false);
  };

  const toggleProduct = async (productId: string, action: "add" | "remove") => {
    setUpdatingId(productId);
    try {
      const res = await fetch(`/api/collections/${resolvedParams.id}/products`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, action }),
      });

      if (res.ok) {
        toast.success(
          action === "add" ? "Added to collection" : "Removed from collection",
        );
        loadData();
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setUpdatingId("");
    }
  };

  const inCollectionIds = new Set(inCollection.map((p) => p._id));

  const availableProducts = allProducts
    .filter((p) => !inCollectionIds.has(p._id))
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));

  if (userLoading || loading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-line border-t-brand animate-spin" />
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-bg flex justify-center items-center">
        <h1 className="text-xl font-bold text-red-400">Access denied</h1>
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
    <div className="min-h-screen bg-bg px-4 md:px-8 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <img
            src={collection.image}
            alt={collection.name}
            className="w-16 h-16 rounded-xl object-cover border border-line"
          />
          <div>
            <h1
              className="text-ink text-2xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-display, sans-serif)" }}
            >
              {collection.name}
            </h1>
            <p className="text-muted text-sm">
              {inCollection.length} product
              {inCollection.length === 1 ? "" : "s"} in this collection
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger">
          {/* In collection */}
          <div>
            <h2 className="text-ink font-semibold mb-3 text-sm uppercase tracking-wide">
              In this collection
            </h2>

            {inCollection.length === 0 ? (
              <div className="bg-surface border border-line rounded-xl p-6 text-center">
                <p className="text-muted text-sm">
                  No products added yet.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 stagger">
                {inCollection.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 bg-surface border border-line rounded-xl p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-ink text-sm font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-accent text-xs">
                        ${product.price}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleProduct(product._id, "remove")}
                      disabled={updatingId === product._id}
                      className="text-red-400 border border-red-400/30 px-3 py-1.5 rounded-lg text-xs hover:bg-red-400/10 transition disabled:opacity-60"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Available products */}
          <div>
            <h2 className="text-ink font-semibold mb-3 text-sm uppercase tracking-wide">
              Add products
            </h2>

            <input
              type="text"
              placeholder="Search your products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-line text-ink placeholder:text-faint px-4 py-2.5 rounded-xl outline-none focus:border-brand transition text-sm mb-3"
            />

            {availableProducts.length === 0 ? (
              <div className="bg-surface border border-line rounded-xl p-6 text-center">
                <p className="text-muted text-sm">
                  Nothing left to add.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 max-h-[28rem] overflow-y-auto stagger">
                {availableProducts.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-3 bg-surface border border-line rounded-xl p-3"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-ink text-sm font-medium truncate">
                        {product.name}
                      </p>
                      <p className="text-accent text-xs">
                        ${product.price}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleProduct(product._id, "add")}
                      disabled={updatingId === product._id}
                      className="text-bg font-semibold px-3 py-1.5 rounded-lg text-xs transition disabled:opacity-60 bg-brand hover:bg-brand-hover"
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
