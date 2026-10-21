import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  BookOpen,
  MoreHorizontal,
  Eye,
  Pencil,
  Trash2,
  Users,
  ChevronDown,
  X,
} from "lucide-react";
import "./AdminCourses.css";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

const colorOptions = ["blue", "purple", "gold", "green", "orange", "cyan"];

function formatCourse(course) {
  const title = course.title || "Untitled course";
  const plan = course.plan || "Free";
  const numericPrice = Number(course.price || 0);

  let price = "Free";
  if (plan !== "Free" || numericPrice > 0) {
    price =
      numericPrice > 0
        ? `₦${numericPrice.toLocaleString()}`
        : plan;
  }

  const status = String(course.status || "draft");
  const normalizedStatus =
    status.toLowerCase() === "published"
      ? "Published"
      : status.toLowerCase() === "archived"
        ? "Archived"
        : "Draft";

  const initials = title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] || "")
    .join("")
    .toUpperCase();

  return {
    ...course,
    id: course._id || course.id,
    title,
    category: course.category || "Uncategorized",
    level: course.level || "Beginner",
    lessons: Array.isArray(course.lessons)
      ? course.lessons.length
      : Number(course.lessonCount || 0),
    students: Number(course.students || course.enrollmentCount || 0),
    price,
    priceAmount: Number(course.price || 0),
    status: normalizedStatus,
    color: colorOptions[
      Math.abs(title.split("").reduce((total, character) => total + character.charCodeAt(0), 0)) %
        colorOptions.length
    ],
    initials,
  };
}

async function fetchAdminCourses(signal) {
  const response = await fetch(`${API_URL}/courses`, { signal });
  const data = await response.json().catch(() => ({}));

  if (!response.ok || data.success === false) {
    throw new Error(data.message || `Could not load courses (${response.status}).`);
  }

  const courses = Array.isArray(data)
    ? data
    : Array.isArray(data.courses)
      ? data.courses
      : Array.isArray(data.data)
        ? data.data
        : Array.isArray(data.data?.courses)
          ? data.data.courses
          : null;

  if (!courses) {
    throw new Error("The courses API returned an unexpected response.");
  }

  return courses.map(formatCourse);
}

function AdminCourses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "Frontend",
    level: "Beginner",
    plan: "Free",
    price: "0",
    shortDescription: "",
    description: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [createError, setCreateError] = useState("");
  const [actionError, setActionError] = useState("");
  const [updatingCourseId, setUpdatingCourseId] = useState(null);
  const [deletingCourseId, setDeletingCourseId] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCourses() {
      setIsLoading(true);
      setLoadError("");

      try {
        const backendCourses = await fetchAdminCourses(controller.signal);
        setCourses(backendCourses);
      } catch (error) {
        if (error.name === "AbortError") return;

        setLoadError(
          error.message ||
            "Unable to load courses. Check that the backend is running."
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadCourses();

    return () => {
      controller.abort();
    };
  }, [reloadKey]);

  function retryLoadCourses() {
    setReloadKey((currentKey) => currentKey + 1);
  }

  const categories = [
    "All",
    ...new Set(courses.map((course) => course.category)),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.category.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || course.status === statusFilter;

    const matchesCategory =
      categoryFilter === "All" ||
      course.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  async function handleCreateCourse(event) {
    event.preventDefault();

    if (isCreating || !formData.title.trim()) return;

    setIsCreating(true);
    setCreateError("");

    const payload = {
      title: formData.title.trim(),
      category: formData.category.trim(),
      level: formData.level,
      plan: formData.plan,
      price: Number(formData.price) || 0,
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      status: "draft",
    };

    try {
      const response = await fetch(`${API_URL}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Could not create course (${response.status}).`);
      }

      const createdCourse =
        data.course || data.data?.course || data.data || data;

      if (!createdCourse || !(createdCourse._id || createdCourse.id)) {
        throw new Error("The server did not return the created course. Check the backend response format.");
      }

      setCourses((currentCourses) => [formatCourse(createdCourse), ...currentCourses]);
      setSearch("");
      setStatusFilter("All");
      setCategoryFilter("All");
      setFormData({
        title: "",
        category: "Frontend",
        level: "Beginner",
        plan: "Free",
        price: "0",
        shortDescription: "",
        description: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      setCreateError(error.message || "Unable to create course. Check the backend and try again.");
    } finally {
      setIsCreating(false);
    }
  }

  async function toggleCourseStatus(course) {
    if (updatingCourseId || deletingCourseId) return;

    const nextStatus = course.status === "Published" ? "draft" : "published";
    setActionError("");
    setUpdatingCourseId(course.id);
    setActiveMenu(null);

    const payload = {
      title: course.title,
      slug: course.slug,
      shortDescription: course.shortDescription || "",
      description: course.description || course.shortDescription || course.title,
      category: course.category,
      level: course.level,
      plan: course.plan || "Free",
      price: Number(course.priceAmount) || 0,
      thumbnail: course.thumbnail || "",
      duration: course.duration || "",
      whatYouWillLearn: Array.isArray(course.whatYouWillLearn) ? course.whatYouWillLearn : [],
      requirements: Array.isArray(course.requirements) ? course.requirements : [],
      status: nextStatus,
    };

    try {
      const response = await fetch(`${API_URL}/courses/${encodeURIComponent(course.id)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Could not update course (${response.status}).`);
      }

      const returnedCourse = data.course || data.data?.course || data.data;
      setCourses((currentCourses) => currentCourses.map((item) => {
        if (item.id !== course.id) return item;
        return formatCourse({ ...item, ...(returnedCourse && typeof returnedCourse === "object" ? returnedCourse : {}), status: returnedCourse?.status || nextStatus });
      }));

      setSelectedCourse((current) => current?.id === course.id
        ? { ...current, status: nextStatus === "published" ? "Published" : "Draft" }
        : current);
    } catch (error) {
      setActionError(error.message || "Unable to update this course. Please try again.");
    } finally {
      setUpdatingCourseId(null);
    }
  }

  async function deleteCourse(course) {
    if (updatingCourseId || deletingCourseId) return;

    const confirmed = window.confirm(
      `Permanently delete “${course.title}” from the academy database? This cannot be undone.`
    );

    if (!confirmed) return;

    setActionError("");
    setDeletingCourseId(course.id);
    setActiveMenu(null);

    try {
      const response = await fetch(`${API_URL}/courses/${encodeURIComponent(course.id)}`, {
        method: "DELETE",
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(data.message || `Could not delete course (${response.status}).`);
      }

      setCourses((currentCourses) => currentCourses.filter((item) => item.id !== course.id));
      setSelectedCourse((current) => current?.id === course.id ? null : current);
    } catch (error) {
      setActionError(error.message || "Unable to delete this course. Please try again.");
    } finally {
      setDeletingCourseId(null);
    }
  }

  return (
    <div className="admin-courses">
      <section className="admin-courses-heading">
        <div>
          <p className="admin-courses-eyebrow">ACADEMY MANAGEMENT</p>
          <h1>Courses</h1>
          <p className="admin-courses-subtitle">
            Create, organize, and manage your academy courses.
          </p>
        </div>

        <button
          type="button"
          className="admin-courses-primary-button"
          onClick={() => {
            setCreateError("");
            setFormData((current) => ({
              ...current,
              category: categories.find((category) => category !== "All") || "Frontend",
            }));
            setShowCreateForm(true);
          }}
        >
          <Plus size={18} />
          Create Course
        </button>
      </section>

      <section className="admin-courses-summary">
        <article className="admin-courses-summary-card">
          <span className="admin-courses-summary-icon blue">
            <BookOpen size={20} />
          </span>
          <div>
            <p>Total Courses</p>
            <h2>{courses.length}</h2>
          </div>
        </article>

        <article className="admin-courses-summary-card">
          <span className="admin-courses-summary-icon green">
            <Eye size={20} />
          </span>
          <div>
            <p>Published</p>
            <h2>
              {courses.filter((course) => course.status === "Published").length}
            </h2>
          </div>
        </article>

        <article className="admin-courses-summary-card">
          <span className="admin-courses-summary-icon gold">
            <Pencil size={20} />
          </span>
          <div>
            <p>Drafts</p>
            <h2>
              {courses.filter((course) => course.status === "Draft").length}
            </h2>
          </div>
        </article>

        <article className="admin-courses-summary-card">
          <span className="admin-courses-summary-icon purple">
            <Users size={20} />
          </span>
          <div>
            <p>Total Enrollments</p>
            <h2>
              {courses
                .reduce((total, course) => total + course.students, 0)
                .toLocaleString()}
            </h2>
          </div>
        </article>
      </section>

      <section className="admin-courses-content">
        {actionError && (
          <div className="admin-courses-empty" role="alert">
            <p>{actionError}</p>
            <button type="button" onClick={() => setActionError("")}>Dismiss</button>
          </div>
        )}
        <div className="admin-courses-toolbar">
          <div className="admin-courses-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search courses"
            />
          </div>

          <div className="admin-courses-filters">
            <label className="admin-courses-select-wrap">
              <span className="admin-courses-sr-only">
                Filter by category
              </span>
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "All" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>

            <label className="admin-courses-select-wrap">
              <span className="admin-courses-sr-only">
                Filter by status
              </span>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
        </div>

        {isLoading && (
          <div className="admin-courses-empty" role="status">
            <BookOpen size={35} />
            <h2>Loading courses...</h2>
            <p>Fetching course records from the academy database.</p>
          </div>
        )}

        {!isLoading && loadError && (
          <div className="admin-courses-empty" role="alert">
            <BookOpen size={35} />
            <h2>Could not load courses</h2>
            <p>{loadError}</p>
            <button type="button" onClick={retryLoadCourses}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && !loadError && (
          <>
            <div className="admin-courses-results">
              Showing <strong>{filteredCourses.length}</strong> of{" "}
              <strong>{courses.length}</strong> courses
            </div>

            {filteredCourses.length > 0 ? (
          <div className="admin-courses-grid">
            {filteredCourses.map((course) => (
              <article className="admin-course-card" key={course.id}>
                <div
                  className={`admin-course-card-cover ${course.color}`}
                >
                  <span className="admin-course-card-initials">
                    {course.initials}
                  </span>

                  <span
                    className={`admin-course-status ${
                      course.status === "Published"
                        ? "published"
                        : "draft"
                    }`}
                  >
                    {course.status}
                  </span>

                  <div className="admin-course-card-menu-wrap">
                    <button
                      type="button"
                      className="admin-course-menu-button"
                      aria-label={`Options for ${course.title}`}
                      aria-expanded={activeMenu === course.id}
                      onClick={() =>
                        setActiveMenu(
                          activeMenu === course.id ? null : course.id
                        )
                      }
                    >
                      <MoreHorizontal size={20} />
                    </button>

                    {activeMenu === course.id && (
                      <div className="admin-course-dropdown">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCourse(course);
                            setActiveMenu(null);
                          }}
                        >
                          <Eye size={15} />
                          View details
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleCourseStatus(course)}
                          disabled={updatingCourseId === course.id || deletingCourseId === course.id}
                        >
                          <Pencil size={15} />
                          {updatingCourseId === course.id
                            ? "Saving..."
                            : course.status === "Published"
                              ? "Move to draft"
                              : "Publish course"}
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => deleteCourse(course)}
                          disabled={updatingCourseId === course.id || deletingCourseId === course.id}
                        >
                          <Trash2 size={15} />
                          {deletingCourseId === course.id ? "Deleting..." : "Delete course"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="admin-course-card-body">
                  <div className="admin-course-card-meta">
                    <span>{course.category}</span>
                    <span>{course.level}</span>
                  </div>

                  <h2>{course.title}</h2>

                  <div className="admin-course-card-details">
                    <span>
                      <BookOpen size={15} />
                      {course.lessons} lessons
                    </span>
                    <span>
                      <Users size={15} />
                      {course.students} students
                    </span>
                  </div>

                  <div className="admin-course-card-footer">
                    <strong>{course.price}</strong>

                    <button
                      type="button"
                      className="admin-course-view-button"
                      onClick={() => setSelectedCourse(course)}
                    >
                      View <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="admin-courses-empty">
            <BookOpen size={35} />
            <h2>No courses found</h2>
            <p>Try another search or adjust your filters.</p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setCategoryFilter("All");
              }}
            >
              Clear filters
            </button>
          </div>
            )}
          </>
        )}
      </section>

      {showCreateForm && (
        <div
          className="admin-courses-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCreateForm(false);
            }
          }}
        >
          <section
            className="admin-courses-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-create-course-title"
          >
            <div className="admin-courses-modal-heading">
              <div>
                <p className="admin-courses-eyebrow">COURSE MANAGEMENT</p>
                <h2 id="admin-create-course-title">Create a course</h2>
                <p>Create a course record in the academy database.</p>
              </div>

              <button
                type="button"
                className="admin-courses-close-button"
                aria-label="Close form"
                onClick={() => setShowCreateForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form
              className="admin-courses-form"
              onSubmit={handleCreateCourse}
            >
              <label htmlFor="admin-course-title">Course title</label>
              <input
                id="admin-course-title"
                type="text"
                placeholder="e.g. React Development"
                value={formData.title}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    title: event.target.value,
                  })
                }
                required
              />

              <div className="admin-courses-form-row">
                <div>
                  <label htmlFor="admin-course-category">Category</label>
                  <select
                    id="admin-course-category"
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      })
                    }
                  >
                    {categories.filter((category) => category !== "All").map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                    {!categories.some((category) => category !== "All") && <option value="Frontend">Frontend</option>}
                  </select>
                </div>

                <div>
                  <label htmlFor="admin-course-level">Level</label>
                  <select
                    id="admin-course-level"
                    value={formData.level}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        level: event.target.value,
                      })
                    }
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <label htmlFor="admin-course-plan">Course plan</label>
              <select
                id="admin-course-plan"
                value={formData.plan}
                onChange={(event) => {
                  const plan = event.target.value;
                  setFormData({
                    ...formData,
                    plan,
                    price: plan === "Free" ? "0" : formData.price === "0" ? "18000" : formData.price,
                  });
                }}
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
                <option value="Premium+">Premium+</option>
              </select>

              <label htmlFor="admin-course-price">Price (₦)</label>
              <input
                id="admin-course-price"
                type="number"
                min="0"
                step="1"
                value={formData.price}
                disabled={formData.plan === "Free"}
                onChange={(event) => setFormData({ ...formData, price: event.target.value })}
                required
              />

              <label htmlFor="admin-course-short-description">Short description</label>
              <input
                id="admin-course-short-description"
                type="text"
                placeholder="A short summary of this course"
                value={formData.shortDescription}
                onChange={(event) => setFormData({ ...formData, shortDescription: event.target.value })}
                required
              />

              <label htmlFor="admin-course-description">Course description</label>
              <textarea
                id="admin-course-description"
                rows="4"
                placeholder="What will students learn in this course?"
                value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                required
              />

              {createError && <p className="admin-courses-form-note" role="alert">{createError}</p>}

              <p className="admin-courses-form-note">
                New courses are saved to the database as drafts.
              </p>

              <div className="admin-courses-form-actions">
                <button
                  type="button"
                  className="admin-courses-cancel-button"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-courses-primary-button"
                  disabled={isCreating}
                >
                  <Plus size={17} />
                  {isCreating ? "Creating..." : "Create Course"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedCourse && (
        <div
          className="admin-courses-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCourse(null);
            }
          }}
        >
          <section
            className="admin-courses-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-course-details-title"
          >
            <div className="admin-courses-modal-heading">
              <div>
                <p className="admin-courses-eyebrow">COURSE DETAILS</p>
                <h2 id="admin-course-details-title">
                  {selectedCourse.title}
                </h2>
                <p>Preview of the selected course information.</p>
              </div>

              <button
                type="button"
                className="admin-courses-close-button"
                aria-label="Close details"
                onClick={() => setSelectedCourse(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-course-details-list">
              <div>
                <span>Category</span>
                <strong>{selectedCourse.category}</strong>
              </div>
              <div>
                <span>Difficulty</span>
                <strong>{selectedCourse.level}</strong>
              </div>
              <div>
                <span>Lessons</span>
                <strong>{selectedCourse.lessons}</strong>
              </div>
              <div>
                <span>Enrolled students</span>
                <strong>{selectedCourse.students}</strong>
              </div>
              <div>
                <span>Price</span>
                <strong>{selectedCourse.price}</strong>
              </div>
              <div>
                <span>Status</span>
                <strong>{selectedCourse.status}</strong>
              </div>
            </div>

            <button
              type="button"
              className="admin-courses-primary-button admin-course-details-close"
              onClick={() => setSelectedCourse(null)}
            >
              Close details
            </button>
          </section>
        </div>
      )}
    </div>
  );
}

function ArrowRightIcon() {
  return <span aria-hidden="true">→</span>;
}

export default AdminCourses;