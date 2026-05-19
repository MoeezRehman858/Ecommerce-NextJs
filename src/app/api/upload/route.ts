import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const fileStr = body.image;

    const uploadedResponse = await cloudinary.uploader.upload(
      fileStr,
      {
        folder: "ecommerce-products",
      }
    );

    return NextResponse.json({
      url: uploadedResponse.secure_url,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}