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
import sampleCourses from "../../data/sampleCourses";
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

  const course = sampleCourses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <main className="course-details-page">
        <section className="course-not-found">
          <div className="course-not-found-icon">
            <BookOpen size={30} />
          </div>

          <span className="course-details-eyebrow">COURSE NOT FOUND</span>

          <h1>This course isn't available here yet.</h1>

          <p>
            The course may have moved or may not exist in this preview.
            Explore the catalogue to find another learning opportunity.
          </p>

          <Link to="/courses" className="course-primary-button">
            <ArrowLeft size={17} />
            Back to courses
          </Link>
        </section>
      </main>
    );
  }

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

              <p>{course.overview}</p>

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
                  {course.lessons} lessons
                </span>
              </div>

              <div className="course-details-actions">
                <Link to="/register" className="course-primary-button">
                  Create an account
                  <ArrowRight size={17} />
                </Link>

                <span className="course-details-free-note">
                  <CheckCircle size={16} />
                  Registration starts your learning journey
                </span>
              </div>
            </div>

            <div className="course-details-visual">
              <div className="course-details-visual-ring course-ring-one" />
              <div className="course-details-visual-ring course-ring-two" />

              <div className="course-details-visual-icon">
                <CourseCategoryIcon category={course.category} size={62} />
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
              By working through this course, you'll develop knowledge
              and skills in the following areas.
            </p>

            <div className="course-outcomes-grid">
              {course.outcomes.map((outcome) => (
                <div className="course-outcome" key={outcome}>
                  <CheckCircle size={19} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="course-content-section">
            <span className="course-details-eyebrow">
              COURSE STRUCTURE
            </span>

            <h2>Curriculum preview</h2>

            <p className="course-content-intro">
              Preview the topics covered in the learning programme.
            </p>

            <div className="course-curriculum">
              {course.curriculum.map((section, index) => (
                <details
                  className="course-curriculum-section"
                  key={section.title}
                  open={index === 0}
                >
                  <summary>
                    <span className="course-curriculum-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="course-curriculum-title">
                      {section.title}
                      <small>
                        {section.lessons.length} preview topics
                      </small>
                    </span>

                    <ArrowRight
                      size={18}
                      className="course-curriculum-arrow"
                    />
                  </summary>

                  <ul>
                    {section.lessons.map((lesson) => (
                      <li key={lesson}>
                        <PlayCircle size={17} />
                        <span>{lesson}</span>
                        <LockKeyhole
                          size={14}
                          className="course-preview-lock"
                        />
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <p className="course-curriculum-note">
              This is a curriculum preview. Full lessons and enrolment
              will be connected in a later stage.
            </p>
          </section>
        </div>

        <aside className="course-details-sidebar">
          <div className="course-enrol-card">
            <div className="course-enrol-icon">
              <CourseCategoryIcon category={course.category} size={29} />
            </div>

            <span className="course-details-eyebrow">START LEARNING</span>

            <h2>Ready to begin?</h2>

            <p>
              Create an account to prepare for enrolment and track your
              learning as academy features become available.
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
                <strong>{course.lessons}</strong>
              </div>

              <div>
                <GraduationCap size={17} />
                <span>Experience level</span>
                <strong>{course.level}</strong>
              </div>
            </div>

            <Link to="/register" className="course-primary-button">
              Get started
              <ArrowRight size={17} />
            </Link>

            <Link to="/contact" className="course-sidebar-contact">
              Have a question? Contact us
            </Link>
          </div>

          <div className="course-sidebar-note">
            <CheckCircle size={19} />

            <p>
              <strong>Learn at your own pace.</strong>
              <span>
                Lesson access, assessments, and certificates will depend
                on the course and your enrolment.
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