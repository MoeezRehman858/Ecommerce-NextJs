import { NextResponse } from "next/server";
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

    if (!collection) {
      return NextResponse.json(
        { message: "Collection not found" },
        { status: 404 }
      );
    }

    const products = await Product.find({ collection: resolvedParams.id });

    return NextResponse.json({ collection, products });
  } catch (error) {
    console.error("GET /api/collections/[id]:", error);
    return NextResponse.json(
      { message: "Failed to fetch collection" },
      { status: 500 }
    );
  }
}

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
  }
}
