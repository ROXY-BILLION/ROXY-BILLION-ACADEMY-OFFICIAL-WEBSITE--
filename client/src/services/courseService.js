
const API_URL = import.meta.env.VITE_API_URL;

export const getCourses = async () => {
    const response = await fetch(`${API_URL}/courses`);

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to load courses.");
    }

    return data.courses;
};

export const createCourse = async (courseData) => {
    const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create course.");
    }

    return data.course;
};
