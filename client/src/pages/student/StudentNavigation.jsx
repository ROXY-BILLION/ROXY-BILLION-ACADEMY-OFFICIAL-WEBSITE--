import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Compass,
  Award,
    Bot,
  Settings,
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
    label: "Account Settings",
    path: "/settings",
    icon: Settings,
  },
  {
  label: "Free AI Guide",
  path: "/ai-guide",
  icon: Bot,
},
];

function StudentNavigation() {
  return (
    <nav className="student-navigation" aria-label="Student navigation">
      {navigationItems.map((item) => {
        const Icon = item.icon;

        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `student-navigation-link${isActive ? " active" : ""}`
            }
          >
            <Icon size={19} aria-hidden="true" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
}

export default StudentNavigation;
