import { NavLink } from "react-router-dom";
import {
  Activity,
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import "./AdminSidebar.css";

const navigation = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Courses",
    to: "/admin/courses",
    icon: BookOpen,
  },
  {
    label: "Categories",
    to: "/admin/categories",
    icon: GraduationCap,
  },
  {
    label: "Students",
    to: "/admin/students",
    icon: Users,
  },
  {
    label: "Enrollments",
    to: "/admin/enrollments",
    icon: ShieldCheck,
  },
  {
    label: "AI Usage",
    to: "/admin/ai-usage",
    icon: Activity,
  },
  {
    label: "Messages",
    to: "/admin/messages",
    icon: Mail,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    icon: Settings,
  },
];

function AdminSidebar({ isOpen, onNavigate }) {
  return (
    <aside
      className={`admin-sidebar ${isOpen ? "is-open" : ""}`}
      aria-label="Admin sidebar"
    >
      <NavLink
        to="/admin"
        className="admin-sidebar-brand"
        onClick={onNavigate}
      >
        <span className="admin-sidebar-logo">RB</span>

        <span className="admin-sidebar-brand-text">
          <strong>ROXY BILLION</strong>
          <small>ACADEMY ADMIN</small>
        </span>

        <span className="admin-sidebar-mobile-close">
          <X size={19} />
        </span>
      </NavLink>

      <p className="admin-sidebar-section-label">WORKSPACE</p>

      <nav className="admin-sidebar-nav">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `admin-sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={19} strokeWidth={1.8} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer">
        <span className="admin-sidebar-status-dot" />
        <div>
          <strong>Academy Workspace</strong>
          <small>Administration</small>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
