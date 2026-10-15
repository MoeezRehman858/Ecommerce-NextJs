import { NextResponse } from "next/server";
<<<<<<< HEAD
import mongoose from "mongoose";
import { connectDB } from "@/lib/db";
=======
import { connectDB } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
>>>>>>> 414d771 (CSS Changes)
import Product from "@/models/Products";

export async function GET() {
  try {
    await connectDB();

<<<<<<< HEAD
    console.log("ReadyState:", mongoose.connection.readyState);
    console.log("DB:", mongoose.connection.db?.databaseName);
    console.log("Models:", mongoose.modelNames());
    console.log("Collection:", Product.collection.name);

    const products = await Product.find({}).lean();
=======
    const products = await Product.find({}).sort({ createdAt: -1 }).lean();
>>>>>>> 414d771 (CSS Changes)

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
<<<<<<< HEAD
      { status: 500 }
=======
      { status: 500 },
>>>>>>> 414d771 (CSS Changes)
    );
  }
}

export async function POST(req: Request) {
<<<<<<< HEAD
=======
  const { error } = await requireAdmin();
  if (error) return error;

>>>>>>> 414d771 (CSS Changes)
  try {
    await connectDB();

    const body = await req.json();

<<<<<<< HEAD
    const product = await Product.create(body);
=======
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
>>>>>>> 414d771 (CSS Changes)

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST /api/products:", error);

    return NextResponse.json(
      { message: "Failed to create product" },
<<<<<<< HEAD
      { status: 500 }
    );
  }
}
=======
      { status: 500 },
    );
  }
}
>>>>>>> 414d771 (CSS Changes)
