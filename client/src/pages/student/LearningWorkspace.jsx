import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock3,
  GraduationCap,
  Menu,
  PlayCircle,
  X,
} from "lucide-react";
import learningCourses from "./learningData";
import "./LearningWorkspace.css";

function LearningWorkspace() {
  const { slug } = useParams();

  const course = learningCourses.find((item) => item.slug === slug);

  const [activeLessonId, setActiveLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedModules, setExpandedModules] = useState([1, 2]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <main className="learning-not-found">
        <BookOpen size={42} />
        <h1>Course workspace unavailable</h1>
        <p>
          This learning workspace is not available for this course yet.
        </p>
        <Link to="/courses">Browse Courses</Link>
      </main>
    );
  }

  const allLessons = course.modules.flatMap((module) => module.lessons);
  const activeIndex = allLessons.findIndex(
    (lesson) => lesson.id === activeLessonId
  );
  const activeLesson = allLessons[activeIndex] || allLessons[0];
  const completedCount = completedLessons.length;
  const progress = Math.round(
    (completedCount / allLessons.length) * 100
  );

  function toggleModule(moduleId) {
    setExpandedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId]
    );
  }

  function markLessonComplete() {
    setCompletedLessons((current) =>
      current.includes(activeLesson.id)
        ? current
        : [...current, activeLesson.id]
    );
  }

  function goToLesson(index) {
    if (index < 0 || index >= allLessons.length) {
      return;
    }

    setActiveLessonId(allLessons[index].id);
    setSidebarOpen(false);
  }

  return (
    <main className="learning-workspace">
      <header className="learning-topbar">
        <Link to="/my-courses" className="learning-back-link">
          <ArrowLeft size={18} />
          <span>My Courses</span>
        </Link>

        <div className="learning-topbar-course">
          <GraduationCap size={20} />
          <span>{course.title}</span>
        </div>

        <button
          type="button"
          className="learning-mobile-menu"
          onClick={() => setSidebarOpen((open) => !open)}
          aria-label={sidebarOpen ? "Close lessons" : "Open lessons"}
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <div className="learning-workspace-body">
        {sidebarOpen && (
          <button
            type="button"
            className="learning-sidebar-overlay"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close lesson menu"
          />
        )}

        <aside
          className={`learning-sidebar${sidebarOpen ? " is-open" : ""}`}
        >
          <div className="learning-sidebar-heading">
            <div>
              <p>COURSE CONTENT</p>
              <h2>Lessons</h2>
            </div>

            <span>
              {completedCount}/{allLessons.length}
            </span>
          </div>

          <div
            className="learning-progress-track"
            role="progressbar"
            aria-label="Course progress"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="learning-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="learning-progress-label">
            {progress}% completed
          </p>

          <div className="learning-module-list">
            {course.modules.map((module) => {
              const isExpanded = expandedModules.includes(module.id);

              return (
                <section
                  className="learning-module"
                  key={module.id}
                >
                  <button
                    type="button"
                    className="learning-module-toggle"
                    onClick={() => toggleModule(module.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="learning-module-title">
                      {isExpanded ? (
                        <ChevronDown size={17} />
                      ) : (
                        <ChevronRight size={17} />
                      )}
                      <span>{module.title}</span>
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="learning-lesson-list">
                      {module.lessons.map((lesson) => {
                        const isComplete = completedLessons.includes(
                          lesson.id
                        );
                        const isActive = activeLesson.id === lesson.id;

                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            className={`learning-lesson-link${
                              isActive ? " active" : ""
                            }`}
                            onClick={() => goToLesson(
                              allLessons.findIndex(
                                (item) => item.id === lesson.id
                              )
                            )}
                          >
                            {isComplete ? (
                              <CheckCircle2 size={17} />
                            ) : (
                              <PlayCircle size={17} />
                            )}

                            <span>{lesson.title}</span>

                            <span className="learning-lesson-duration">
                              {lesson.duration}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </aside>

        <section className="learning-main">
          <div className="learning-main-inner">
            <div className="learning-breadcrumb">
              <Link to="/courses">Courses</Link>
              <ChevronRight size={15} />
              <span>{course.category}</span>
            </div>

            <div className="learning-lesson-heading">
              <div>
                <p className="learning-eyebrow">
                  LESSON {activeIndex + 1} OF {allLessons.length}
                </p>
                <h1>{activeLesson.title}</h1>
              </div>

              <span className="learning-duration">
                <Clock3 size={16} />
                {activeLesson.duration}
              </span>
            </div>

            <div className="learning-content-panel">
              <div className="learning-content-placeholder">
                <div className="learning-content-icon">
                  <BookOpen size={38} />
                </div>
                <p>LEARNING MATERIAL</p>
                <h2>{activeLesson.title}</h2>
                <span>
                  Video lessons and downloadable materials can be
                  integrated in a future step.
                </span>
              </div>

              <div className="learning-lesson-content">
                <h2>About This Lesson</h2>
                <p>{activeLesson.content}</p>
              </div>
            </div>

            <div className="learning-completion-panel">
              <div>
                <h3>
                  {completedLessons.includes(activeLesson.id)
                    ? "Lesson completed"
                    : "Finished this lesson?"}
                </h3>
                <p>
                  Mark this lesson complete to track your progress.
                </p>
              </div>

              <button
                type="button"
                className="learning-complete-button"
                onClick={markLessonComplete}
                disabled={completedLessons.includes(activeLesson.id)}
              >
                <CheckCircle2 size={18} />
                {completedLessons.includes(activeLesson.id)
                  ? "Completed"
                  : "Mark Complete"}
              </button>
            </div>

            <div className="learning-lesson-navigation">
              <button
                type="button"
                className="learning-previous-button"
                onClick={() => goToLesson(activeIndex - 1)}
                disabled={activeIndex === 0}
              >
                <ArrowLeft size={18} />
                Previous Lesson
              </button>

              <button
                type="button"
                className="learning-next-button"
                onClick={() => goToLesson(activeIndex + 1)}
                disabled={activeIndex === allLessons.length - 1}
              >
                Next Lesson
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LearningWorkspace;
