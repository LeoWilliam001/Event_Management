import connectDB from "@/lib/db"; // Import database connection
import { NextResponse } from "next/server";

connectDB(); // Connect to MongoDB once

export async function GET() {
    return NextResponse.json({ message: "Auth API is working" });
}
