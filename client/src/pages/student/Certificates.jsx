
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  LockKeyhole,
  Printer,
  ShieldCheck,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import learningCourses from "./learningData";
import "./Certificates.css";

const enrolledCourses = [
  {
    slug: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    category: "Technology",
    progress: 65,
  },
  {
    slug: "introduction-to-business",
    title: "Introduction to Business",
    category: "Business",
    progress: 30,
  },
  {
    slug: "creative-design-essentials",
    title: "Creative Design Essentials",
    category: "Creative Arts & Design",
    progress: 10,
  },
];

function Certificates() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  const courses = useMemo(
    () =>
      enrolledCourses.map((course) => ({
        ...course,
        eligible: course.progress === 100,
      })),
    []
  );

  const eligibleCourses = courses.filter(
    (course) => course.eligible
  );

  const previewCourse = selectedCourse
    ? courses.find((course) => course.slug === selectedCourse)
    : null;

  function handlePrint() {
    window.print();
  }

  function getCertificateId(course) {
    return `RBA-${course.slug
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8)}-PREVIEW`;
  }

  return (
    <main className="certificates-page page-container">
      <StudentNavigation />

      <header className="certificates-header">
        <div>
          <p className="home-section-eyebrow">
            YOUR ACHIEVEMENTS
          </p>
          <h1>My Certificates</h1>
          <p>
            Celebrate your progress and access certificates for
            courses you have successfully completed.
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
            <strong>{eligibleCourses.length}</strong>
          </div>
        </article>

        <article className="certificates-stat-card">
          <div className="certificates-stat-icon">
            <BookOpen size={22} />
          </div>
          <div>
            <span>Courses Enrolled</span>
            <strong>{courses.length}</strong>
          </div>
        </article>

        <article className="certificates-stat-card">
          <div className="certificates-stat-icon">
            <Clock3 size={22} />
          </div>
          <div>
            <span>Courses In Progress</span>
            <strong>
              {courses.filter(
                (course) =>
                  course.progress > 0 && course.progress < 100
              ).length}
            </strong>
          </div>
        </article>
      </section>

      <section className="certificates-section">
        <div className="certificates-section-heading">
          <div>
            <h2>Your achievements</h2>
            <p>
              Certificates become available after completing a course
              and meeting its assessment requirements.
            </p>
          </div>
          <ShieldCheck size={24} />
        </div>

        {eligibleCourses.length > 0 ? (
          <div className="certificates-grid">
            {eligibleCourses.map((course) => (
              <article
                className="certificate-course-card"
                key={course.slug}
              >
                <div className="certificate-course-icon">
                  <Award size={27} />
                </div>

                <span className="certificate-earned-label">
                  <CheckCircle2 size={15} />
                  Completed
                </span>

                <p className="certificate-course-category">
                  {course.category}
                </p>
                <h3>{course.title}</h3>
                <p>
                  Your course certificate is ready to preview.
                </p>

                <button
                  type="button"
                  className="certificate-primary-button"
                  onClick={() => setSelectedCourse(course.slug)}
                >
                  View Certificate
                  <Award size={17} />
                </button>
              </article>
            ))}
          </div>
        ) : (
          <div className="certificates-empty">
            <div className="certificates-empty-icon">
              <LockKeyhole size={30} />
            </div>

            <h3>Your first certificate is waiting</h3>
            <p>
              Keep learning, finish your course lessons, and pass
              the required assessments. Your achievements will
              appear here when completion is recorded.
            </p>

            <Link
              to="/my-courses"
              className="certificate-primary-button"
            >
              Continue Learning
              <BookOpen size={17} />
            </Link>
          </div>
        )}
      </section>

      <section className="certificates-section">
        <div className="certificates-section-heading">
          <div>
            <h2>Course progress</h2>
            <p>
              Track the courses you are working toward completing.
            </p>
          </div>
          <BookOpen size={24} />
        </div>

        <div className="certificate-progress-list">
          {courses.map((course) => {
            const hasWorkspace = learningCourses.some(
              (item) => item.slug === course.slug
            );

            return (
              <article
                className="certificate-progress-card"
                key={course.slug}
              >
                <div className="certificate-progress-course-icon">
                  <BookOpen size={21} />
                </div>

                <div className="certificate-progress-details">
                  <h3>{course.title}</h3>
                  <p>{course.category}</p>

                  <div
                    className="certificate-progress-track"
                    role="progressbar"
                    aria-label={`${course.title} progress`}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={course.progress}
                  >
                    <div
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <div className="certificate-progress-action">
                  <strong>{course.progress}%</strong>
                  {hasWorkspace ? (
                    <Link to={`/learn/${course.slug}`}>
                      Continue
                    </Link>
                  ) : (
                    <Link to={`/courses/${course.slug}`}>
                      View Course
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {previewCourse && (
        <div
          className="certificate-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedCourse(null);
            }
          }}
        >
          <section
            className="certificate-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="certificate-modal-title"
          >
            <div className="certificate-modal-header">
              <div>
                <p className="home-section-eyebrow">
                  CERTIFICATE PREVIEW
                </p>
                <h2 id="certificate-modal-title">
                  {previewCourse.title}
                </h2>
              </div>

              <button
                type="button"
                className="certificate-modal-close"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close certificate preview"
              >
                ×
              </button>
            </div>

            <div className="certificate-print-area">
              <div className="certificate-paper">
                <div className="certificate-inner-border">
                  <div className="certificate-brand">
                    <div className="certificate-brand-mark">
                      RBA
                    </div>
                    <p>ROXY BILLION ACADEMY</p>
                    <span>LEARN · BUILD · ACHIEVE</span>
                  </div>

                  <div className="certificate-decorative-line" />

                  <p className="certificate-kicker">
                    CERTIFICATE OF COMPLETION
                  </p>

                  <h2 className="certificate-main-title">
                    Certificate
                  </h2>

                  <p className="certificate-presented">
                    This certificate preview is prepared for
                  </p>

                  <div className="certificate-student-name">
                    Student Name
                  </div>

                  <p className="certificate-description">
                    upon successful completion of the course
                  </p>

                  <h3 className="certificate-course-name">
                    {previewCourse.title}
                  </h3>

                  <div className="certificate-preview-notice">
                    PREVIEW ONLY — NOT YET EARNED
                  </div>

                  <div className="certificate-bottom">
                    <div>
                      <span className="certificate-signature-line" />
                      <strong>Academy Director</strong>
                      <small>Roxy Billion Academy</small>
                    </div>

                    <div className="certificate-seal">
                      <Award size={29} />
                      <span>ACADEMY</span>
                      <small>LEARNING</small>
                    </div>

                    <div>
                      <span className="certificate-signature-line" />
                      <strong>Completion Date</strong>
                      <small>Pending completion</small>
                    </div>
                  </div>

                  <p className="certificate-id">
                    Reference: {getCertificateId(previewCourse)}
                  </p>
                </div>
              </div>
            </div>

            <div className="certificate-modal-note">
              <LockKeyhole size={18} />
              <p>
                This is a design preview, not an earned certificate.
                Your course completion, student identity, and
                certificate validity must be verified by the academy
                backend before an official certificate can be issued.
              </p>
            </div>

            <div className="certificate-modal-actions">
              <button
                type="button"
                className="certificate-secondary-button"
                onClick={() => setSelectedCourse(null)}
              >
                Close Preview
              </button>

              <button
                type="button"
                className="certificate-primary-button"
                onClick={handlePrint}
              >
                <Printer size={17} />
                Print Preview
                <Download size={16} />
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Certificates;
