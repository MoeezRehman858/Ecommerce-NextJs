import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { items, totalAmount } = body;

    // 🔐 Get user from cookie
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const order = await Order.create({
      user: decoded.userId,
      items,
      totalAmount,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to place order" },
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
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const orders = await Order.find({
      user: decoded.userId,
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 },
    );
  }
}
