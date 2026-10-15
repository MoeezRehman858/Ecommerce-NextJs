import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Product from "@/models/Products";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const { productId, action } = await req.json();

    if (
      !mongoose.isValidObjectId(id) ||
      !mongoose.isValidObjectId(productId) ||
      !["add", "remove"].includes(action)
    ) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    await connectDB();

    const updated = await Product.findByIdAndUpdate(
      productId,
      { collection: action === "add" ? id : "" },
      { new: true },
    );

    if (!updated) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/collections/[id]/products:", error);

    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 },
    );
  }
}
