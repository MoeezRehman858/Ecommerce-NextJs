import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import Collection from "@/models/Collection";

export async function GET() {
  try {
    await connectDB();

    const collections = await Collection.find().sort({ createdAt: -1 });

    return NextResponse.json(collections);
  } catch (error) {
    console.error("GET /api/collections:", error);

    return NextResponse.json(
      { message: "Failed to fetch collections" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const { name, description, image } = await req.json();

    const collection = await Collection.create({ name, description, image });

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error("POST /api/collections:", error);

    return NextResponse.json(
      { message: "Failed to create collection" },
      { status: 500 },
    );
  }
}
