import test from "node:test";
import assert from "node:assert/strict";

import {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
} from "../src/validators/userValidators.js";

test("valid registration data is accepted and email is normalized", () => {
  const result = validateRegistration({
    name: "  Divine Billion  ",
    email: "  DIVINE@EXAMPLE.COM ",
    password: "SecurePass123",
    role: "admin",
    plan: "premium-plus",
  });

  assert.equal(result.isValid, true);
  assert.equal(result.data.name, "Divine Billion");
  assert.equal(result.data.email, "divine@example.com");
  assert.equal(result.data.role, undefined);
  assert.equal(result.data.plan, undefined);
});

test("registration rejects a short name", () => {
  const result = validateRegistration({
    name: "D",
    email: "divine@example.com",
    password: "SecurePass123",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test("registration rejects an invalid email", () => {
  const result = validateRegistration({
    name: "Divine Billion",
    email: "invalid-email",
    password: "SecurePass123",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test("registration rejects a short password", () => {
  const result = validateRegistration({
    name: "Divine Billion",
    email: "divine@example.com",
    password: "short",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test("login accepts valid credentials and normalizes email", () => {
  const result = validateLogin({
    email: "  DIVINE@EXAMPLE.COM ",
    password: "SecurePass123",
  });

  assert.equal(result.isValid, true);
  assert.equal(result.data.email, "divine@example.com");
  assert.equal(result.data.password, "SecurePass123");
});

test("login rejects a missing password", () => {
  const result = validateLogin({
    email: "divine@example.com",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test("profile update accepts a valid name", () => {
  const result = validateProfileUpdate({
    name: "  Divine Billion  ",
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.data, {
    name: "Divine Billion",
  });
});

test("profile update rejects attempts to change role or plan", () => {
  const result = validateProfileUpdate({
    role: "admin",
    plan: "premium-plus",
    isActive: true,
  });

  assert.equal(result.isValid, false);
  assert.deepEqual(result.data, {});
  assert.ok(result.errors.length > 0);
});

test("profile update rejects an invalid avatar URL", () => {
  const result = validateProfileUpdate({
    avatar: "not-a-valid-url",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});

test("profile update rejects an empty name", () => {
  const result = validateProfileUpdate({
    name: "   ",
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.length > 0);
});
