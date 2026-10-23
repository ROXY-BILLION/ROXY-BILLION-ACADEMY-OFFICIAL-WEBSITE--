
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Layers3,
  LockKeyhole,
  PlayCircle,
  Target,
} from "lucide-react";

import { useAuth } from "../../hooks/useAuth";
import { getCourses } from "../../services/courseService";
import { enrollInCourse } from "../../services/enrollmentService";
import "./CourseDetails.css";

function CourseCategoryIcon({ category, size = 24 }) {
  if (category === "Business") {
    return <GraduationCap size={size} />;
  }

  if (category === "Science & Mathematics") {
    return <Target size={size} />;
  }

  if (category === "Creative Arts & Design") {
    return <Layers3 size={size} />;
  }

  return <BookOpen size={size} />;
}

function CourseDetails() {
  const { slug } = useParams();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollmentLoading, setEnrollmentLoading] = useState(false);
  const [enrollmentError, setEnrollmentError] = useState("");
  const [enrollmentMessage, setEnrollmentMessage] = useState("");
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadCourse() {
      setLoading(true);
      setError("");
      setCourse(null);
      setIsEnrolled(false);
      setEnrollmentError("");
      setEnrollmentMessage("");

      try {
        const courseData = await getCourses();

        if (!isMounted) return;

        const courses = Array.isArray(courseData) ? courseData : [];

        const foundCourse = courses.find(
          (item) =>
            item.slug === slug && item.status === "published"
        );

        if (foundCourse) {
          setCourse({
            ...foundCourse,
            overview:
              foundCourse.shortDescription ||
              foundCourse.description ||
              "",
            outcomes: Array.isArray(foundCourse.whatYouWillLearn)
              ? foundCourse.whatYouWillLearn
              : Array.isArray(foundCourse.outcomes)
                ? foundCourse.outcomes
                : [],
            curriculum: Array.isArray(foundCourse.curriculum)
              ? foundCourse.curriculum
              : [],
            duration: foundCourse.duration || "Not specified",
            lessons: Array.isArray(foundCourse.lessons)
              ? foundCourse.lessons.length
              : typeof foundCourse.lessons === "number"
                ? foundCourse.lessons
                : null,
            level: foundCourse.level || "Not specified",
          });
        }
      } catch (requestError) {
        if (!isMounted) return;

        setError(
          requestError?.message || "Unable to load this course."
        );
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadCourse();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  async function handleEnrollment() {
    if (!isAuthenticated || !user) {
      setEnrollmentError("Please sign in before enrolling.");
      return;
    }

    if (user.role !== "student") {
      setEnrollmentError(
        "Course enrollment is available to student accounts."
      );
      return;
    }

    if (!course?._id) {
      setEnrollmentError("Course information is incomplete.");
      return;
    }

    if (course.plan !== "Free") {
      setEnrollmentError(
        "Enrollment for paid courses will be available after payment integration."
      );
      return;
    }

    setEnrollmentLoading(true);
    setEnrollmentError("");
    setEnrollmentMessage("");

    try {
      const data = await enrollInCourse(course._id);

      setIsEnrolled(true);
      setEnrollmentMessage(
        data.message || "You have enrolled successfully."
      );
    } catch (requestError) {
      setEnrollmentError(
        requestError.message || "Unable to enrol in this course."
      );
    } finally {
      setEnrollmentLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="course-details-page">
        <section className="course-not-found" role="status">
          <div className="course-not-found-icon">
            <BookOpen size={30} />
          </div>
          <span className="course-details-eyebrow">
            COURSE CATALOGUE
          </span>
          <h1>Loading course...</h1>
          <p>Please wait while we retrieve the course information.</p>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="course-details-page">
        <section className="course-not-found" role="alert">
          <div className="course-not-found-icon">
            <BookOpen size={30} />
          </div>
          <span className="course-details-eyebrow">
            COURSE UNAVAILABLE
          </span>
          <h1>We couldn't load this course.</h1>
          <p>{error}</p>
          <Link to="/courses" className="course-primary-button">
            <ArrowLeft size={17} />
            Back to courses
          </Link>
        </section>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="course-details-page">
        <section className="course-not-found">
          <div className="course-not-found-icon">
            <BookOpen size={30} />
          </div>

          <span className="course-details-eyebrow">
            COURSE NOT FOUND
          </span>

          <h1>This course isn't available here yet.</h1>

          <p>
            This course may not exist or may not currently be published.
            Explore the catalogue to find another available course.
          </p>

          <Link to="/courses" className="course-primary-button">
            <ArrowLeft size={17} />
            Back to courses
          </Link>
        </section>
      </main>
    );
  }

  const isFreeCourse = course.plan === "Free";
  const canEnroll =
    isAuthenticated &&
    user?.role === "student" &&
    isFreeCourse &&
    !isEnrolled;

  return (
    <div className="course-details-page">
      <section className="course-details-hero">
        <div className="course-details-hero-inner">
          <Link to="/courses" className="course-back-link">
            <ArrowLeft size={17} />
            All courses
          </Link>

          <div className="course-details-hero-grid">
            <div className="course-details-hero-copy">
              <span className="course-details-category">
                {course.category}
              </span>

              <h1>{course.title}</h1>

              <p>
                {course.overview ||
                  "Course description will be available when provided."}
              </p>

              <div className="course-details-meta">
                <span>
                  <GraduationCap size={17} />
                  {course.level}
                </span>

                <span>
                  <Clock size={17} />
                  {course.duration}
                </span>

                <span>
                  <BookOpen size={17} />
                  {course.lessons === null
                    ? "Lesson count unavailable"
                    : `${course.lessons} lessons`}
                </span>
              </div>

              <div className="course-details-actions">
                {!isAuthenticated ? (
                  <Link
                    to="/register"
                    className="course-primary-button"
                  >
                    Create an account
                    <ArrowRight size={17} />
                  </Link>
                ) : isEnrolled ? (
                  <Link
                    to="/my-courses"
                    className="course-primary-button"
                  >
                    Go to My Courses
                    <ArrowRight size={17} />
                  </Link>
                ) : canEnroll ? (
                  <button
                    type="button"
                    className="course-primary-button"
                    onClick={handleEnrollment}
                    disabled={enrollmentLoading || authLoading}
                  >
                    {enrollmentLoading
                      ? "Enrolling..."
                      : "Enrol in Free Course"}
                    {!enrollmentLoading && <ArrowRight size={17} />}
                  </button>
                ) : (
                  <span className="course-details-free-note">
                    {user?.role !== "student"
                      ? "Student account required for enrollment"
                      : "Enrollment for this paid course is not available yet"}
                  </span>
                )}

                {!isAuthenticated && (
                  <span className="course-details-free-note">
                    <CheckCircle size={16} />
                    Create an account to begin
                  </span>
                )}
              </div>

              {enrollmentMessage && (
                <p role="status" aria-live="polite">
                  {enrollmentMessage}
                </p>
              )}

              {enrollmentError && (
                <div role="alert">
                  <p>{enrollmentError}</p>
                  {!isAuthenticated && (
                    <Link to="/login">Sign in to continue</Link>
                  )}
                </div>
              )}
            </div>

            <div className="course-details-visual">
              <div className="course-details-visual-ring course-ring-one" />
              <div className="course-details-visual-ring course-ring-two" />

              <div className="course-details-visual-icon">
                <CourseCategoryIcon
                  category={course.category}
                  size={62}
                />
              </div>

              <div className="course-visual-tag course-visual-tag-top">
                <BookOpen size={16} />
                Structured lessons
              </div>

              <div className="course-visual-tag course-visual-tag-bottom">
                <Target size={16} />
                Practical learning
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="course-details-content">
        <div className="course-details-main">
          <section className="course-content-section">
            <span className="course-details-eyebrow">
              YOUR LEARNING GOALS
            </span>

            <h2>What you'll learn</h2>

            <p className="course-content-intro">
              Explore the learning outcomes provided for this course.
            </p>

            {course.outcomes.length > 0 ? (
              <div className="course-outcomes-grid">
                {course.outcomes.map((outcome, index) => (
                  <div
                    className="course-outcome"
                    key={`${outcome}-${index}`}
                  >
                    <CheckCircle size={19} />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="course-content-intro">
                Learning outcomes have not been added to this course yet.
              </p>
            )}
          </section>

          <section className="course-content-section">
            <span className="course-details-eyebrow">
              COURSE STRUCTURE
            </span>

            <h2>Curriculum</h2>

            <p className="course-content-intro">
              Explore the curriculum content available for this course.
            </p>

            {course.curriculum.length > 0 ? (
              <div className="course-curriculum">
                {course.curriculum.map((section, index) => {
                  const lessons = Array.isArray(section.lessons)
                    ? section.lessons
                    : [];

                  return (
                    <details
                      className="course-curriculum-section"
                      key={section.title || index}
                      open={index === 0}
                    >
                      <summary>
                        <span className="course-curriculum-number">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="course-curriculum-title">
                          {section.title || `Section ${index + 1}`}
                          <small>{lessons.length} topics</small>
                        </span>

                        <ArrowRight
                          size={18}
                          className="course-curriculum-arrow"
                        />
                      </summary>

                      {lessons.length > 0 ? (
                        <ul>
                          {lessons.map((lesson, lessonIndex) => {
                            const lessonTitle =
                              typeof lesson === "string"
                                ? lesson
                                : lesson.title ||
                                  `Lesson ${lessonIndex + 1}`;

                            return (
                              <li
                                key={`${lessonTitle}-${lessonIndex}`}
                              >
                                <PlayCircle size={17} />
                                <span>{lessonTitle}</span>
                                <LockKeyhole
                                  size={14}
                                  className="course-preview-lock"
                                />
                              </li>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="course-content-intro">
                          No topics have been added to this section yet.
                        </p>
                      )}
                    </details>
                  );
                })}
              </div>
            ) : (
              <p className="course-content-intro">
                The curriculum has not been added to this course yet.
              </p>
            )}

            <p className="course-curriculum-note">
              Course access and available learning materials depend on
              the content published for this course.
            </p>
          </section>
        </div>

        <aside className="course-details-sidebar">
          <div className="course-enrol-card">
            <div className="course-enrol-icon">
              <CourseCategoryIcon
                category={course.category}
                size={29}
              />
            </div>

            <span className="course-details-eyebrow">
              START LEARNING
            </span>

            <h2>
              {isEnrolled ? "You're enrolled!" : "Ready to begin?"}
            </h2>

            <p>
              {isEnrolled
                ? "This course is now listed in your student course library."
                : isFreeCourse
                  ? "Enrol in this free course to add it to your student course library."
                  : "Enrollment for this paid course will be available after payment integration."}
            </p>

            <div className="course-enrol-facts">
              <div>
                <Clock size={17} />
                <span>Estimated duration</span>
                <strong>{course.duration}</strong>
              </div>

              <div>
                <BookOpen size={17} />
                <span>Course lessons</span>
                <strong>
                  {course.lessons === null
                    ? "Not specified"
                    : course.lessons}
                </strong>
              </div>

              <div>
                <GraduationCap size={17} />
                <span>Experience level</span>
                <strong>{course.level}</strong>
              </div>
            </div>

            {!isAuthenticated ? (
              <Link
                to="/register"
                className="course-primary-button"
              >
                Get started
                <ArrowRight size={17} />
              </Link>
            ) : isEnrolled ? (
              <Link
                to="/my-courses"
                className="course-primary-button"
              >
                Go to My Courses
                <ArrowRight size={17} />
              </Link>
            ) : canEnroll ? (
              <button
                type="button"
                className="course-primary-button"
                onClick={handleEnrollment}
                disabled={enrollmentLoading || authLoading}
              >
                {enrollmentLoading
                  ? "Enrolling..."
                  : "Enrol Now"}
                {!enrollmentLoading && <ArrowRight size={17} />}
              </button>
            ) : (
              <p className="course-details-free-note">
                {user?.role !== "student"
                  ? "Student account required"
                  : "Paid enrollment coming after payment integration"}
              </p>
            )}

            <Link to="/contact" className="course-sidebar-contact">
              Have a question? Contact us
            </Link>
          </div>

          <div className="course-sidebar-note">
            <CheckCircle size={19} />

            <p>
              <strong>Learn at your own pace.</strong>
              <span>
                Available lessons and assessments depend on the course
                content and your enrollment.
              </span>
            </p>
          </div>
        </aside>
      </section>

      <section className="course-details-bottom">
        <div>
          <span className="course-details-eyebrow">KEEP EXPLORING</span>
          <h2>Your next learning opportunity is waiting.</h2>
        </div>

        <Link to="/courses" className="course-secondary-button">
          Browse all courses
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default CourseDetails;
