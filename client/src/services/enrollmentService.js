const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/+$/, "");

async function enrollmentRequest(path, options = {}) {
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
      data?.message || "Unable to process your course request."
    );

    error.status = response.status;
    throw error;
  }

  return data;
}

export async function getMyEnrollments() {
  const data = await enrollmentRequest("/enrollments/my");

  return Array.isArray(data.enrollments)
    ? data.enrollments
    : [];
}

export async function enrollInCourse(courseId) {
  if (typeof courseId !== "string" || !courseId.trim()) {
    throw new Error("A valid course ID is required.");
  }

  return enrollmentRequest("/enrollments", {
    method: "POST",
    body: JSON.stringify({
      courseId: courseId.trim(),
    }),
  });
}
