import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
    })
);

app.use(express.json());
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Roxy Billion Academy API.",
    });
});

app.use("/api/health", healthRoutes);

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch {
        console.error(
            "Server startup failed. Check your MongoDB connection and .env file."
        );
        process.exitCode = 1;
    }
};

startServer();
