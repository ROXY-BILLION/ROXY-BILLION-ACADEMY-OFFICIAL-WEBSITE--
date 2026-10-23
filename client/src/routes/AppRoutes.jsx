import { Navigate, Route, Routes } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Pricing from "../pages/public/Pricing";
import Contact from "../pages/public/Contact";
import Courses from "../pages/public/Courses";
import CourseDetails from "../pages/public/CourseDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import StudentDashboard from "../pages/student/StudentDashboard";
import MyCourses from "../pages/student/MyCourses";
import LearningWorkspace from "../pages/student/LearningWorkspace";
import Certificates from "../pages/student/Certificates";
import FreeAIGuide from "../pages/student/FreeAIGuide";
import StudentSettings from "../pages/student/StudentSettings";

import AdminLogin from "../admin/pages/AdminLogin";
import AdminLayout from "../layouts/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import AdminCourses from "../admin/pages/AdminCourses";
import AdminCategories from "../admin/pages/AdminCategories";
import AdminStudents from "../admin/pages/AdminStudents";
import AdminEnrollments from "../admin/pages/AdminEnrollments";
import AdminAIUsage from "../admin/pages/AdminAIUsage";
import AdminMessages from "../admin/pages/AdminMessages";
import AdminSettings from "../admin/pages/AdminSettings";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function NotFound() {
  return (
    <section className="public-placeholder">
      <p className="home-section-eyebrow">
        404 · PAGE NOT FOUND
      </p>

      <h1>This page could not be found.</h1>

      <p>
        The address may be incorrect, or the page may have moved.
      </p>

      <a className="home-text-link" href="/">
        Return to the homepage
      </a>
    </section>
  );
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public website and authentication pages */}
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:slug" element={<CourseDetails />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />

        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="forgot-password"
          element={<ForgotPassword />}
        />
        <Route
          path="reset-password"
          element={<ResetPassword />}
        />
        <Route
          path="reset-password/:token"
          element={<ResetPassword />}
        />

        {/* Student pages require authentication */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="my-courses"
            element={<MyCourses />}
          />
          <Route
            path="certificates"
            element={<Certificates />}
          />
          <Route
            path="ai-guide"
            element={<FreeAIGuide />}
          />
          <Route
            path="learn/:slug"
            element={<LearningWorkspace />}
          />
          <Route
            path="settings"
            element={<StudentSettings />}
          />
        </Route>
      </Route>

      {/* Admin login remains public */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* Admin pages require the admin role */}
      <Route
        path="/admin"
        element={<ProtectedRoute requiredRole="admin" />}
      >
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="courses"
            element={<AdminCourses />}
          />
          <Route
            path="categories"
            element={<AdminCategories />}
          />
          <Route
            path="students"
            element={<AdminStudents />}
          />
          <Route
            path="enrollments"
            element={<AdminEnrollments />}
          />
          <Route
            path="ai-usage"
            element={<AdminAIUsage />}
          />
          <Route
            path="messages"
            element={<AdminMessages />}
          />
          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>
      </Route>

      {/* Error pages */}
      <Route path="/404" element={<NotFound />} />
      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;