import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connectDB from "@/lib/db";  

export async function POST(req) {
    try {
        await connectDB(); // Ensure DB is connected

        const { name, email, password } = await req.json();

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        // Save user with hashed password
        const newUser = new User({ name, email, password });
        await newUser.save();

        return NextResponse.json({ message: "Signup successful!" }, { status: 201 });
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}