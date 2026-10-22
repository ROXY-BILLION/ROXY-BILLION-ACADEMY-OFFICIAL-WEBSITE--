import jwt from "jsonwebtoken";

const TOKEN_ISSUER = "roxy-billion-academy";
const TOKEN_AUDIENCE = "roxy-billion-academy-users";

export const generateToken = (userId) => {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error(
            "JWT_SECRET must be configured with a strong secret of at least 32 characters."
        );
    }

    return jwt.sign(
        {},
        secret,
        {
            subject: userId.toString(),
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
            issuer: TOKEN_ISSUER,
            audience: TOKEN_AUDIENCE,
            algorithm: "HS256",
        }
    );
};

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;

    if (!secret || secret.length < 32) {
        throw new Error("JWT_SECRET is missing or too short.");
    }

    return jwt.verify(token, secret, {
        issuer: TOKEN_ISSUER,
        audience: TOKEN_AUDIENCE,
        algorithms: ["HS256"],
    });
};
