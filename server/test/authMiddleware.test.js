import test from "node:test";
import assert from "node:assert/strict";
import { requireRole } from "../src/middleware/authMiddleware.js";

function createResponse() {
  return {
    statusCode: 200,
    body: null,

    status(code) {
      this.statusCode = code;
      return this;
    },

    json(data) {
      this.body = data;
      return this;
    },
  };
}

test("admin is allowed to access admin routes", () => {
  const req = { user: { role: "admin" } };
  const res = createResponse();
  let nextCalled = false;

  requireRole("admin")(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(res.statusCode, 200);
});

test("student is blocked from admin routes", () => {
  const req = { user: { role: "student" } };
  const res = createResponse();
  let nextCalled = false;

  requireRole("admin")(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 403);
  assert.equal(res.body.success, false);
});

test("request without a user is rejected", () => {
  const req = {};
  const res = createResponse();
  let nextCalled = false;

  requireRole("admin")(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, false);
  assert.equal(res.statusCode, 401);
  assert.equal(res.body.success, false);
});

test("multiple allowed roles are supported", () => {
  const req = { user: { role: "student" } };
  const res = createResponse();
  let nextCalled = false;

  requireRole("admin", "student")(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
});
