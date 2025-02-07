import mongoose from "mongoose";

const eventApplicationSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String,
        required: true
    },
    userComment: {
        type: String,
        required: true
    }
});

const EventApplication = mongoose.models.EventApplication || mongoose.model("EventApplication", eventApplicationSchema);

export default EventApplication;