import { randomBytes, createHash } from "node:crypto";
import User from "../models/User.js";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";

const genericMessage =
  "If an account exists for that email, password reset instructions will be sent.";

export const forgotPassword = async (req, res, next) => {
  try {
    const email =
      typeof req.body.email === "string"
        ? req.body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const user = await User.findOne({ email });

    if (!user || !user.isActive) {
      return res.status(200).json({
        success: true,
        message: genericMessage,
      });
    }

    const rawToken = randomBytes(32).toString("hex");

    const hashedToken = createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(
      Date.now() + 15 * 60 * 1000
    );

    await user.save();

    try {
      await sendPasswordResetEmail(user.email, rawToken);
    } catch (emailError) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      console.error(
        "Password reset email delivery failed:",
        emailError.message
      );
    }

    return res.status(200).json({
      success: true,
      message: genericMessage,
    });
  } catch (error) {
    return next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (
      typeof token !== "string" ||
      !token ||
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 72
    ) {
      return res.status(400).json({
        success: false,
        message:
          "A valid reset token and password of 8–72 characters are required.",
      });
    }

    const hashedToken = createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() },
      isActive: true,
    }).select("+tokenVersion");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Password reset token is invalid or has expired.",
      });
    }

    user.password = password;
    user.tokenVersion = (user.tokenVersion ?? 0) + 1;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully. You can now log in.",
    });
  } catch (error) {
    return next(error);
  }
};