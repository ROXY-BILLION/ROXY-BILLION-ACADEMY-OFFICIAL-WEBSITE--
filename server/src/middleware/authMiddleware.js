import User from "../models/User.js";
import { verifyToken } from "../utils/generateToken.js";
import { COOKIE_NAME } from "../utils/authCookie.js";

export const protect = async (req, res, next) => {
  try {
    const cookieToken = req.cookies?.[COOKIE_NAME];

    const authorization = req.headers.authorization;

    const bearerToken = authorization?.startsWith("Bearer ")
      ? authorization.slice(7).trim()
      : null;

    const token = cookieToken || bearerToken;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const decoded = verifyToken(token);

    if (
      !decoded ||
      typeof decoded.sub !== "string" ||
      !decoded.sub.trim()
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authentication token.",
      });
    }

    const user = await User.findById(decoded.sub).select("+tokenVersion");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Your account is unavailable. Please log in again.",
      });
    }

    const currentVersion = user.tokenVersion ?? 0;
    const tokenVersion = decoded.tokenVersion ?? 0;

    if (tokenVersion !== currentVersion) {
      return res.status(401).json({
        success: false,
        message: "Your session is no longer valid. Please log in again.",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError" ||
      error.name === "NotBeforeError"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired authentication token.",
      });
    }

    return next(error);
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
        message: "You do not have permission to perform this action.",
      });
    }

    return next();
  };
};