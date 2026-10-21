const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Internal server error.";

    // Handle invalid JSON.
    if (
        err instanceof SyntaxError &&
        err.status === 400 &&
        "body" in err
    ) {
        statusCode = 400;
        message = "Invalid JSON request body.";
    }

    // Handle request bodies that exceed the configured limit.
    if (err.type === "entity.too.large") {
        statusCode = 413;
        message = "Request body is too large.";
    }

    // Do not expose unexpected internal errors in production.
    if (statusCode >= 500 && process.env.NODE_ENV === "production") {
        message = "An unexpected server error occurred.";
    }

    if (statusCode >= 500) {
        console.error(err);
    }

    return res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorHandler;