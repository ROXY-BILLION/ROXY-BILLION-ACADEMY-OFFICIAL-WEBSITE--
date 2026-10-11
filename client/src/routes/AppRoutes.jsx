import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Pricing from "../pages/public/Pricing";
import Contact from "../pages/public/Contact";

function CoursesPlaceholder() {
  return (
    <section className="public-placeholder">
      <p className="home-section-eyebrow">EXPLORE YOUR POSSIBILITIES</p>
      <h1>Find your next learning opportunity.</h1>
      <p>
        The course catalogue, dynamic categories, and course detail pages
        will be built in Part 4.
      </p>
    </section>
  );
}

function AuthPlaceholder({ title }) {
  return (
    <section className="public-placeholder">
      <p className="home-section-eyebrow">ROXY BILLION ACADEMY</p>
      <h1>{title}</h1>
      <p>Authentication screens will be developed in Part 5.</p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="public-placeholder">
      <p className="home-section-eyebrow">404 · PAGE NOT FOUND</p>
      <h1>This page could not be found.</h1>
      <p>The address may be incorrect, or the page may have moved.</p>
      <a className="home-text-link" href="/">
        Return to the homepage
      </a>
    </section>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<CoursesPlaceholder />} />
        <Route path="courses/:slug" element={<CoursesPlaceholder />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<AuthPlaceholder title="Welcome back" />} />
        <Route path="register" element={<AuthPlaceholder title="Create your account" />} />
        <Route path="forgot-password" element={<AuthPlaceholder title="Recover your account" />} />
        <Route path="reset-password" element={<AuthPlaceholder title="Choose a new password" />} />
      </Route>

      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
