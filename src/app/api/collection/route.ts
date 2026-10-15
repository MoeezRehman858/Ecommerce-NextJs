import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
<<<<<<< HEAD
=======
import { requireAdmin } from "@/lib/auth";
>>>>>>> 414d771 (CSS Changes)
import Collection from "@/models/Collection";

export async function GET() {
  try {
    await connectDB();

    const collections = await Collection.find().sort({ createdAt: -1 });

    return NextResponse.json(collections);
  } catch (error) {
    console.error("GET /api/collections:", error);
<<<<<<< HEAD
    return NextResponse.json(
      { message: "Failed to fetch collections" },
      { status: 500 }
=======

    return NextResponse.json(
      { message: "Failed to fetch collections" },
      { status: 500 },
>>>>>>> 414d771 (CSS Changes)
    );
  }
}

export async function POST(req: Request) {
<<<<<<< HEAD
  try {
    await connectDB();

    const body = await req.json();

    const collection = await Collection.create(body);
=======
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    await connectDB();

    const { name, description, image } = await req.json();

    const collection = await Collection.create({ name, description, image });
>>>>>>> 414d771 (CSS Changes)

    return NextResponse.json(collection, { status: 201 });
  } catch (error) {
    console.error("POST /api/collections:", error);
<<<<<<< HEAD
    return NextResponse.json(
      { message: "Failed to create collection" },
      { status: 500 }
=======

    return NextResponse.json(
      { message: "Failed to create collection" },
      { status: 500 },
>>>>>>> 414d771 (CSS Changes)
    );
  }
}
