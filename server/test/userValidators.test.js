import test from "node:test";
import assert from "node:assert/strict";

import {
    validateRegistration,
    validateLogin,
    validateProfileUpdate,
} from "../src/validators/userValidators.js";

test("valid registration data is accepted and email is normalized", () => {
    const result = validateRegistration({
        name: "  Test Student  ",
        email: "  STUDENT@example.com ",
        password: "TestPassword123",
        role: "admin",
        plan: "premium",
    });

    assert.equal(result.isValid, true);
    assert.equal(result.data.name, "Test Student");
    assert.equal(result.data.email, "student@example.com");

    // Registration validation must not pass through role or plan.
    assert.equal("role" in result.data, false);
    assert.equal("plan" in result.data, false);
});

test("registration rejects a short name", () => {
    const result = validateRegistration({
        name: "A",
        email: "student@example.com",
        password: "TestPassword123",
    });

    assert.equal(result.isValid, false);
});

test("registration rejects an invalid email", () => {
    const result = validateRegistration({
        name: "Test Student",
        email: "not-an-email",
        password: "TestPassword123",
    });

    assert.equal(result.isValid, false);
});

test("registration rejects a short password", () => {
    const result = validateRegistration({
        name: "Test Student",
        email: "student@example.com",
        password: "123",
    });

    assert.equal(result.isValid, false);
});

test("login accepts valid credentials and normalizes email", () => {
    const result = validateLogin({
        email: " STUDENT@example.com ",
        password: "TestPassword123",
    });

    assert.equal(result.isValid, true);
    assert.equal(result.data.email, "student@example.com");
    assert.equal(result.data.password, "TestPassword123");
});

test("login rejects a missing password", () => {
    const result = validateLogin({
        email: "student@example.com",
    });

    assert.equal(result.isValid, false);
});

test("profile update accepts a valid name", () => {
    const result = validateProfileUpdate({
        name: "  Updated Student  ",
    });

    assert.equal(result.isValid, true);
    assert.deepEqual(result.data, {
        name: "Updated Student",
    });
});

test("profile update rejects attempts to change role or plan", () => {
    const result = validateProfileUpdate({
        role: "admin",
        plan: "premium-plus",
        isActive: true,
    });

    assert.equal(result.isValid, true);
    assert.deepEqual(result.data, {});
});

test("profile update rejects an invalid avatar URL", () => {
    const result = validateProfileUpdate({
        avatar: "javascript:alert(1)",
    });

    assert.equal(result.isValid, false);
});

test("profile update rejects an empty name", () => {
    const result = validateProfileUpdate({
        name: " ",
    });

    assert.equal(result.isValid, false);
});
