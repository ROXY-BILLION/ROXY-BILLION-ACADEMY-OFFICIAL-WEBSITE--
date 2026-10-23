import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  PlayCircle,
  Target,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { getMyEnrollments } from "../../services/enrollmentService";
import StudentNavigation from "./StudentNavigation";
import "./StudentDashboard.css";

function EnrolledCourses() {
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

  const enrolledCourses = enrollments.filter(
    (enrollment) => enrollment.course
  );

  if (!hasLoaded && !loadingCourses && !error) {
    return (
      <div>
        <p>Load your enrolled courses to view your learning space.</p>
        <button type="button" onClick={loadEnrollments}>
          Load My Courses
        </button>
      </div>
    );
  }

  return (
    <>
      {loadingCourses && <p>Loading your enrolled courses...</p>}

      {error && (
        <div role="alert">
          <p>{error}</p>
          <button
            type="button"
            onClick={loadEnrollments}
            disabled={loadingCourses}
          >
            Try again
          </button>
        </div>
      )}

      {!loadingCourses && !error && enrolledCourses.length === 0 && (
        <div className="student-dashboard-empty">
          <BookOpen size={32} />
          <h3>No enrolled courses yet</h3>
          <p>
            Browse the course catalogue and enrol in an available
            course to see it here.
          </p>
          <Link
            to="/courses"
            className="student-dashboard-explore"
          >
            Browse Courses
            <ArrowRight size={18} />
          </Link>
        </div>
      )}

      {!loadingCourses && !error && enrolledCourses.length > 0 && (
        <div className="student-dashboard-course-list">
          {enrolledCourses.map((enrollment, index) => {
            const course = enrollment.course;
            const colors = ["blue", "gold", "purple"];

            return (
              <article
                className="student-dashboard-course"
                key={enrollment._id}
              >
                <div
                  className={`student-dashboard-course-icon ${
                    colors[index % colors.length]
                  }`}
                >
                  <BookOpen size={24} />
                </div>

                <div className="student-dashboard-course-info">
                  <p className="student-dashboard-course-category">
                    {course.category || "Course"}
                  </p>

                  <h3>{course.title}</h3>

                  <p className="student-dashboard-course-lessons">
                    Enrolled course · Progress tracking not available yet
                  </p>
                </div>

                <Link
                  to={
                    course.slug
                      ? `/courses/${course.slug}`
                      : "/courses"
                  }
                  className="student-dashboard-continue"
                  aria-label={`Open ${course.title}`}
                >
                  <PlayCircle size={21} />
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </>
  );
}

function StudentDashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="student-dashboard page-container">
        <p>Loading your student dashboard...</p>
      </main>
    );
  }

  return (
    <main className="student-dashboard page-container">
      <StudentNavigation />

      <section className="student-dashboard-header">
        <div>
          <p className="home-section-eyebrow">STUDENT DASHBOARD</p>

          <h1>
            Welcome back, {user?.name || user?.fullName || "Student"}!
          </h1>

          <p>
            Continue learning, track your progress, and work toward
            your goals.
          </p>

          {user?.plan && (
            <p>
              Your plan:{" "}
              <strong>
                {user.plan === "premium-plus"
                  ? "Premium+"
                  : user.plan.charAt(0).toUpperCase() +
                    user.plan.slice(1)}
              </strong>
            </p>
          )}
        </div>

        <Link to="/courses" className="student-dashboard-explore">
          Explore Courses
          <ArrowRight size={18} />
        </Link>
      </section>

      <section
        className="student-dashboard-stats"
        aria-label="Learning statistics"
      >
        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <p>My Courses</p>
            <h2>—</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <GraduationCap size={22} />
          </div>
          <div>
            <p>Lessons Completed</p>
            <h2>—</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <Target size={22} />
          </div>
          <div>
            <p>Learning Progress</p>
            <h2>—</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <Clock3 size={22} />
          </div>
          <div>
            <p>Lessons Remaining</p>
            <h2>—</h2>
          </div>
        </article>
      </section>

      <section className="student-dashboard-content">
        <div className="student-dashboard-main">
          <div className="student-dashboard-section-heading">
            <div>
              <p className="home-section-eyebrow">YOUR LEARNING</p>
              <h2>Continue Learning</h2>
            </div>

            <Link to="/my-courses" className="home-text-link">
              View all courses
              <ArrowRight size={16} />
            </Link>
          </div>

          {user ? (
            <EnrolledCourses />
          ) : (
            <p>Please sign in to view your enrolled courses.</p>
          )}
        </div>

        <aside className="student-dashboard-sidebar">
          <section className="student-dashboard-plan">
            <div className="student-dashboard-plan-icon">
              <Target size={24} />
            </div>

            <p className="home-section-eyebrow">
              YOUR LEARNING PLAN
            </p>

            <h2>Keep making progress</h2>

            <p>
              Explore available courses and build a consistent learning
              habit at your own pace.
            </p>

            <Link to="/courses" className="student-dashboard-plan-link">
              Find a course
              <ArrowRight size={17} />
            </Link>
          </section>
        </aside>
      </section>
    </main>
  );
}

export default StudentDashboard;
