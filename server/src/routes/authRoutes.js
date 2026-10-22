import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
    register,
    login,
    getMe,
    logout,
    updateProfile
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many authentication attempts. Please try again later.",
    },
});

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.patch("/profile", protect, updateProfile);

export default router;
