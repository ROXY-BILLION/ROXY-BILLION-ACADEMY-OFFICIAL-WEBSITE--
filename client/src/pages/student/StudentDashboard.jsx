import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  PlayCircle,
  Target,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import "./StudentDashboard.css";

const dashboardCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    category: "Technology",
    progress: 65,
    completedLessons: 13,
    totalLessons: 20,
    slug: "web-development-fundamentals",
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
    color: "purple",
  },
];

function StudentDashboard() {
  const totalCourses = dashboardCourses.length;

  const completedLessons = dashboardCourses.reduce(
    (total, course) => total + course.completedLessons,
    0
  );

  const totalLessons = dashboardCourses.reduce(
    (total, course) => total + course.totalLessons,
    0
  );

  const overallProgress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  return (
    <main className="student-dashboard page-container">
      <StudentNavigation />

      <section className="student-dashboard-header">
        <div>
          <p className="home-section-eyebrow">STUDENT DASHBOARD</p>
          <h1>Welcome back, Student!</h1>
          <p>
            Continue learning, track your progress, and work toward
            your goals.
          </p>
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
            <h2>{totalCourses}</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <GraduationCap size={22} />
          </div>
          <div>
            <p>Lessons Completed</p>
            <h2>{completedLessons}</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <Target size={22} />
          </div>
          <div>
            <p>Learning Progress</p>
            <h2>{overallProgress}%</h2>
          </div>
        </article>

        <article className="student-dashboard-stat">
          <div className="student-dashboard-stat-icon">
            <Clock3 size={22} />
          </div>
          <div>
            <p>Lessons Remaining</p>
            <h2>{totalLessons - completedLessons}</h2>
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

          <div className="student-dashboard-course-list">
            {dashboardCourses.map((course) => (
              <article
                className="student-dashboard-course"
                key={course.id}
              >
                <div
                  className={`student-dashboard-course-icon ${course.color}`}
                >
                  <BookOpen size={24} />
                </div>

                <div className="student-dashboard-course-info">
                  <p className="student-dashboard-course-category">
                    {course.category}
                  </p>

                  <h3>{course.title}</h3>

                  <div className="student-dashboard-progress">
                    <div className="student-dashboard-progress-track">
                      <div
                        className="student-dashboard-progress-fill"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>

                    <span>{course.progress}%</span>
                  </div>

                  <p className="student-dashboard-course-lessons">
                    {course.completedLessons} of {course.totalLessons}{" "}
                    lessons completed
                  </p>
                </div>

                <Link
                  to={`/courses/${course.slug}`}
                  className="student-dashboard-continue"
                  aria-label={`Continue ${course.title}`}
                >
                  <PlayCircle size={21} />
                </Link>
              </article>
            ))}
          </div>
        </div>

        <aside className="student-dashboard-sidebar">
          <section className="student-dashboard-plan">
            <div className="student-dashboard-plan-icon">
              <Target size={24} />
            </div>

            <p className="home-section-eyebrow">YOUR LEARNING PLAN</p>
            <h2>Keep making progress</h2>
            <p>
              Build a consistent learning habit by completing a lesson
              whenever you can.
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
