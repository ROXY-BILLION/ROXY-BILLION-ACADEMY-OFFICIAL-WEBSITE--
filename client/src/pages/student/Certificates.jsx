import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  Clock3,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import { getMyEnrollments } from "../../services/enrollmentService";
import "./Certificates.css";

function Certificates() {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [error, setError] = useState("");

  const loadEnrollments = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getMyEnrollments();
      setEnrollments(data.filter((item) => item.course));
      setHasLoaded(true);
    } catch (requestError) {
      setError(
        requestError.message || "Unable to load your enrolled courses."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <main className="certificates-page page-container">
      <StudentNavigation />

      <header className="certificates-header">
        <div>
          <p className="home-section-eyebrow">YOUR ACHIEVEMENTS</p>
          <h1>My Certificates</h1>
          <p>
            View your learning achievements and access official
            certificates issued by Roxy Billion Academy.
          </p>
        </div>

        <div className="certificates-header-icon">
          <Award size={34} />
        </div>
      </header>

      <section className="certificates-stats">
        <article className="certificates-stat-card">
          <div className="certificates-stat-icon">
            <Award size={22} />
          </div>
          <div>
            <span>Certificates Earned</span>
            <strong>—</strong>
          </div>
        </article>

        <article className="certificates-stat-card">
          <div className="certificates-stat-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <span>Courses Enrolled</span>
            <strong>
              {!hasLoaded || error ? "—" : enrollments.length}
            </strong>
          </div>
        </article>

        <article className="certificates-stat-card">
          <div className="certificates-stat-icon">
            <Clock3 size={22} />
          </div>
          <div>
            <span>Courses In Progress</span>
            <strong>—</strong>
          </div>
        </article>
      </section>

      <section className="certificates-section">
        <div className="certificates-section-heading">
          <div>
            <h2>Your achievements</h2>
            <p>
              Official certificates will appear here when verified
              certificate records are available.
            </p>
          </div>
          <ShieldCheck size={24} />
        </div>

        <div className="certificates-empty">
          <div className="certificates-empty-icon">
            <LockKeyhole size={30} />
          </div>

          <h3>Official certificates are not available yet</h3>
          <p>
            Certificate records, verified course completion, and
            certificate issuance have not been connected to this page.
            No certificate is being presented as earned.
          </p>

          <Link
            to="/my-courses"
            className="certificate-primary-button"
          >
            View My Courses
            <BookOpen size={17} />
          </Link>
        </div>
      </section>

      <section className="certificates-section">
        <div className="certificates-section-heading">
          <div>
            <h2>My enrolled courses</h2>
            <p>
              These courses come from your academy enrolment records.
              Lesson completion percentages are not available yet.
            </p>
          </div>
          <BookOpen size={24} />
        </div>

        {!hasLoaded && !loading && !error && (
          <div className="certificates-empty">
            <h3>Load your enrolled courses</h3>
            <p>
              Retrieve your current enrolment records from the academy.
            </p>
            <button
              type="button"
              className="certificate-primary-button"
              onClick={loadEnrollments}
            >
              Load My Courses
              <BookOpen size={17} />
            </button>
          </div>
        )}

        {loading && (
          <div className="certificates-empty">
            <p>Loading your enrolled courses...</p>
          </div>
        )}

        {error && !loading && (
          <div className="certificates-empty">
            <h3>Unable to load your courses</h3>
            <p>{error}</p>
            <button
              type="button"
              className="certificate-primary-button"
              onClick={loadEnrollments}
            >
              Try Again
            </button>
          </div>
        )}

        {hasLoaded && !loading && !error && enrollments.length === 0 && (
          <div className="certificates-empty">
            <div className="certificates-empty-icon">
              <BookOpen size={30} />
            </div>
            <h3>You have no enrolled courses yet</h3>
            <p>
              Explore the course catalogue and enrol in a course to
              begin your learning journey.
            </p>
            <Link
              to="/courses"
              className="certificate-primary-button"
            >
              Explore Courses
              <BookOpen size={17} />
            </Link>
          </div>
        )}

        {hasLoaded && !loading && !error && enrollments.length > 0 && (
          <div className="certificate-progress-list">
            {enrollments.map((enrollment) => {
              const course = enrollment.course;

              return (
                <article
                  className="certificate-progress-card"
                  key={enrollment._id || course._id}
                >
                  <div className="certificate-progress-course-icon">
                    <BookOpen size={21} />
                  </div>

                  <div className="certificate-progress-details">
                    <h3>{course.title}</h3>
                    <p>{course.category || "Course"}</p>
                    <p>
                      Lesson progress tracking is not available yet.
                    </p>
                  </div>

                  <div className="certificate-progress-action">
                    <strong>Enrolled</strong>
                    <Link
                      to={
                        course.slug
                          ? `/courses/${course.slug}`
                          : "/my-courses"
                      }
                    >
                      View Course
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default Certificates;