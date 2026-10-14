import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  Search,
  PlayCircle,
  GraduationCap,
} from "lucide-react";
import "./MyCourses.css";

const enrolledCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Technology",
    description:
      "Learn HTML, CSS, JavaScript, and the fundamentals of building websites.",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    duration: "8 weeks",
    level: "Beginner",
    status: "In Progress",
    color: "blue",
    slug: "web-development-fundamentals",
  },
  {
    id: 2,
    title: "Introduction to Business",
    category: "Business",
    description:
      "Explore business fundamentals, planning, management, and entrepreneurship.",
    progress: 30,
    completedLessons: 6,
    totalLessons: 20,
    duration: "6 weeks",
    level: "Beginner",
    status: "In Progress",
    color: "gold",
    slug: "introduction-to-business",
  },
  {
    id: 3,
    title: "Creative Design Essentials",
    category: "Creative Arts & Design",
    description:
      "Understand design principles, visual communication, and creative thinking.",
    progress: 10,
    completedLessons: 2,
    totalLessons: 20,
    duration: "5 weeks",
    level: "Beginner",
    status: "In Progress",
    color: "purple",
    slug: "creative-design-essentials",
  },
];

function MyCourses() {
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [searchTerm, setSearchTerm] = useState("");

  const filters = [
    "All Courses",
    "In Progress",
    "Completed",
    "Not Started",
  ];

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesFilter =
      activeFilter === "All Courses" ||
      course.status === activeFilter;

    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <main className="my-courses-page">
      <section className="my-courses-header">
        <div>
          <span className="my-courses-eyebrow">YOUR LEARNING SPACE</span>
          <h1>My Courses</h1>
          <p>
            Keep learning, track your progress, and work toward your goals.
          </p>
        </div>

        <Link to="/courses" className="browse-courses-button">
          <BookOpen size={18} />
          Browse Courses
        </Link>
      </section>

      <section className="my-courses-summary">
        <article className="course-summary-card">
          <div className="summary-icon">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Enrolled Courses</span>
            <strong>{enrolledCourses.length}</strong>
          </div>
        </article>

        <article className="course-summary-card">
          <div className="summary-icon">
            <PlayCircle size={21} />
          </div>
          <div>
            <span>In Progress</span>
            <strong>
              {enrolledCourses.filter(
                (course) => course.status === "In Progress"
              ).length}
            </strong>
          </div>
        </article>

        <article className="course-summary-card">
          <div className="summary-icon">
            <GraduationCap size={21} />
          </div>
          <div>
            <span>Completed</span>
            <strong>
              {enrolledCourses.filter(
                (course) => course.status === "Completed"
              ).length}
            </strong>
          </div>
        </article>
      </section>

      <section className="my-courses-content">
        <div className="my-courses-toolbar">
          <div className="course-filter-tabs">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter ? "active" : ""
                }
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="course-search">
            <Search size={18} />
            <input
              type="search"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="my-courses-grid">
            {filteredCourses.map((course) => (
              <article className="enrolled-course-card" key={course.id}>
                <div
                  className={`enrolled-course-banner ${course.color}`}
                >
                  <span>{course.category}</span>
                  <BookOpen size={38} />
                </div>

                <div className="enrolled-course-body">
                  <div className="enrolled-course-meta">
                    <span>{course.level}</span>
                    <span className="course-status">
                      {course.status}
                    </span>
                  </div>

                  <h2>{course.title}</h2>
                  <p className="enrolled-course-description">
                    {course.description}
                  </p>

                  <div className="course-progress-heading">
                    <span>Course progress</span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div
                    className="course-progress-track"
                    role="progressbar"
                    aria-label={`${course.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={course.progress}
                  >
                    <span
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <div className="enrolled-course-details">
                    <span>
                      <BookOpen size={15} />
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                    <span>
                      <Clock3 size={15} />
                      {course.duration}
                    </span>
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="continue-course-button"
                  >
                    <PlayCircle size={18} />
                    Continue Learning
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="my-courses-empty">
            <BookOpen size={42} />
            <h2>No courses found</h2>
            <p>
              Try another search or choose a different course filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter("All Courses");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default MyCourses;
