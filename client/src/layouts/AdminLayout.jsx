import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import LoadingIntro from "../components/common/LoadingIntro";
import AdminSidebar from "../admin/components/AdminSidebar";
import AdminTopbar from "../admin/components/AdminTopbar";
import "./AdminLayout.css";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageKey = getAdminPageKey(pathname);

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">
      {!introFinished && (
        <LoadingIntro
          pageKey={pageKey}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      {sidebarOpen && (
        <button
          type="button"
          className="admin-layout-overlay"
          aria-label="Close navigation"
          onClick={closeSidebar}
        />
      )}

      <AdminSidebar
        isOpen={sidebarOpen}
        onNavigate={closeSidebar}
      />

      <div className="admin-layout-main">
        <AdminTopbar
          pathname={pathname}
          sidebarOpen={sidebarOpen}
          onMenuClick={() => setSidebarOpen((open) => !open)}
        />

        <main className="admin-layout-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
