import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Event from "@/models/eventModel";
import EventApplication from "@/models/eventFormModel"; // Assuming you have this model

export async function POST(req) {
    await connectDB(); // Ensure DB is connected

    try {
        const { eventId, userId, userName, userEmail, userPhone, userComment } = await req.json();

        console.log("Received data:", { eventId, userId, userName, userEmail, userPhone, userComment });

        // Cast userId to ObjectId
        let userObjectId;
        try {
            userObjectId = new mongoose.Types.ObjectId(userId);
        } catch (error) {
            console.error("Invalid userId:", userId);
            return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
        }

        // Check if the user has already applied for the event
        const existingApplication = await EventApplication.findOne({ eventId, userId: userObjectId });
        if (existingApplication) {
            console.log("User has already applied for this event");
            return NextResponse.json({ message: "User has already applied for this event" }, { status: 400 });
        }

        // Store the user's application details
        const newApplication = new EventApplication({
            eventId,
            userId: userObjectId,
            userName,
            userEmail,
            userPhone,
            userComment
        });
        await newApplication.save();

        // Increment the attendee count of the event
        const event = await Event.findById(eventId);
        if (event) {
            event.attendees += 1;
            await event.save();
        }

        return NextResponse.json({ message: "Application successful", application: newApplication });
    } catch (error) {
        console.error("Failed to apply for event", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}