import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import healthRoutes from "./routes/healthRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";


const app = express();
const PORT = process.env.PORT || 5000;

// Configure allowed frontend origins.
const allowedOrigins = (
    process.env.CLIENT_URL || "http://localhost:5173"
)
    .split(",")
    .map((origin) => origin.trim().replace(/\/+$/, ""))
    .filter(Boolean);

// Configure CORS.
app.use(
    cors({
        origin(origin, callback) {
            // Allow requests without an Origin header, such as
            // certain server-to-server requests and command-line tools.
            if (!origin) {
                return callback(null, true);
            }

            const normalizedOrigin = origin.replace(/\/+$/, "");

            if (allowedOrigins.includes(normalizedOrigin)) {
                return callback(null, true);
            }

            const error = new Error(
                "This origin is not allowed by the server."
            );

            error.statusCode = 403;

            return callback(error);
        },
        credentials: true,
    })
);

// Parse incoming JSON with a reasonable size limit.
app.use(express.json({ limit: "1mb" }));

// Parse URL-encoded form submissions.
app.use(
    express.urlencoded({
        extended: true,
        limit: "1mb",
    })
);

// API routes.
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Roxy Billion Academy API.",
    });
});

app.use("/api/health", healthRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Future routes will be registered here:
// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

// Handle unknown routes.
app.use(notFound);

// Handle errors from routes and middleware.
app.use(errorHandler);

// Start the server only after MongoDB connects.
const startServer = async () => {
    try {
        await connectDB();

        const server = app.listen(PORT, () => {
            console.log(
                `Roxy Billion Academy API running on port ${PORT}`
            );
        });

        // Gracefully close the server when the process stops.
        const shutdown = (signal) => {
            console.log(`${signal} received. Shutting down...`);

            server.close(async (error) => {
                if (error) {
                    console.error(
                        "Error closing HTTP server:",
                        error.message
                    );

                    process.exitCode = 1;
                }

                try {
                    const mongoose = await import("mongoose");

                    await mongoose.default.connection.close();

                    console.log("MongoDB connection closed.");
                } catch (dbError) {
                    console.error(
                        "Error closing MongoDB:",
                        dbError.message
                    );

                    process.exitCode = 1;
                }

                process.exit();
            });
        };

        process.once("SIGINT", () => shutdown("SIGINT"));
        process.once("SIGTERM", () => shutdown("SIGTERM"));
    } catch (error) {
        console.error(
            "Server startup failed:",
            error.message
        );

        process.exitCode = 1;
    }
};

startServer();