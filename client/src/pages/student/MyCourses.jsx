import { useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  GraduationCap,
  PlayCircle,
  Search,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import "./MyCourses.css";

const myCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Technology",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    slug: "web-development-fundamentals",
    status: "In Progress",
    color: "blue",
  },
  {
    id: 2,
    title: "Introduction to Business",
    category: "Business",
    progress: 30,
    completedLessons: 6,
    totalLessons: 20,
    slug: "introduction-to-business",
    status: "In Progress",
    color: "gold",
  },
  {
    id: 3,
    title: "Creative Design Essentials",
    category: "Creative Arts & Design",
    progress: 10,
    completedLessons: 2,
    totalLessons: 20,
    slug: "creative-design-essentials",
    status: "In Progress",
    color: "purple",
  },
];

const courseFilters = [
  "All Courses",
  "In Progress",
  "Completed",
  "Not Started",
];

function MyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Courses");

  const filteredCourses = myCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      activeFilter === "All Courses" ||
      (activeFilter === "In Progress" &&
        course.progress > 0 &&
        course.progress < 100) ||
      (activeFilter === "Completed" && course.progress === 100) ||
      (activeFilter === "Not Started" && course.progress === 0);

    return matchesSearch && matchesFilter;
  });

  const completedCount = myCourses.filter(
    (course) => course.progress === 100
  ).length;

  const inProgressCount = myCourses.filter(
    (course) => course.progress > 0 && course.progress < 100
  ).length;

  const totalLessons = myCourses.reduce(
    (total, course) => total + course.totalLessons,
    0
  );

  const completedLessons = myCourses.reduce(
    (total, course) => total + course.completedLessons,
    0
  );

  return (
    <main className="my-courses-page page-container">
      <StudentNavigation />

      <header className="my-courses-header">
        <p className="home-section-eyebrow">YOUR LEARNING SPACE</p>
        <h1>My Courses</h1>
        <p>
          Manage your learning and pick up where you left off.
        </p>
      </header>

      <section className="my-courses-stats">
        <article className="my-courses-stat">
          <BookOpen size={22} />
          <div>
            <p>Total Courses</p>
            <h2>{myCourses.length}</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <PlayCircle size={22} />
          <div>
            <p>In Progress</p>
            <h2>{inProgressCount}</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <GraduationCap size={22} />
          <div>
            <p>Completed</p>
            <h2>{completedCount}</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <Clock3 size={22} />
          <div>
            <p>Lessons Completed</p>
            <h2>
              {completedLessons}/{totalLessons}
            </h2>
          </div>
        </article>
      </section>

      <section className="my-courses-library">
        <div className="my-courses-toolbar">
          <div>
            <h2>Your Course Library</h2>
            <p>Find a course and continue your learning journey.</p>
          </div>

          <label className="my-courses-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search your courses..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="Search your courses"
            />
          </label>
        </div>

        <div className="my-courses-filters" aria-label="Filter courses">
          {courseFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={
                activeFilter === filter
                  ? "my-courses-filter active"
                  : "my-courses-filter"
              }
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="my-courses-grid">
            {filteredCourses.map((course) => (
              <article className="my-course-card" key={course.id}>
                <div
                  className={`my-course-card-icon ${course.color}`}
                >
                  <BookOpen size={27} />
                </div>

                <div className="my-course-card-content">
                  <p className="my-course-category">{course.category}</p>
                  <h3>{course.title}</h3>

                  <span className="my-course-status">
                    {course.progress === 100
                      ? "Completed"
                      : course.progress === 0
                        ? "Not Started"
                        : "In Progress"}
                  </span>

                  <div className="my-course-progress-heading">
                    <span>Course progress</span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div className="my-course-progress-track">
                    <div
                      className="my-course-progress-fill"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>

                  <p className="my-course-lessons">
                    {course.completedLessons} of {course.totalLessons}{" "}
                    lessons completed
                  </p>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="my-course-continue"
                  >
                    {course.progress === 100
                      ? "Review Course"
                      : "Continue Learning"}
                    <PlayCircle size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="my-courses-empty">
            <BookOpen size={32} />
            <h3>No courses found</h3>
            <p>
              Try a different search term or select another filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveFilter("All Courses");
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
