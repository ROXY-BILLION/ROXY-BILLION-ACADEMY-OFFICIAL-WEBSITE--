import nodemailer from "nodemailer";

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  CLIENT_URL,
} = process.env;

export const sendPasswordResetEmail = async (email, token) => {
  if (
    !EMAIL_HOST ||
    !EMAIL_PORT ||
    !EMAIL_USER ||
    !EMAIL_PASSWORD ||
    !EMAIL_FROM ||
    !CLIENT_URL
  ) {
    throw new Error("Password reset email is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

  const resetUrl = `${CLIENT_URL.replace(/\/$/, "")}/reset-password/${encodeURIComponent(token)}`;

  await transporter.sendMail({
    from: EMAIL_FROM,
    to: email,
    subject: "Reset your Roxy Billion Academy password",
    text: [
      "We received a request to reset your password.",
      "",
      `Open this link to choose a new password: ${resetUrl}`,
      "",
      "This link expires in 15 minutes.",
      "If you did not request a reset, you can ignore this email.",
    ].join("\n"),
    html: `
      <h2>Reset your password</h2>
      <p>We received a request to reset your Roxy Billion Academy password.</p>
      <p>
        <a href="${resetUrl}">Reset my password</a>
      </p>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request a reset, you can ignore this email.</p>
    `,
  });
};
