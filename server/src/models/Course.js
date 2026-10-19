import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Course title is required"],
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            unique: true,
            trim: true,
        },

        shortDescription: {
            type: String,
            trim: true,
            maxlength: 300,
            default: "",
        },

        description: {
            type: String,
            required: [true, "Course description is required"],
            trim: true,
        },

        category: {
            type: String,
            required: [true, "Course category is required"],
            trim: true,
        },

        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner",
        },

        plan: {
            type: String,
            enum: ["Free", "Premium", "Premium+"],
            default: "Free",
        },

        price: {
            type: Number,
            min: 0,
            default: 0,
        },

        thumbnail: {
            type: String,
            default: "",
        },

        duration: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },

        whatYouWillLearn: {
            type: [String],
            default: [],
        },

        requirements: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
