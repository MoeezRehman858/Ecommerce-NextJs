import { NextResponse } from "next/server";
<<<<<<< HEAD
import { connectDB } from "@/lib/db";
import Collection from "@/models/Collection";
import Product from "@/models/Products";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const resolvedParams = await params;

    const collection = await Collection.findById(resolvedParams.id);
=======
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
>>>>>>> 414d771 (CSS Changes)

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
<<<<<<< HEAD
        { status: 404 }
      );
    }

    const products = await Product.find({ collection: resolvedParams.id });
=======
        { status: 404 },
      );
    }

    const products = await Product.find({ collection: id });
>>>>>>> 414d771 (CSS Changes)

    return NextResponse.json({ collection, products });
  } catch (error) {
    console.error("GET /api/collections/[id]:", error);
<<<<<<< HEAD
    return NextResponse.json(
      { message: "Failed to fetch collection" },
      { status: 500 }
=======

    return NextResponse.json(
      { message: "Failed to fetch collection" },
      { status: 500 },
>>>>>>> 414d771 (CSS Changes)
    );
  }
}

<<<<<<< HEAD
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const resolvedParams = await params;

    await Collection.findByIdAndDelete(resolvedParams.id);

    return NextResponse.json({ message: "Collection deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
=======
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
>>>>>>> 414d771 (CSS Changes)
  }
}
