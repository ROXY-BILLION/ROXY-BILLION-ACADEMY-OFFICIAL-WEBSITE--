import { useState } from "react";
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

const initialCourses = [
  {
    id: 1,
    title: "Frontend Website Development",
    category: "Frontend",
    level: "Beginner",
    lessons: 24,
    students: 328,
    price: "Free",
    status: "Published",
    color: "blue",
    initials: "FE",
  },
  {
    id: 2,
    title: "Backend Website Development",
    category: "Backend",
    level: "Intermediate",
    lessons: 32,
    students: 214,
    price: "₦25,000",
    status: "Published",
    color: "purple",
    initials: "BE",
  },
  {
    id: 3,
    title: "Software Engineering",
    category: "Software Engineering",
    level: "Advanced",
    lessons: 48,
    students: 187,
    price: "₦45,000",
    status: "Published",
    color: "gold",
    initials: "SE",
  },
  {
    id: 4,
    title: "HTML and CSS Fundamentals",
    category: "Frontend",
    level: "Beginner",
    lessons: 16,
    students: 156,
    price: "Free",
    status: "Draft",
    color: "green",
    initials: "HC",
  },
  {
    id: 5,
    title: "JavaScript Programming",
    category: "Frontend",
    level: "Intermediate",
    lessons: 28,
    students: 243,
    price: "₦18,000",
    status: "Published",
    color: "orange",
    initials: "JS",
  },
  {
    id: 6,
    title: "Full-Stack MERN Development",
    category: "Software Engineering",
    level: "Advanced",
    lessons: 56,
    students: 92,
    price: "₦55,000",
    status: "Draft",
    color: "cyan",
    initials: "ME",
  },
];

function AdminCourses() {
  const [courses, setCourses] = useState(initialCourses);
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
    price: "Free",
  });

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

  function handleCreateCourse(event) {
    event.preventDefault();

    if (!formData.title.trim()) return;

    const newCourse = {
      id: Date.now(),
      title: formData.title.trim(),
      category: formData.category,
      level: formData.level,
      lessons: 0,
      students: 0,
      price: formData.price,
      status: "Draft",
      color: "blue",
      initials: formData.title
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase(),
    };

    setCourses((currentCourses) => [newCourse, ...currentCourses]);
    setSearch("");
    setStatusFilter("All");
    setCategoryFilter("All");
    setFormData({
      title: "",
      category: "Frontend",
      level: "Beginner",
      price: "Free",
    });
    setShowCreateForm(false);
  }

  function toggleCourseStatus(courseId) {
    setCourses((currentCourses) =>
      currentCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              status:
                course.status === "Published" ? "Draft" : "Published",
            }
          : course
      )
    );

    setActiveMenu(null);
  }

  function deleteCourse(courseId) {
    const confirmed = window.confirm(
      "Delete this course from the demo list?"
    );

    if (!confirmed) return;

    setCourses((currentCourses) =>
      currentCourses.filter((course) => course.id !== courseId)
    );

    setActiveMenu(null);
    setSelectedCourse(null);
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
          onClick={() => setShowCreateForm(true)}
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
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
        </div>

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
                          onClick={() => toggleCourseStatus(course.id)}
                        >
                          <Pencil size={15} />
                          {course.status === "Published"
                            ? "Move to draft"
                            : "Publish course"}
                        </button>

                        <button
                          type="button"
                          className="delete"
                          onClick={() => deleteCourse(course.id)}
                        >
                          <Trash2 size={15} />
                          Delete course
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
                <p>Add a new course to the demo list.</p>
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
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>Software Engineering</option>
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

              <label htmlFor="admin-course-price">Course price</label>
              <select
                id="admin-course-price"
                value={formData.price}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    price: event.target.value,
                  })
                }
              >
                <option>Free</option>
                <option>₦18,000</option>
                <option>₦25,000</option>
                <option>₦45,000</option>
                <option>₦55,000</option>
              </select>

              <p className="admin-courses-form-note">
                New courses are saved as drafts in this UI demo only.
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
                >
                  <Plus size={17} />
                  Create Course
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