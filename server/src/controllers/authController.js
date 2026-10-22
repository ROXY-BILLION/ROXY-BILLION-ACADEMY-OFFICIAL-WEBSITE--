import User from "../models/User.js";
import {
    validateRegistration,
    validateLogin,
} from "../validators/userValidators.js";
import { generateToken } from "../utils/generateToken.js";
import { validateProfileUpdate } from "../validators/userValidators.js";

const getPublicUser = (user) => ({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    plan: user.plan,
    avatar: user.avatar,
    emailVerified: user.emailVerified,
    createdAt: user.createdAt,
});

export const register = async (req, res, next) => {
    try {
        const { data, errors } = validateRegistration(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please correct the registration details.",
                errors,
            });
        }

        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        // Only validated name, email, and password enter account creation.
        // The User model assigns role="student" and plan="free".
        const user = await User.create(data);
        const token = generateToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Your account has been created successfully.",
            token,
            user: getPublicUser(user),
        });
    } catch (error) {
        // Also handles concurrent requests for the same unique email.
        if (error.code === 11000) {
            return res.status(409).json({
                success: false,
                message: "An account with this email already exists.",
            });
        }

        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { data, errors } = validateLogin(req.body);

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email and password.",
                errors,
            });
        }

        const user = await User.findOne({
            email: data.email,
        }).select("+password");

        // Keep the response the same for unknown email and wrong password.
        if (!user || !(await user.comparePassword(data.password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password.",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: "This account has been deactivated.",
            });
        }

        const token = generateToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: getPublicUser(user),
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = (req, res) => {
    return res.status(200).json({
        success: true,
        user: getPublicUser(req.user),
    });
};

export const logout = (req, res) => {
    // JWT bearer authentication is stateless.
    // The client must discard its token after logout.
    return res.status(200).json({
        success: true,
        message: "Logout successful. Please discard your authentication token.",
    });
};


export const updateProfile = async (req, res, next) => {
  try {
    const { validateProfileUpdate } = await import(
      "../validators/userValidators.js"
    );

    const validation = validateProfileUpdate(req.body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        message: validation.message,
      });
    }

    const updates = validation.data;

    if (updates.name !== undefined) {
      req.user.name = updates.name;
    }

    if (updates.avatar !== undefined) {
      req.user.avatar = updates.avatar;
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: req.user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};


