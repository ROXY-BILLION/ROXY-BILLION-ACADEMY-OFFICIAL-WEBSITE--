import { useState } from "react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) return;

    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (data.user?.role !== "admin") {
        await fetch(
          `${(
            import.meta.env.VITE_API_URL ||
            "http://localhost:5000/api"
          ).replace(/\/+$/, "")}/auth/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        ).catch(() => {});

        throw new Error(
          "This account does not have administrator access."
        );
      }

      navigate("/admin/dashboard", { replace: true });
    } catch (loginError) {
      setError(
        loginError.message ||
          "Unable to sign in. Please check your credentials."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="admin-login">
      <div className="admin-login-background" aria-hidden="true">
        <span className="admin-login-orb admin-login-orb-one" />
        <span className="admin-login-orb admin-login-orb-two" />
        <span className="admin-login-grid" />
      </div>

      <section className="admin-login-card">
        <Link to="/" className="admin-login-brand">
          <span className="admin-login-logo">RB</span>

          <span className="admin-login-brand-copy">
            <strong>ROXY BILLION</strong>
            <small>ACADEMY</small>
          </span>
        </Link>

        <div className="admin-login-security-icon">
          <ShieldCheck size={25} />
        </div>

        <p className="admin-login-eyebrow">
          ADMINISTRATOR ACCESS
        </p>

        <h1>Welcome back</h1>

        <p className="admin-login-description">
          Sign in to manage your academy workspace.
        </p>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">Email address</label>

          <div className="admin-login-input-wrap">
            <Mail size={18} aria-hidden="true" />

            <input
              id="admin-email"
              type="email"
              placeholder="admin@example.com"
              autoComplete="username"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              required
            />
          </div>

          <label htmlFor="admin-password">Password</label>

          <div className="admin-login-input-wrap">
            <LockKeyhole size={18} aria-hidden="true" />

            <input
              id="admin-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              required
            />

            <button
              className="admin-login-password-toggle"
              type="button"
              onClick={() =>
                setShowPassword((visible) => !visible)
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

          {error && (
            <p className="admin-login-error" role="alert">
              {error}
            </p>
          )}

          <button
            className="admin-login-submit"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Signing in..."
              : "Sign in to dashboard"}
          </button>
        </form>

        <div className="admin-login-footer">
          <LockKeyhole size={14} />
          <span>Restricted to authorized administrators</span>
        </div>

        <Link to="/" className="admin-login-back">
          ← Back to academy website
        </Link>
      </section>

      <p className="admin-login-copyright">
        © {new Date().getFullYear()} Roxy Billion Academy
      </p>
    </main>
  );
}

export default AdminLogin;