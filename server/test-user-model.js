import "dotenv/config";

import mongoose from "mongoose";
import User from "./src/models/User.js";

const runTest = async () => {
    let createdUserId;

    try {
        if (!process.env.MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing from server/.env"
            );
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("PASS: MongoDB connected.");

        const email = `model-test-${Date.now()}@example.com`;
        const originalPassword = "TestPassword123";

        const user = await User.create({
            name: "Test Student",
            email,
            password: originalPassword,
        });

        createdUserId = user._id;

        console.log("PASS: User saved to MongoDB.");

        const storedUser = await User.findById(user._id)
            .select("+password");

        if (!storedUser) {
            throw new Error("Saved user could not be retrieved.");
        }

        if (storedUser.password === originalPassword) {
            throw new Error("Password was not hashed.");
        }

        console.log("PASS: Password was hashed.");

        const correctPasswordWorks =
            await storedUser.comparePassword(originalPassword);

        const wrongPasswordWorks =
            await storedUser.comparePassword("WrongPassword123");

        if (!correctPasswordWorks) {
            throw new Error("Correct password was rejected.");
        }

        if (wrongPasswordWorks) {
            throw new Error("Incorrect password was accepted.");
        }

        console.log("PASS: Password comparison works.");

        const safeUser = user.toJSON();

        if ("password" in safeUser) {
            throw new Error("Password appeared in JSON output.");
        }

        console.log("PASS: Password excluded from JSON.");

        if (user.role !== "student" || user.plan !== "free") {
            throw new Error("Incorrect account defaults.");
        }

        console.log("PASS: Student and Free defaults are correct.");
    } catch (error) {
        console.error("FAIL:", error.message);
        process.exitCode = 1;
    } finally {
        try {
            if (createdUserId) {
                await User.deleteOne({ _id: createdUserId });
                console.log("PASS: Temporary test user deleted.");
            }
        } catch (cleanupError) {
            console.error(
                "WARNING: Could not delete test user:",
                cleanupError.message
            );
        }

        await mongoose.disconnect();
    }
};

runTest();
