const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateRegistration = (body = {}) => {
    const errors = [];

    const name =
        typeof body.name === "string" ? body.name.trim() : "";

    const email =
        typeof body.email === "string"
            ? body.email.trim().toLowerCase()
            : "";

    const password =
        typeof body.password === "string" ? body.password : "";

    if (name.length < 2 || name.length > 80) {
        errors.push("Name must contain 2 to 80 characters.");
    }

    if (email.length > 254 || !emailPattern.test(email)) {
        errors.push("Please provide a valid email address.");
    }

    if (password.length < 8) {
        errors.push("Password must contain at least 8 characters.");
    }

    if (password.length > 72) {
        errors.push("Password cannot exceed 72 characters.");
    }

    return {
        isValid: errors.length === 0,
        errors,
        data: {
            name,
            email,
            password,
        },
    };
};

export const validateLogin = (body = {}) => {
    const errors = [];

    const email =
        typeof body.email === "string"
            ? body.email.trim().toLowerCase()
            : "";

    const password =
        typeof body.password === "string" ? body.password : "";

    if (!email || email.length > 254 || !emailPattern.test(email)) {
        errors.push("Please provide a valid email address.");
    }

    if (!password || password.length > 72) {
        errors.push("Please provide a valid password.");
    }

    return {
        isValid: errors.length === 0,
        errors,
        data: {
            email,
            password,
        },
    };
};

export const validateProfileUpdate = (body = {}) => {
    const errors = [];
    const data = {};

    if (
        !body ||
        typeof body !== "object" ||
        Array.isArray(body)
    ) {
        return {
            isValid: false,
            errors: ["A valid request body is required."],
            data,
        };
    }

    if (Object.hasOwn(body, "name")) {
        if (typeof body.name !== "string") {
            errors.push("Name must be text.");
        } else {
            const name = body.name.trim();

            if (name.length < 2 || name.length > 80) {
                errors.push("Name must contain 2 to 80 characters.");
            } else {
                data.name = name;
            }
        }
    }

    if (Object.hasOwn(body, "avatar")) {
        if (typeof body.avatar !== "string" || body.avatar.length > 2048) {
            errors.push("Avatar must be a valid URL string.");
        } else {
            const avatar = body.avatar.trim();

            if (avatar) {
                try {
                    const parsedUrl = new URL(avatar);

                    if (
                        !["http:", "https:"].includes(parsedUrl.protocol)
                    ) {
                        throw new Error("Unsupported URL protocol.");
                    }
                } catch {
                    errors.push("Avatar must be a valid HTTP or HTTPS URL.");
                }
            }

            if (errors.length === 0) {
                data.avatar = avatar;
            }
        }
    }

    return {
        isValid: errors.length === 0,
        errors,
        data,
    };
};
