
import { Router } from "express";
import {
    protect,
    requireRole,
} from "../middleware/authMiddleware.js";

const router = Router();

// Only authenticated admins can access this endpoint.
router.get(
    "/access-check",
    protect,
    requireRole("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Admin access verified successfully.",
            user: {
                id: req.user._id.toString(),
                name: req.user.name,
                role: req.user.role,
            },
        });
    }
);

export default router;
