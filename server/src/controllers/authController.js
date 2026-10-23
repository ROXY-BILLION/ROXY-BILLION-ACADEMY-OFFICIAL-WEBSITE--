import User from "../models/User.js";

import {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
} from "../validators/userValidators.js";

import {
  generateToken,
  verifyToken,
} from "../utils/generateToken.js";

import {
  COOKIE_NAME,
  setAuthCookie,
  clearAuthCookie,
} from "../utils/authCookie.js";

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

    const user = await User.create(data);
    const token = generateToken(user._id, user.tokenVersion ?? 0);

    setAuthCookie(res, token, true);

    return res.status(201).json({
      success: true,
      message: "Your account has been created successfully.",
      user: getPublicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists.",
      });
    }

    return next(error);
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

    const user = await User.findOne({ email: data.email })
      .select("+password +tokenVersion");

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

    const token = generateToken(user._id, user.tokenVersion ?? 0);

    setAuthCookie(res, token, req.body.rememberMe !== false);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: getPublicUser(user),
    });
  } catch (error) {
    return next(error);
  }
};

export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: getPublicUser(req.user),
  });
};

export const logout = async (req, res, next) => {
  try {
    const token = req.cookies?.[COOKIE_NAME];

    if (token) {
      try {
        const decoded = verifyToken(token);

        const user = await User.findById(decoded.sub)
          .select("+tokenVersion");

        if (
          user &&
          (decoded.tokenVersion ?? 0) === (user.tokenVersion ?? 0)
        ) {
          user.tokenVersion = (user.tokenVersion ?? 0) + 1;
          await user.save();
        }
      } catch (error) {
        const invalidTokenErrors = [
          "JsonWebTokenError",
          "TokenExpiredError",
          "NotBeforeError",
        ];

        if (!invalidTokenErrors.includes(error.name)) {
          throw error;
        }
      }
    }

    clearAuthCookie(res);

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const validation = validateProfileUpdate(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Please correct your profile details.",
        errors: validation.errors,
      });
    }

    const { name, avatar } = validation.data;

    if (name !== undefined) {
      req.user.name = name;
    }

    if (avatar !== undefined) {
      req.user.avatar = avatar;
    }

    await req.user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: getPublicUser(req.user),
    });
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body ?? {};

    if (
      typeof currentPassword !== "string" ||
      !currentPassword ||
      typeof newPassword !== "string" ||
      newPassword.length < 8 ||
      newPassword.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Provide your current password and a new password between 8 and 72 characters.",
      });
    }

    const user = await User.findById(req.user._id)
      .select("+password +tokenVersion");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is unavailable.",
      });
    }

    const passwordMatches =
      await user.comparePassword(currentPassword);

    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect.",
      });
    }

    user.password = newPassword;
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;

    await user.save();

    const token = generateToken(user._id, user.tokenVersion);

    // Issue a new session cookie after invalidating old tokens.
    setAuthCookie(res, token, true);

    return res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

export const deactivateAccount = async (req, res, next) => {
  try {
    const { password } = req.body ?? {};

    if (typeof password !== "string" || !password) {
      return res.status(400).json({
        success: false,
        message: "Your password is required to deactivate your account.",
      });
    }

    const user = await User.findById(req.user._id)
      .select("+password +tokenVersion");

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is unavailable.",
      });
    }

    const passwordMatches = await user.comparePassword(password);

    if (!passwordMatches) {
      return res.status(400).json({
        success: false,
        message: "Password is incorrect.",
      });
    }

    user.isActive = false;
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;

    await user.save();
    clearAuthCookie(res);

    return res.status(200).json({
      success: true,
      message:
        "Account deactivated successfully. You will no longer be able to access it.",
    });
  } catch (error) {
    return next(error);
  }
};