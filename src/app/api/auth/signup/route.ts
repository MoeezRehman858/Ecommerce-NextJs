import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        await connectDB();

        const { name, email, password} = await req.json();
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return NextResponse.json({ message: "User Already existed"}, { status: 400});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
        });
        return NextResponse.json(user, {status: 201});
    }catch (error){
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}