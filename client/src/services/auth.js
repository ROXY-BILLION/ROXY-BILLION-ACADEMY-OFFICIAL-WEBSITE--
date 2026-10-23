const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...(options.headers || {}),
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      response.ok
        ? "The server returned an invalid response."
        : `Request failed with status ${response.status}.`
    );
  }

  if (!response.ok || data?.success === false) {
    const error = new Error(
      data?.message || "Something went wrong. Please try again."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

function normalizeEmail(email) {
  if (typeof email !== "string" || !email.trim()) {
    throw new Error("Please enter a valid email address.");
  }

  return email.trim().toLowerCase();
}

function postAuth(endpoint, body = {}) {
  return apiRequest(`/auth/${endpoint}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function registerUser({ fullName, email, password }) {
  if (typeof fullName !== "string" || !fullName.trim()) {
    throw new Error("Please enter your full name.");
  }

  return postAuth("register", {
    name: fullName.trim(),
    email: normalizeEmail(email),
    password,
  });
}

export function loginUser({
  email,
  password,
  rememberMe = true,
}) {
  return postAuth("login", {
    email: normalizeEmail(email),
    password,
    rememberMe,
  });
}

export function getCurrentUser() {
  return apiRequest("/auth/me");
}

export function logoutUser() {
  return postAuth("logout");
}

export function requestPasswordReset(email) {
  return postAuth("forgot-password", {
    email: normalizeEmail(email),
  });
}

export function submitPasswordReset(token, password) {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("Your password reset link is missing its token.");
  }

  return postAuth(
    `reset-password/${encodeURIComponent(token.trim())}`,
    { password }
  );
}

export function getAuthToken() {
  // The session token is stored in an HTTP-only cookie.
  // JavaScript must not read or expose it.
  return null;
}

export function getAuthUser() {
  // AuthContext maintains the current authenticated user.
  return null;
}

export function saveAuth(data) {
  // The backend sets the HTTP-only cookie.
  if (!data?.user) {
    throw new Error(
      "The server did not return valid user information."
    );
  }
}

export function clearAuth() {
  // The HTTP-only cookie must be cleared by the backend.
  // Use logoutUser() to end the server-managed session.
}

export function changeUserPassword({
  currentPassword,
  newPassword,
}) {
  return apiRequest("/auth/change-password", {
    method: "PATCH",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });
}
export function updateUserProfile({ name, avatar }) {
  return apiRequest("/auth/profile", {
    method: "PATCH",
    body: JSON.stringify({ name, avatar }),
  });
}