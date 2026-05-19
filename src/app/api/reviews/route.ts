import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Review from "@/models/Review";
import User from "@/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
    const user = await User.findById(decoded.userId);
    const review = await Review.create({
      user: decoded.userId,

      product: body.productId,

      name: user.name,

      comment: body.comment,

      rating: body.rating,

      image: body.image,
    });

    return NextResponse.json(review);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to add review" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const productId = searchParams.get("productId");

    const reviews = await Review.find({
      product: productId,
    }).sort({
      createdAt: -1,
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to fetch reviews" },
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
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    const user = await User.findById(decoded.userId);

    // ONLY ADMIN CAN DELETE
    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Admin only" },
        { status: 403 }
      );
    }

    const body = await req.json();

    await Review.findByIdAndDelete(body.reviewId);

    return NextResponse.json({
      message: "Review deleted",
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to delete review" },
      { status: 500 }
    );
  }
}
