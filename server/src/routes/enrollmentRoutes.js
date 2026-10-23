import { Router } from "express";
import {
  enrollInCourse,
  getMyEnrollments,
} from "../controllers/enrollmentController.js";
import {
  protect,
  requireRole,
} from "../middleware/authMiddleware.js";

const router = Router();

router.use(protect, requireRole("student"));

router.get("/my", getMyEnrollments);
router.post("/", enrollInCourse);

export default router;
