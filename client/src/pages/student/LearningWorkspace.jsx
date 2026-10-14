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
import QuizAssessment from "./QuizAssessment";
import ProjectAssessment from "./ProjectAssessment";
import "./LearningWorkspace.css";

function LearningWorkspace() {
  const { slug } = useParams();

  const course = learningCourses.find((item) => item.slug === slug);

  const [activeLessonId, setActiveLessonId] = useState(1);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [expandedModules, setExpandedModules] = useState([1, 2]);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div className="learning-not-found">
        <BookOpen size={40} />
        <h2>Course not found</h2>
        <p>This learning course could not be found.</p>
        <Link to="/my-courses">Return to My Courses</Link>
      </div>
    );
  }

  const allLessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
    }))
  );

  const activeIndex = allLessons.findIndex(
    (lesson) => lesson.id === activeLessonId
  );

  const activeLesson = allLessons[activeIndex] || allLessons[0];

  const progress =
    allLessons.length > 0
      ? Math.round(
          (completedLessons.length / allLessons.length) * 100
        )
      : 0;

  function toggleModule(moduleId) {
    setExpandedModules((current) =>
      current.includes(moduleId)
        ? current.filter((id) => id !== moduleId)
        : [...current, moduleId]
    );
  }

  function markLessonComplete() {
    if (!completedLessons.includes(activeLesson.id)) {
      setCompletedLessons((current) => [
        ...current,
        activeLesson.id,
      ]);
    }
  }

  function goToLesson(index) {
    if (index < 0 || index >= allLessons.length) return;

    const nextLesson = allLessons[index];

    setActiveLessonId(nextLesson.id);

    setExpandedModules((current) =>
      current.includes(nextLesson.moduleId)
        ? current
        : [...current, nextLesson.moduleId]
    );

    setMobileSidebarOpen(false);
  }

  return (
    <div className="learning-workspace">
      <header className="learning-topbar">
        <div className="learning-topbar-left">
          <button
            type="button"
            className="learning-mobile-menu"
            onClick={() =>
              setMobileSidebarOpen((current) => !current)
            }
            aria-label={
              mobileSidebarOpen
                ? "Close course navigation"
                : "Open course navigation"
            }
            aria-expanded={mobileSidebarOpen}
          >
            {mobileSidebarOpen ? (
              <X size={21} />
            ) : (
              <Menu size={21} />
            )}
          </button>

          <Link
            to="/my-courses"
            className="learning-back-link"
          >
            <ArrowLeft size={17} />
            <span>My Courses</span>
          </Link>
        </div>

        <div className="learning-course-heading">
          <GraduationCap size={20} />
          <span>{course.title}</span>
        </div>

        <div className="learning-progress-summary">
          <span>{progress}% complete</span>

          <div
            className="learning-progress-track"
            role="progressbar"
            aria-label="Course lesson progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </header>

      {mobileSidebarOpen && (
        <button
          type="button"
          className="learning-sidebar-overlay"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Close course navigation"
        />
      )}

      <div className="learning-layout">
        <aside
          className={`learning-sidebar${
            mobileSidebarOpen ? " open" : ""
          }`}
        >
          <div className="learning-sidebar-heading">
            <div>
              <p>YOUR COURSE</p>
              <h2>Course Content</h2>
            </div>
            <BookOpen size={22} />
          </div>

          <div className="learning-sidebar-progress">
            <div className="learning-sidebar-progress-label">
              <span>Lesson progress</span>
              <strong>{completedLessons.length}/{allLessons.length}</strong>
            </div>

            <div
              className="learning-progress-track"
              role="progressbar"
              aria-label="Completed lessons"
              aria-valuemin={0}
              aria-valuemax={allLessons.length}
              aria-valuenow={completedLessons.length}
            >
              <div style={{ width: `${progress}%` }} />
            </div>
          </div>

          <nav
            className="learning-module-list"
            aria-label="Course lessons"
          >
            {course.modules.map((module) => {
              const isExpanded = expandedModules.includes(module.id);

              const moduleCompleted = module.lessons.every((lesson) =>
                completedLessons.includes(lesson.id)
              );

              return (
                <div
                  className="learning-module"
                  key={module.id}
                >
                  <button
                    type="button"
                    className="learning-module-toggle"
                    onClick={() => toggleModule(module.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="learning-module-toggle-left">
                      {moduleCompleted ? (
                        <CheckCircle2
                          size={18}
                          className="learning-completed-icon"
                        />
                      ) : (
                        <BookOpen size={18} />
                      )}

                      <span>{module.title}</span>
                    </span>

                    {isExpanded ? (
                      <ChevronDown size={17} />
                    ) : (
                      <ChevronRight size={17} />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="learning-lesson-list">
                      {module.lessons.map((lesson) => {
                        const isActive =
                          lesson.id === activeLesson.id;

                        const isCompleted =
                          completedLessons.includes(lesson.id);

                        return (
                          <button
                            type="button"
                            key={lesson.id}
                            className={`learning-lesson-item${
                              isActive ? " active" : ""
                            }`}
                            onClick={() => {
                              const lessonIndex =
                                allLessons.findIndex(
                                  (item) => item.id === lesson.id
                                );

                              goToLesson(lessonIndex);
                            }}
                          >
                            <span className="learning-lesson-status">
                              {isCompleted ? (
                                <CheckCircle2 size={17} />
                              ) : (
                                <PlayCircle size={17} />
                              )}
                            </span>

                            <span className="learning-lesson-info">
                              <span>{lesson.title}</span>
                              <small>
                                <Clock3 size={12} />
                                {lesson.duration}
                              </small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </aside>

        <main className="learning-main">
          <div className="learning-main-inner">
            <nav
              className="learning-breadcrumb"
              aria-label="Breadcrumb"
            >
              <Link to="/my-courses">My Courses</Link>
              <ChevronRight size={15} />
              <span>{course.title}</span>
            </nav>

            <article className="learning-content-panel">
              <div className="learning-lesson-eyebrow">
                <span>{activeLesson.moduleTitle}</span>
                <span className="learning-duration">
                  <Clock3 size={15} />
                  {activeLesson.duration}
                </span>
              </div>

              <h1>{activeLesson.title}</h1>

              <div className="learning-lesson-content">
                <p>{activeLesson.content}</p>
              </div>

              <div className="learning-completion-panel">
                <div>
                  <h3>
                    {completedLessons.includes(activeLesson.id)
                      ? "Lesson completed"
                      : "Finished this lesson?"}
                  </h3>

                  <p>
                    {completedLessons.includes(activeLesson.id)
                      ? "Great work. Continue to the next lesson when you are ready."
                      : "Mark this lesson as complete to track your learning progress."}
                  </p>
                </div>

                <button
                  type="button"
                  className="learning-complete-button"
                  onClick={markLessonComplete}
                  disabled={completedLessons.includes(activeLesson.id)}
                >
                  <CheckCircle2 size={17} />
                  {completedLessons.includes(activeLesson.id)
                    ? "Completed"
                    : "Mark Complete"}
                </button>
              </div>

              <nav
                className="learning-lesson-navigation"
                aria-label="Lesson navigation"
              >
                <button
                  type="button"
                  className="learning-previous-button"
                  onClick={() => goToLesson(activeIndex - 1)}
                  disabled={activeIndex <= 0}
                >
                  <ArrowLeft size={17} />
                  Previous Lesson
                </button>

                <button
                  type="button"
                  className="learning-next-button"
                  onClick={() => goToLesson(activeIndex + 1)}
                  disabled={activeIndex >= allLessons.length - 1}
                >
                  Next Lesson
                  <ArrowRight size={17} />
                </button>
              </nav>
            </article>

            {course.quiz && (
              <QuizAssessment quiz={course.quiz} />
            )}

            {course.project && (
              <ProjectAssessment project={course.project} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default LearningWorkspace;
