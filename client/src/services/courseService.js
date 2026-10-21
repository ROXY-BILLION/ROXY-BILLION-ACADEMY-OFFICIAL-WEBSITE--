const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function getData(endpoint) {
  const response = await fetch(`${API_URL}${endpoint}`);
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Failed to load ${endpoint}.`);
  }

  return data;
}

export async function getCourses() {
  const data = await getData("/courses");

  if (Array.isArray(data)) {
    return data;
  }

  return data.courses || data.data || [];
}

export async function getCategories() {
  const data = await getData("/categories");

  if (Array.isArray(data)) {
    return data;
  }

  return data.categories || data.data || [];
}
