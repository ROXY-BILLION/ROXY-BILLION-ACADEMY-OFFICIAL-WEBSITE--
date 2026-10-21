import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
        throw new Error(
            "MONGODB_URI is missing from the server environment."
        );
    }

    try {
        mongoose.set("strictQuery", true);

        const connection = await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log(
            `MongoDB connected: ${connection.connection.host}`
        );

        return connection;
    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        throw error;
    }
};

export default connectDB;