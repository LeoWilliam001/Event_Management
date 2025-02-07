import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: String,
    description: String,
    date: Date,
    attendees: { type: Number, default: 0 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } 
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;