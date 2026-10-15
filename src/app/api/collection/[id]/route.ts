import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Collection from "@/models/Collection";
import Product from "@/models/Products";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    await connectDB();

    const collection = await Collection.findById(id);

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 },
      );
    }

    const products = await Product.find({ collection: id });

    return NextResponse.json({ collection, products });
  } catch (error) {
    console.error("GET /api/collections/[id]:", error);

    return NextResponse.json(
      { message: "Failed to fetch collection" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    await connectDB();

    await Collection.findByIdAndDelete(id);

    // Un-assign products so none point at a deleted collection
    await Product.updateMany({ collection: id }, { collection: "" });

    return NextResponse.json({ message: "Collection deleted" });
  } catch (error) {
    console.error("DELETE /api/collections/[id]:", error);

    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
