
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const {
      fullName,
      email,
      password,
      confirmPassword,
      agreeToTerms,
    } = formData;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!agreeToTerms) {
      setError("Please agree to the terms before continuing.");
      return;
    }

    setMessage(
      "Your form passed validation. Account creation will be connected in a later stage."
    );
  }

  return (
    <main className="register-page">
      <div className="register-shell">
        <section className="register-showcase">
          <Link to="/" className="register-brand">
            <span className="register-brand-icon">
              <GraduationCap size={25} />
            </span>

            <span>
              <strong>ROXY BILLION</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <div className="register-showcase-content">
            <span className="register-eyebrow">
              START YOUR JOURNEY
            </span>

            <h1>
              Your next chapter
              <span> starts here.</span>
            </h1>

            <p>
              Create your account and begin exploring courses,
              developing practical skills, and building your future
              with Roxy Billion Academy.
            </p>

            <div className="register-benefit">
              <span className="register-benefit-icon">
                <GraduationCap size={21} />
              </span>
              <div>
                <strong>Learn at your pace</strong>
                <p>Explore learning opportunities that fit your goals.</p>
              </div>
            </div>

            <div className="register-benefit">
              <span className="register-benefit-icon">
                <ShieldCheck size={21} />
              </span>
              <div>
                <strong>Your learning journey</strong>
                <p>Keep your courses and progress organized.</p>
              </div>
            </div>
          </div>

          <p className="register-showcase-footer">
            Learn. Build. Grow.
          </p>
        </section>

        <section className="register-form-section">
          <div className="register-form-container">
            <div className="register-heading">
              <span className="register-mobile-icon">
                <GraduationCap size={27} />
              </span>

              <p className="register-eyebrow">
                JOIN THE ACADEMY
              </p>

              <h2>Create your account</h2>

              <p>
                Enter your details below to get started.
              </p>
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <div className="register-field">
                <label htmlFor="register-fullName">
                  Full name
                </label>

                <div className="register-input-wrap">
                  <UserRound size={18} />

                  <input
                    id="register-fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="register-input-wrap">
                  <Mail size={18} />

                  <input
                    id="register-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-password">
                  Password
                </label>

                <div className="register-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />

                  <button
                    className="register-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="register-field">
                <label htmlFor="register-confirmPassword">
                  Confirm password
                </label>

                <div className="register-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="register-confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password again"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                  />

                  <button
                    className="register-password-toggle"
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <label className="register-terms">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />

                <span>
                  I agree to the academy's terms and privacy policy.
                </span>
              </label>

              {error && (
                <p className="register-feedback register-error" role="alert">
                  {error}
                </p>
              )}

              {message && (
                <p
                  className="register-feedback register-success"
                  role="status"
                >
                  {message}
                </p>
              )}

              <button className="register-submit" type="submit">
                Create account
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="register-login-prompt">
              Already have an account?{" "}
              <Link to="/login">Sign in</Link>
            </p>

            <Link to="/" className="register-back-home">
              Back to homepage
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
