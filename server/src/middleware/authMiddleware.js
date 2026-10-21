import User from "../models/User.js";
import { verifyAccessToken } from "../config/jwt.js";

export const protect = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization?.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        const token = authorization.slice(7).trim();

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication token is missing.",
            });
        }

        let decoded;

        try {
            decoded = verifyAccessToken(token);
        } catch {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired authentication token.",
            });
        }

        const user = await User.findById(decoded.sub);

        if (!user || !user.isActive) {
            return res.status(401).json({
                success: false,
                message: "Your account is unavailable. Please log in again.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        next(error);
    }
};

export const requireRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Authentication required.",
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "You do not have permission to access this resource.",
            });
        }

        next();
    };
};
