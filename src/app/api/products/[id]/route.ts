import { NextResponse } from "next/server";
<<<<<<< HEAD
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const resolvedParams = await params;

    const product = await Product.findById(resolvedParams.id);
=======
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Product from "@/models/Products";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: Request, { params }: Ctx) {
  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    await connectDB();

    const product = await Product.findById(id);
>>>>>>> 414d771 (CSS Changes)

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
<<<<<<< HEAD
        { status: 404 }
=======
        { status: 404 },
>>>>>>> 414d771 (CSS Changes)
      );
    }

    return NextResponse.json(product);
  } catch (error) {
<<<<<<< HEAD
    console.error("FULL ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
=======
    console.error("GET /api/products/[id]:", error);

    return NextResponse.json(
      { message: "Failed to fetch product" },
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

    await Product.findByIdAndDelete(resolvedParams.id);

    return NextResponse.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Delete failed" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const resolvedParams = await params;

    const body = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(
      resolvedParams.id,
      body,
      { new: true }
    );

    return NextResponse.json(updatedProduct);
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}
=======
export async function PUT(req: Request, { params }: Ctx) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

    if (!mongoose.isValidObjectId(id)) {
      return NextResponse.json({ message: "Invalid id" }, { status: 400 });
    }

    await connectDB();

    const body = await req.json();

    // Whitelist: only these fields can be updated
    const allowed = [
      "name",
      "price",
      "image",
      "images",
      "description",
      "category",
    ];
    const update: Record<string, unknown> = {};

    for (const key of allowed) {
      if (body[key] !== undefined) update[key] = body[key];
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, update, {
      new: true,
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PUT /api/products/[id]:", error);

    return NextResponse.json({ message: "Update failed" }, { status: 500 });
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

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/products/[id]:", error);

    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
}
>>>>>>> 414d771 (CSS Changes)
