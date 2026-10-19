import express from "express";
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Roxy Billion Academy API is running.",
        database:
            mongoose.connection.readyState === 1
                ? "connected"
                : "disconnected",
    });
});

export default router;
