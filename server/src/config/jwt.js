import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
    throw new Error(
        "JWT_SECRET must be configured with a secret of at least 32 characters."
    );
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const createAccessToken = (userId) => {
    return jwt.sign(
        { sub: userId.toString() },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN,
            issuer: "roxy-billion-academy",
            audience: "roxy-billion-academy-users",
        }
    );
};

export const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_SECRET, {
        issuer: "roxy-billion-academy",
        audience: "roxy-billion-academy-users",
    });
};
