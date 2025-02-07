import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Using existing database connection");
            return;
        }

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;