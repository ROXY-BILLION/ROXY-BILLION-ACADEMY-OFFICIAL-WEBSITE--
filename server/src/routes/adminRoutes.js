import { Router } from "express";
import {
  protect,
  requireRole,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get(
  "/access-check",
  protect,
  requireRole("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Admin access granted.",
    });
  }
);

export default router;