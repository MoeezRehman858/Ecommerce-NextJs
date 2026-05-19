import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { connectDB } from "@/lib/db";
import Wishlist from "@/models/Wishlist";

export async function POST(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const body = await req.json();

    const existingWishlist = await Wishlist.findOne({
      user: decoded.userId,
      product: body.productId,
    });

    if (existingWishlist) {
      return NextResponse.json({
        message: "Already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: decoded.userId,
      product: body.productId,
    });

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to add wishlist" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const wishlist = await Wishlist.find({
      user: decoded.userId,
    }).populate("product");

    return NextResponse.json(wishlist);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch wishlist" },
      { status: 500 },
    );
  }
}
export async function DELETE(req: Request) {
  try {
    await connectDB();

    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const body = await req.json();

    await Wishlist.findOneAndDelete({
      user: decoded.userId,
      product: body.productId,
    });

    return NextResponse.json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to remove wishlist item" },
      { status: 500 },
    );
  }
}
