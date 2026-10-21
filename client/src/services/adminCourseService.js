const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.body instanceof FormData
        ? {}
        : options.body
          ? { "Content-Type": "application/json" }
          : {}),
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message || `Request failed with status ${response.status}`
    );
  }

  return data;
}

function normalizeList(data, key) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data[key])) return data[key];
  if (Array.isArray(data.data)) return data.data;
  return [];
}

export async function getAdminCourses(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const suffix = query.size ? `?${query.toString()}` : "";
  const data = await request(`/courses${suffix}`);

  return {
    courses: normalizeList(data, "courses"),
    pagination: data.pagination || data.meta || null,
    stats: data.stats || null,
  };
}

export async function createAdminCourse(course) {
  const isFormData = course instanceof FormData;

  return request("/courses", {
    method: "POST",
    body: isFormData ? course : JSON.stringify(course),
  });
}

export async function updateAdminCourse(id, course) {
  const isFormData = course instanceof FormData;

  return request(`/courses/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: isFormData ? course : JSON.stringify(course),
  });
}

export async function deleteAdminCourse(id) {
  return request(`/courses/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function getAdminCategories() {
  const data = await request("/categories");
  return normalizeList(data, "categories");
}

export async function createAdminCategory(category) {
  return request("/categories", {
    method: "POST",
    body:
      category instanceof FormData
        ? category
        : JSON.stringify(category),
  });
}

export async function updateAdminCategory(id, category) {
  return request(`/categories/${encodeURIComponent(id)}`, {
    method: "PUT",
    body:
      category instanceof FormData
        ? category
        : JSON.stringify(category),
  });
}

export async function deleteAdminCategory(id) {
  return request(`/categories/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}
