import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Product from "@/models/Products";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const body = await req.json();

    // Only accept known fields, never spread the raw body into the DB
    const { name, price, image, images, description, category } = body;

    const product = await Product.create({
      name,
      price,
      image,
      images,
      description,
      category,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products:", error);

    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 },
    );
  }
}
