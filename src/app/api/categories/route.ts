import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Category from "@/models/Category";
import Product from "@/models/Products";

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Public: every category name, sorted. Merges saved categories with the ones
// already used by existing products, so old data shows up with no migration.
export async function GET() {
  try {
    await connectDB();

    const [saved, used] = await Promise.all([
      Category.find().select("name").lean(),
      Product.distinct("category"),
    ]);

    const seen = new Map<string, string>();

    for (const raw of [...saved.map((c: any) => c.name), ...used]) {
      const name = String(raw || "").trim();
      if (name && !seen.has(name.toLowerCase())) {
        seen.set(name.toLowerCase(), name);
      }
    }

    const list = [...seen.values()].sort((a, b) => a.localeCompare(b));

    return NextResponse.json(list);
  } catch (error) {
    console.error("GET /api/categories:", error);

    return NextResponse.json(
      { message: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}

// Admin only: create a category (case-insensitive duplicates return the existing one)
export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const body = await req.json();
    const name = String(body.name || "").trim().replace(/\s+/g, " ");

    if (!name) {
      return NextResponse.json(
        { message: "Category name is required" },
        { status: 400 },
      );
    }

    if (name.length > 40) {
      return NextResponse.json(
        { message: "Category name must be 40 characters or fewer" },
        { status: 400 },
      );
    }

    const existing = await Category.findOne({
      name: new RegExp(`^${escapeRegex(name)}$`, "i"),
    });

    if (existing) {
      return NextResponse.json(existing);
    }

    const category = await Category.create({ name });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("POST /api/categories:", error);

    return NextResponse.json(
      { message: "Failed to create category" },
      { status: 500 },
    );
  }
}
