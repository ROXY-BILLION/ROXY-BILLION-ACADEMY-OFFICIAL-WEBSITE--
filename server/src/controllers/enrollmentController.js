
import mongoose from "mongoose";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

export const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (
      typeof courseId !== "string" ||
      !mongoose.isValidObjectId(courseId)
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid course ID is required.",
      });
    }

    const course = await Course.findOne({
      _id: courseId,
      status: "published",
    });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Published course not found.",
      });
    }

    if (course.plan !== "Free") {
      return res.status(403).json({
        success: false,
        message:
          "Paid course enrolment is unavailable until payment integration is implemented.",
      });
    }

    const existingEnrollment = await Enrollment.findOne({
      student: req.user._id,
      course: course._id,
    }).populate("course");

    if (existingEnrollment) {
      return res.status(200).json({
        success: true,
        message: "You are already enrolled in this course.",
        enrollment: existingEnrollment,
      });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: course._id,
    });

    await enrollment.populate("course");

    return res.status(201).json({
      success: true,
      message: "You have enrolled successfully.",
      enrollment,
    });
  } catch (error) {
    if (error.code === 11000) {
      const existingEnrollment = await Enrollment.findOne({
        student: req.user._id,
        course: req.body.courseId,
      }).populate("course");

      if (existingEnrollment) {
        return res.status(200).json({
          success: true,
          message: "You are already enrolled in this course.",
          enrollment: existingEnrollment,
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Failed to enrol in this course.",
    });
  }
};

export const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      student: req.user._id,
    })
      .populate("course")
      .sort({ enrolledAt: -1 });

    const availableEnrollments = enrollments.filter(
      (enrollment) =>
        enrollment.course &&
        enrollment.course.status === "published"
    );

    return res.status(200).json({
      success: true,
      count: availableEnrollments.length,
      enrollments: availableEnrollments,
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve your enrolled courses.",
    });
  }
};
