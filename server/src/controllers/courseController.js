import mongoose from "mongoose";
import Course from "../models/Course.js";

const createSlug = (title) => {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
};

export const createCourse = async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            description,
            category,
            level,
            plan,
            price,
            thumbnail,
            duration,
            status,
            whatYouWillLearn,
            requirements,
        } = req.body;

        if (!title?.trim() || !description?.trim() || !category?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title, description, and category are required.",
            });
        }

        const slug = createSlug(title);

        const existingCourse = await Course.findOne({ slug });

        if (existingCourse) {
            return res.status(409).json({
                success: false,
                message: "A course with this title already exists.",
            });
        }

        const course = await Course.create({
            title,
            slug,
            shortDescription,
            description,
            category,
            level,
            plan,
            price,
            thumbnail,
            duration,
            status,
            whatYouWillLearn,
            requirements,
        });

        return res.status(201).json({
            success: true,
            message: "Course created successfully.",
            course,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A course with this title already exists.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to create course.",
        });
    }
};

export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: courses.length,
            courses,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve courses.",
        });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID.",
            });
        }

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        return res.status(200).json({
            success: true,
            course,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve course.",
        });
    }
};

const allowedCourseFields = [
    "title",
    "shortDescription",
    "description",
    "category",
    "level",
    "plan",
    "price",
    "thumbnail",
    "duration",
    "status",
    "whatYouWillLearn",
    "requirements",
];

export const updateCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID.",
            });
        }

        const updates = {};

        for (const field of allowedCourseFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one valid field to update.",
            });
        }

        if (
            updates.title !== undefined &&
            (typeof updates.title !== "string" || !updates.title.trim())
        ) {
            return res.status(400).json({
                success: false,
                message: "Course title cannot be empty.",
            });
        }

        if (updates.title !== undefined) {
            updates.title = updates.title.trim();
            updates.slug = createSlug(updates.title);
        }

        const course = await Course.findByIdAndUpdate(
            id,
            { $set: updates },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully.",
            course,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "A course with this title already exists.",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to update course.",
        });
    }
};

export const deleteCourse = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course ID.",
            });
        }

        const course = await Course.findByIdAndDelete(id);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course deleted successfully.",
            courseId: id,
        });
    } catch {
        return res.status(500).json({
            success: false,
            message: "Failed to delete course.",
        });
    }
};

