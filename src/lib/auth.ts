import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// Reads the token cookie and returns the user from the DB (or null).
// Admin status is checked against the database, not the token, so a
// demoted admin loses access immediately.
export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await connectDB();
    return await User.findById(decoded.userId).select("-password");
  } catch {
    return null;
  }
}

// Use at the top of any route that needs a logged-in user:
//   const { error, user } = await requireUser();
//   if (error) return error;
export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 },
      ),
      user: null,
    };
  }

  return { error: null, user };
}

// Use at the top of any route that only admins may call:
//   const { error } = await requireAdmin();
//   if (error) return error;
export async function requireAdmin() {
  const { error, user } = await requireUser();

  if (error) return { error, user: null };

  if (!user.isAdmin) {
    return {
      error: NextResponse.json({ message: "Forbidden" }, { status: 403 }),
      user: null,
    };
  }

  return { error: null, user };
}
