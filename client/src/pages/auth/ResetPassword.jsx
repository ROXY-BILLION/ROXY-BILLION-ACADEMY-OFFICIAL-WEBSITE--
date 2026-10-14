
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import "./ResetPassword.css";

function ResetPassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.password || !formData.confirmPassword) {
      setError("Please complete both password fields.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    setSuccess(true);
  }

  return (
    <main className="reset-page">
      <div className="reset-shell">
        <section className="reset-showcase">
          <Link to="/" className="reset-brand">
            <span className="reset-brand-icon">
              <GraduationCap size={25} />
            </span>

            <span>
              <strong>ROXY BILLION</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <div className="reset-showcase-content">
            <span className="reset-eyebrow">ACCOUNT SECURITY</span>

            <h1>
              A fresh start
              <span> begins here.</span>
            </h1>

            <p>
              Choose a strong password to help protect your academy
              account and your learning progress.
            </p>

            <div className="reset-security-item">
              <ShieldCheck size={22} />
              <div>
                <strong>Protect your account</strong>
                <p>
                  Use a unique password that you do not use on
                  other websites.
                </p>
              </div>
            </div>
          </div>

          <p className="reset-showcase-footer">Learn. Build. Grow.</p>
        </section>

        <section className="reset-form-section">
          <div className="reset-form-container">
            <span className="reset-mobile-icon">
              <GraduationCap size={27} />
            </span>

            <p className="reset-eyebrow">PASSWORD RECOVERY</p>

            <h2>Choose a new password</h2>

            <p className="reset-description">
              Enter your new password below and confirm it to continue.
            </p>

            {success ? (
              <div className="reset-success" role="status">
                <CheckCircle2 size={30} />

                <h3>Form validated</h3>

                <p>
                  Your new password passed the frontend checks.
                  The actual password update requires a valid reset
                  token and backend authentication.
                </p>

                <Link to="/login" className="reset-submit">
                  Return to sign in
                </Link>
              </div>
            ) : (
              <form className="reset-form" onSubmit={handleSubmit}>
                <div className="reset-field">
                  <label htmlFor="reset-password">New password</label>

                  <div className="reset-input-wrap">
                    <LockKeyhole size={18} />

                    <input
                      id="reset-password"
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
                      type="button"
                      className="reset-password-toggle"
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

                  <p className="reset-field-hint">
                    Use at least 8 characters.
                  </p>
                </div>

                <div className="reset-field">
                  <label htmlFor="reset-confirm-password">
                    Confirm new password
                  </label>

                  <div className="reset-input-wrap">
                    <LockKeyhole size={18} />

                    <input
                      id="reset-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Enter your new password again"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                    />

                    <button
                      type="button"
                      className="reset-password-toggle"
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

                {error && (
                  <p className="reset-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="reset-submit">
                  Validate new password
                </button>
              </form>
            )}

            <Link to="/forgot-password" className="reset-back-link">
              <ArrowLeft size={16} />
              Back to password recovery
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ResetPassword;
