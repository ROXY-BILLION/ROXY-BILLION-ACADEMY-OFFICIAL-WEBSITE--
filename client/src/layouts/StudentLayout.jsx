import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingIntro from "../components/common/LoadingIntro";

function getStudentPageKey(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/student";

  if (path === "/student" || path === "/student/dashboard" ||
      path === "/dashboard") {
    return "dashboard";
  }

  if (path.includes("/my-courses") || path === "/my-courses") {
    return "myCourses";
  }

  if (
    path.includes("/learn") ||
    path.includes("/lesson") ||
    path.includes("/course/")
  ) {
    return "learning";
  }

  if (path.includes("/assessments") || path.includes("/projects")) {
    return "assessments";
  }

  if (path.includes("/certificates")) {
    return "certificates";
  }

  if (path.includes("/settings")) {
    return "settings";
  }

  return "dashboard";
}

function StudentLayout() {
  const location = useLocation();

  return (
    <StudentLayoutContent
      key={location.pathname}
      pathname={location.pathname}
    />
  );
}

function StudentLayoutContent({ pathname }) {
  const [introFinished, setIntroFinished] = useState(false);
  const pageKey = getStudentPageKey(pathname);

  return (
    <div className="student-layout">
      {!introFinished && (
        <LoadingIntro
          pageKey={pageKey}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <header className="student-header">
        <span className="student-brand">Roxy Billion Academy</span>
        <span className="student-label">Student Area</span>
      </header>

      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;