import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/eventModel";

export async function GET(req) {
    await connectDB(); // Ensure DB is connected

    try {
        const events = await Event.find();
        return NextResponse.json(events);
    } catch (error) {
        console.error("Failed to fetch events", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}