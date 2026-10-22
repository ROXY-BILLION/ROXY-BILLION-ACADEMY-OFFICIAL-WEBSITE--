import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: [2, "Name must contain at least 2 characters."],
            maxlength: [80, "Name cannot exceed 80 characters."],
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                "Please provide a valid email address.",
            ],
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [8, "Password must contain at least 8 characters."],
            select: false,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
            required: true,
        },

        plan: {
            type: String,
            enum: ["free", "premium", "premium-plus"],
            default: "free",
            required: true,
        },

        avatar: {
            type: String,
            default: "",
            trim: true,
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        emailVerified: {
            type: Boolean,
            default: false,
        },
        
        resetPasswordToken: {
        type: String,
        select: false,
        default: undefined,
        },

        resetPasswordExpires: {
        type: Date,
        select: false,
        default: undefined,
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    }
);

// Hash the password before saving it to MongoDB.
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(this.password, 12);
});

// Compare a supplied password with the stored password hash.
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) {
        throw new Error(
            "Password was not selected. Use .select('+password') when querying."
        );
    }

    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
