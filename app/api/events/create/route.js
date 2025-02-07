import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/eventModel";

export async function POST(req) {
    await connectDB(); // Ensure DB is connected

    try {
        const { name, description, date, createdBy } = await req.json();

        // Create a new event
        const newEvent = new Event({
            name,
            description,
            date,
            createdBy
        });
        await newEvent.save();

        return NextResponse.json({ message: "Event created successfully", event: newEvent });
    } catch (error) {
        console.error("Failed to create event", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}