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
} from "lucide-react";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const email = formData.email.trim();

    if (!email || !formData.password) {
      setError("Please enter your email address and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage(
      "Your details passed the basic form checks. Account authentication will be connected in a later stage."
    );
  }

  return (
    <main className="login-page">
      <section className="login-layout">
        <div className="login-showcase">
          <div className="login-brand-mark">
            <GraduationCap size={30} />
          </div>

          <span className="login-eyebrow">
            ROXY BILLION ACADEMY
          </span>

          <h1>
            Your next chapter in <span>learning</span> starts here.
          </h1>

          <p className="login-showcase-description">
            Continue your learning journey, explore new skills, and
            work towards your personal and professional goals.
          </p>

          <div className="login-benefits">
            <div className="login-benefit">
              <span className="login-benefit-icon">
                <GraduationCap size={20} />
              </span>

              <div>
                <h3>Learn with purpose</h3>
                <p>Explore courses across different subject areas.</p>
              </div>
            </div>

            <div className="login-benefit">
              <span className="login-benefit-icon">
                <ShieldCheck size={20} />
              </span>

              <div>
                <h3>Your learning space</h3>
                <p>Prepare to manage your courses and progress.</p>
              </div>
            </div>
          </div>

          <div className="login-showcase-footer">
            Knowledge opens doors. Keep moving forward.
          </div>
        </div>

        <div className="login-form-side">
          <div className="login-card">
            <div className="login-card-heading">
              <span className="login-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your account details to continue.
              </p>
            </div>

            {error && (
              <div className="login-feedback login-feedback-error" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div
                className="login-feedback login-feedback-success"
                role="status"
              >
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="login-email">Email address</label>

                <div className="login-input-wrap">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="login-field">
                <div className="login-password-heading">
                  <label htmlFor="login-password">Password</label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>
                </div>

                <div className="login-input-wrap">
                  <LockKeyhole size={18} />

                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
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

              <label className="login-remember">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />

                <span>Remember me</span>
              </label>

              <button type="submit" className="login-submit-button">
                Sign in
                <ArrowRight size={18} />
              </button>
            </form>

            <div className="login-register-prompt">
              <span>Don't have an account?</span>
              <Link to="/register">Create an account</Link>
            </div>

            <div className="login-security-note">
              <ShieldCheck size={17} />
              <span>Your learning journey starts with one step.</span>
            </div>
          </div>

          <Link to="/" className="login-home-link">
            Return to the Academy homepage
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Login;