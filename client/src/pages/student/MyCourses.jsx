
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock3,
  GraduationCap,
  PlayCircle,
  Search,
} from "lucide-react";

import { getMyEnrollments } from "../../services/enrollmentService";
import StudentNavigation from "./StudentNavigation";
import "./MyCourses.css";

const courseFilters = [
  "All Courses",
  "In Progress",
  "Completed",
  "Not Started",
];

function MyCourses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Courses");
  const [enrollments, setEnrollments] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadEnrollments = useCallback(async () => {
    setLoadingCourses(true);
    setError("");

    try {
      const data = await getMyEnrollments();
      setEnrollments(data);
      setHasLoaded(true);
    } catch (requestError) {
      setError(
        requestError.message || "Unable to load your enrolled courses."
      );
    } finally {
      setLoadingCourses(false);
    }
  }, []);

  const myCourses = enrollments.filter(
    (enrollment) => enrollment.course
  );

  const filteredCourses = myCourses.filter((enrollment) => {
    const course = enrollment.course;
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      (course.title || "").toLowerCase().includes(search) ||
      (course.category || "").toLowerCase().includes(search) ||
      (course.shortDescription || "").toLowerCase().includes(search);

    return matchesSearch && activeFilter === "All Courses";
  });

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
            <h2>{hasLoaded ? myCourses.length : "—"}</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <PlayCircle size={22} />
          <div>
            <p>In Progress</p>
            <h2>—</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <GraduationCap size={22} />
          <div>
            <p>Completed</p>
            <h2>—</h2>
          </div>
        </article>

        <article className="my-courses-stat">
          <Clock3 size={22} />
          <div>
            <p>Lessons Completed</p>
            <h2>—</h2>
          </div>
        </article>
      </section>

      <section className="my-courses-library">
        <div className="my-courses-toolbar">
          <div>
            <h2>Your Course Library</h2>
            <p>
              Find a course and continue your learning journey.
            </p>
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

        <div
          className="my-courses-filters"
          aria-label="Filter courses"
        >
          {courseFilters.map((filter) => {
            const supported = filter === "All Courses";

            return (
              <button
                key={filter}
                type="button"
                className={
                  activeFilter === filter
                    ? "my-courses-filter active"
                    : "my-courses-filter"
                }
                onClick={() => {
                  if (supported) setActiveFilter(filter);
                }}
                disabled={!supported}
                aria-pressed={activeFilter === filter}
                title={
                  supported
                    ? "Show all enrolled courses"
                    : "Available when lesson-progress tracking is implemented"
                }
              >
                {filter}
              </button>
            );
          })}
        </div>

        {!hasLoaded && !loadingCourses && !error && (
          <div className="my-courses-empty">
            <BookOpen size={32} />
            <h3>Load your course library</h3>
            <p>
              Retrieve the courses you have enrolled in using your
              student account.
            </p>
            <button type="button" onClick={loadEnrollments}>
              Load My Courses
            </button>
          </div>
        )}

        {loadingCourses && (
          <p role="status">Loading your enrolled courses...</p>
        )}

        {error && (
          <div className="my-courses-empty" role="alert">
            <h3>Unable to load courses</h3>
            <p>{error}</p>
            <button
              type="button"
              onClick={loadEnrollments}
              disabled={loadingCourses}
            >
              Try Again
            </button>
          </div>
        )}

        {hasLoaded && !loadingCourses && !error && (
          <>
            {filteredCourses.length > 0 ? (
              <div className="my-courses-grid">
                {filteredCourses.map((enrollment, index) => {
                  const course = enrollment.course;
                  const colors = ["blue", "gold", "purple"];
                  const color = colors[index % colors.length];

                  return (
                    <article
                      className="my-course-card"
                      key={enrollment._id}
                    >
                      <div
                        className={`my-course-card-icon ${color}`}
                      >
                        <BookOpen size={27} />
                      </div>

                      <div className="my-course-card-content">
                        <p className="my-course-category">
                          {course.category || "Course"}
                        </p>

                        <h3>{course.title}</h3>

                        <span className="my-course-status">
                          Enrolled
                        </span>

                        <p className="my-course-lessons">
                          Lesson progress tracking is not available yet.
                        </p>

                        <Link
                          to={
                            course.slug
                              ? `/courses/${course.slug}`
                              : "/courses"
                          }
                          className="my-course-continue"
                        >
                          View Course
                          <PlayCircle size={18} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="my-courses-empty">
                <BookOpen size={32} />
                <h3>
                  {myCourses.length === 0
                    ? "No enrolled courses yet"
                    : "No courses found"}
                </h3>
                <p>
                  {myCourses.length === 0
                    ? "Browse the course catalogue and enrol in an available course to see it here."
                    : "Try a different search term."}
                </p>

                {myCourses.length === 0 ? (
                  <Link
                    to="/courses"
                    className="my-course-continue"
                  >
                    Browse Courses
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                  >
                    Clear Search
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default MyCourses;
