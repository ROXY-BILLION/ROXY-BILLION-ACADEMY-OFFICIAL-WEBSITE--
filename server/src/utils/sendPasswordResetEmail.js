import nodemailer from "nodemailer";

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_FROM,
  CLIENT_URL,
} = process.env;

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

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

  const clientUrl = CLIENT_URL.replace(/\/+$/, "");

  const resetUrl = `${clientUrl}/reset-password/${encodeURIComponent(token)}`;

  const safeResetUrl = escapeHtml(resetUrl);
  const safeEmail = escapeHtml(email);

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT),
    secure: Number(EMAIL_PORT) === 465,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD,
    },
  });

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
      <p>
        We received a request to reset the password for
        ${safeEmail}.
      </p>
      <p>
        <a href="${safeResetUrl}">Reset my password</a>
      </p>
      <p>This link expires in 15 minutes.</p>
      <p>If you did not request a reset, you can ignore this email.</p>
    `,
  });
};