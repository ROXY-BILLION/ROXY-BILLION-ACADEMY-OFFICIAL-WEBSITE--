
import express from "express";
import {
    createCourse,
    getCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.route("/")
    .get(getCourses)
    .post(createCourse);

router.route("/:id")
    .get(getCourseById)
    .patch(updateCourse)
    .delete(deleteCourse);

export default router;
