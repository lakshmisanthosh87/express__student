import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    if (!process.env.MONGO_URI) {
        console.error("MONGO_URI is not defined in environment variables");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        // On Vercel, we shouldn't process.exit(1) as it kills the function permanently
    }
};

export default connectDB;
