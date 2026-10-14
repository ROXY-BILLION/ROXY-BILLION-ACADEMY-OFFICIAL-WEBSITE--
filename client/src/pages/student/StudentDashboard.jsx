import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Target,
  Trophy,
} from "lucide-react";
import "./StudentDashboard.css";

const dashboardCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Technology",
    instructor: "Roxy Billion Academy",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    color: "blue",
  },
  {
    id: 2,
    title: "Introduction to Business",
    category: "Business",
    instructor: "Roxy Billion Academy",
    progress: 30,
    completedLessons: 6,
    totalLessons: 20,
    color: "gold",
  },
  {
    id: 3,
    title: "Creative Design Essentials",
    category: "Creative Arts & Design",
    instructor: "Roxy Billion Academy",
    progress: 10,
    completedLessons: 2,
    totalLessons: 20,
    color: "purple",
  },
];

function StudentDashboard() {
  const firstName = "Student";

  const totalLessonsCompleted = dashboardCourses.reduce(
    (total, course) => total + course.completedLessons,
    0
  );

  const averageProgress = Math.round(
    dashboardCourses.reduce(
      (total, course) => total + course.progress,
      0
    ) / dashboardCourses.length
  );

  return (
    <main className="student-dashboard">
      <section className="student-dashboard-welcome">
        <div>
          <p className="student-dashboard-eyebrow">
            STUDENT OVERVIEW
          </p>

          <h1>
            Welcome back, {firstName}!
          </h1>

          <p>
            Keep learning, build your skills, and make progress
            toward your goals.
          </p>
        </div>

        <Link to="/courses" className="student-explore-button">
          Explore courses
          <ArrowRight size={17} />
        </Link>
      </section>

      <section className="student-stats-grid" aria-label="Learning statistics">
        <article className="student-stat-card">
          <span className="student-stat-icon blue">
            <BookOpen size={21} />
          </span>

          <div>
            <p>Enrolled courses</p>
            <h2>{dashboardCourses.length}</h2>
            <span>Your current learning</span>
          </div>
        </article>

        <article className="student-stat-card">
          <span className="student-stat-icon gold">
            <CheckCircle2 size={21} />
          </span>

          <div>
            <p>Lessons completed</p>
            <h2>{totalLessonsCompleted}</h2>
            <span>Across your sample courses</span>
          </div>
        </article>

        <article className="student-stat-card">
          <span className="student-stat-icon purple">
            <Target size={21} />
          </span>

          <div>
            <p>Average progress</p>
            <h2>{averageProgress}%</h2>
            <span>Across current courses</span>
          </div>
        </article>

        <article className="student-stat-card">
          <span className="student-stat-icon green">
            <Trophy size={21} />
          </span>

          <div>
            <p>Certificates</p>
            <h2>0</h2>
            <span>Keep working toward your first</span>
          </div>
        </article>
      </section>

      <div className="student-dashboard-content">
        <section className="student-learning-section">
          <div className="student-section-heading">
            <div>
              <p className="student-dashboard-eyebrow">
                PICK UP WHERE YOU LEFT OFF
              </p>
              <h2>Continue learning</h2>
            </div>

            <Link to="/my-courses" className="student-view-all">
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="student-course-list">
            {dashboardCourses.map((course) => (
              <article className="student-course-card" key={course.id}>
                <div
                  className={`student-course-art ${course.color}`}
                  aria-hidden="true"
                >
                  <GraduationCap size={30} />
                </div>

                <div className="student-course-details">
                  <span className="student-course-category">
                    {course.category}
                  </span>

                  <h3>{course.title}</h3>

                  <p>{course.instructor}</p>

                  <div className="student-progress-label">
                    <span>
                      {course.completedLessons} of {course.totalLessons} lessons
                    </span>
                    <strong>{course.progress}%</strong>
                  </div>

                  <div
                    className="student-progress-track"
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

                  <Link
                    to={`/courses/${course.id}`}
                    className="student-continue-link"
                  >
                    <Play size={14} />
                    Continue course
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="student-dashboard-sidebar">
          <section className="student-sidebar-card">
            <div className="student-sidebar-heading">
              <CalendarDays size={19} />
              <h2>Your learning plan</h2>
            </div>

            <p className="student-sidebar-description">
              Build a consistent learning habit by setting aside
              time for your courses.
            </p>

            <div className="student-plan-item">
              <span className="student-plan-icon">
                <Clock3 size={18} />
              </span>

              <div>
                <strong>Daily learning goal</strong>
                <p>30 minutes recommended</p>
              </div>
            </div>

            <div className="student-plan-item">
              <span className="student-plan-icon">
                <Target size={18} />
              </span>

              <div>
                <strong>Next milestone</strong>
                <p>Complete your next lesson</p>
              </div>
            </div>

            <Link to="/my-courses" className="student-sidebar-link">
              Open my courses
              <ArrowRight size={16} />
            </Link>
          </section>

          <section className="student-sidebar-promo">
            <span className="student-promo-icon">
              <GraduationCap size={25} />
            </span>

            <h2>Every lesson counts.</h2>

            <p>
              Small steps today can lead to new opportunities tomorrow.
            </p>

            <Link to="/courses">
              Discover more courses
              <ArrowRight size={16} />
            </Link>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default StudentDashboard;
