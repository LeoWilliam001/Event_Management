import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Event from "@/models/eventModel";

export async function DELETE(req, { params }) {
    await connectDB(); // Ensure DB is connected

    const { eventId } = await params;

    try {
        await Event.findByIdAndDelete(eventId);
        return NextResponse.json({ message: "Event deleted successfully" });
    } catch (error) {
        console.error("Failed to delete event", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}