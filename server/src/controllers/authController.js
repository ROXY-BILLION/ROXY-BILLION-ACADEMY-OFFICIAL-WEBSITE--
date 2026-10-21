import User from "../models/User.js";
import {
    validateRegistration,
    validateLogin,
} from "../validators/userValidators.js";
import { createAccessToken } from "../config/jwt.js";

const sendError = (res, statusCode, message, errors) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors ? { errors } : {}),
    });
};

const publicUser = (user) => ({
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
            return sendError(
                res,
                400,
                "Please correct the registration details.",
                errors
            );
        }

        const existingUser = await User.findOne({
            email: data.email,
        });

        if (existingUser) {
            return sendError(
                res,
                409,
                "An account with this email already exists."
            );
        }

        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password,
        });

        const token = createAccessToken(user._id);

        return res.status(201).json({
            success: true,
            message: "Account created successfully.",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        if (error.code === 11000) {
            return sendError(
                res,
                409,
                "An account with this email already exists."
            );
        }

        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { data, errors } = validateLogin(req.body);

        if (errors.length > 0) {
            return sendError(
                res,
                400,
                "Please provide a valid email and password.",
                errors
            );
        }

        const user = await User.findOne({
            email: data.email,
        }).select("+password");

        if (!user || !(await user.comparePassword(data.password))) {
            return sendError(
                res,
                401,
                "Invalid email or password."
            );
        }

        if (!user.isActive) {
            return sendError(
                res,
                403,
                "This account has been deactivated."
            );
        }

        const token = createAccessToken(user._id);

        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: publicUser(user),
        });
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: publicUser(req.user),
    });
};

export const logout = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Logout acknowledged. Remove the access token on the client.",
    });
};
