import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Products";

export async function GET() {
  await connectDB();

  const products = await Product.find();

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const product = await Product.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}