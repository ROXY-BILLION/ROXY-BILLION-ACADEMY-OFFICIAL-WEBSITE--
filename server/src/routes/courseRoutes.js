import express from "express";

import {
    createCourse,
    getCourses,
    getCourseById,
} from "../controllers/courseController.js";

const router = express.Router();

router.route("/")
    .get(getCourses)
    .post(createCourse);

router.get("/:id", getCourseById);

export default router;
