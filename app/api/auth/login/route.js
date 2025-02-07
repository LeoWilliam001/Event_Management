import { NextResponse } from "next/server";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";

export async function POST(req) {
    await connectDB(); // Ensure DB is connected

    try {
        const { email, password } = await req.json();

        const user = await User.findOne({ email });
        if (!user || !(await user.matchPassword(password))) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return NextResponse.json({ message: "Login successful", user, token });
    } catch (error) {
        console.error("Login failed", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}