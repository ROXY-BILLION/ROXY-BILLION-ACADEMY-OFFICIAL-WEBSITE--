import { Menu, Search } from "lucide-react";
import "./AdminTopbar.css";

const pageNames = {
  "/admin": "Dashboard",
  "/admin/courses": "Course Management",
  "/admin/categories": "Category Management",
  "/admin/students": "Student Management",
  "/admin/enrollments": "Enrollments",
  "/admin/ai-usage": "AI Usage",
  "/admin/messages": "Messages",
  "/admin/settings": "Settings",
};

function AdminTopbar({ onMenuClick, sidebarOpen, pathname }) {
  const pageTitle = pageNames[pathname] || "Administration";

  return (
    <header className="admin-topbar">
      <div className="admin-topbar-heading">
        <button
          className="admin-topbar-menu"
          type="button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={sidebarOpen}
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="admin-topbar-eyebrow">ROXY BILLION ACADEMY</p>
          <h1>{pageTitle}</h1>
        </div>
      </div>

      <label className="admin-topbar-search">
        <Search size={17} />
        <input
          type="search"
          placeholder="Search..."
          aria-label="Search admin workspace"
        />
      </label>
    </header>
  );
}

export default AdminTopbar;
