import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingIntro from "../components/common/LoadingIntro";

function getAdminPageKey(pathname) {
  const path = pathname.replace(/\/+$/, "") || "/admin";

  if (path === "/admin" || path === "/admin/dashboard") {
    return "admin";
  }

  if (path.startsWith("/admin/courses")) return "adminCourses";
  if (path.startsWith("/admin/categories")) return "adminCategories";
  if (path.startsWith("/admin/students")) return "adminStudents";
  if (path.startsWith("/admin/enrollments")) return "adminEnrollments";
  if (path.startsWith("/admin/messages")) return "adminMessages";
  if (path.startsWith("/admin/ai-usage")) return "adminAI";
  if (path.startsWith("/admin/settings")) return "adminSettings";

  return "admin";
}

function AdminLayout() {
  const location = useLocation();

  return (
    <AdminLayoutContent
      key={location.pathname}
      pathname={location.pathname}
    />
  );
}

function AdminLayoutContent({ pathname }) {
  const [introFinished, setIntroFinished] = useState(false);
  const pageKey = getAdminPageKey(pathname);

  return (
    <div className="admin-layout">
      {!introFinished && (
        <LoadingIntro
          pageKey={pageKey}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <header className="admin-header">
        <span className="admin-brand">Roxy Billion Academy</span>
        <span className="admin-label">Administration</span>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;