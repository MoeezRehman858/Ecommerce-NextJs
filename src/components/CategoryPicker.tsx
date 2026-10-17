"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ADD_NEW = "__add_new__";

// Dropdown of all categories with an "Add new category" option built in.
// Used by both the Add Product and Edit Product pages.
export default function CategoryPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState("");
  const [saving, setSaving] = useState(false);

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // keep a product's current category visible even if the list hasn't loaded it
  const options =
    value && !categories.includes(value) ? [...categories, value] : categories;

  const createCategory = async () => {
    const name = newName.trim();
    if (!name) return;

    setSaving(true);

    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (res.ok) {
        await loadCategories();
        onChange(data.name);
        setNewName("");
        setAdding(false);
        toast.success(`Category "${data.name}" ready`);
      } else {
        toast.error(data.message || "Could not add category");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <select
        value={adding ? ADD_NEW : value}
        onChange={(e) => {
          if (e.target.value === ADD_NEW) {
            setAdding(true);
          } else {
            setAdding(false);
            onChange(e.target.value);
          }
        }}
        className="w-full bg-bg border border-line text-ink p-3 rounded-xl outline-none focus:border-brand transition text-sm"
      >
        <option value="" disabled>
          Select a category
        </option>
        {options.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
        <option value={ADD_NEW}>+ Add new category…</option>
      </select>

      {adding && (
        <div className="flex gap-2">
          <input
            autoFocus
            type="text"
            placeholder="New category name"
            value={newName}
            maxLength={40}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                createCategory();
              }
            }}
            className="flex-1 min-w-0 bg-bg border border-line text-ink placeholder:text-faint p-3 rounded-xl outline-none focus:border-brand transition text-sm"
          />
          <button
            type="button"
            onClick={createCategory}
            disabled={saving || !newName.trim()}
            className="px-4 rounded-xl text-sm font-semibold text-bg bg-brand hover:bg-brand-hover transition disabled:opacity-60"
          >
            {saving ? "Adding…" : "Add"}
          </button>
          <button
            type="button"
            onClick={() => {
              setAdding(false);
              setNewName("");
            }}
            className="px-3 rounded-xl text-sm text-muted border border-line hover:border-brand transition"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
