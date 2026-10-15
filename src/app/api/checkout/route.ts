import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { cartItems } = await req.json();

    const origin = new URL(req.url).origin;

    const line_items = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/success`,
      cancel_url: `${origin}/cart`,
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Checkout failed" },
      { status: 500 }
    );
  }
}