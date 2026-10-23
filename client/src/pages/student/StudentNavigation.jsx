import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
  Bot,
  Settings,
  ChevronRight,
} from "lucide-react";
import "./StudentNavigation.css";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "My Courses",
    path: "/my-courses",
    icon: BookOpen,
    end: true,
  },
  {
    label: "Browse Courses",
    path: "/courses",
    icon: Compass,
  },
  {
    label: "Certificates",
    path: "/certificates",
    icon: Award,
  },
  {
    label: "Free AI Guide",
    path: "/ai-guide",
    icon: Bot,
  },
  {
    label: "Account Settings",
    path: "/settings",
    icon: Settings,
  },
];

function StudentNavigation() {
  return (
    <nav
      className="student-navigation"
      aria-label="Student navigation"
    >
      <div className="student-navigation-heading">
        <span className="student-navigation-label">
          LEARNING SPACE
        </span>
        <span className="student-navigation-caption">
          Your account
        </span>
      </div>

      <div className="student-navigation-links">
        {navigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `student-navigation-link${
                  isActive ? " active" : ""
                }`
              }
            >
              <span className="student-navigation-icon">
                <Icon size={19} aria-hidden="true" />
              </span>

              <span className="student-navigation-link-label">
                {item.label}
              </span>

              <ChevronRight
                className="student-navigation-arrow"
                size={16}
                aria-hidden="true"
              />
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}

export default StudentNavigation;
