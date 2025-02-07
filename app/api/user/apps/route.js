import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import EventApplication from "@/models/eventFormModel"; 

export async function GET(req) {
    await connectDB(); 

    const userId = req.nextUrl.searchParams.get("userId");

    try {
        const applications = await EventApplication.find({ userId });
        return NextResponse.json(applications);
    } catch (error) {
        console.error("Failed to fetch user applications", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}