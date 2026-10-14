import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setMessage(
      "Your email passed validation. Password-reset email delivery will be connected in a later stage."
    );
  }

  return (
    <main className="forgot-page">
      <div className="forgot-shell">
        <section className="forgot-showcase">
          <Link to="/" className="forgot-brand">
            <span className="forgot-brand-icon">
              <GraduationCap size={25} />
            </span>

            <span>
              <strong>ROXY BILLION</strong>
              <small>ACADEMY</small>
            </span>
          </Link>

          <div className="forgot-showcase-content">
            <span className="forgot-eyebrow">ACCOUNT RECOVERY</span>

            <h1>
              Let's get you
              <span> back to learning.</span>
            </h1>

            <p>
              Forgetting a password happens. Follow the recovery
              process to regain access to your learning journey.
            </p>

            <div className="forgot-benefit">
              <span className="forgot-benefit-icon">
                <ShieldCheck size={21} />
              </span>

              <div>
                <strong>Account protection</strong>
                <p>
                  Password recovery will use a secure verification
                  process when backend authentication is implemented.
                </p>
              </div>
            </div>
          </div>

          <p className="forgot-showcase-footer">Learn. Build. Grow.</p>
        </section>

        <section className="forgot-form-section">
          <div className="forgot-form-container">
            <span className="forgot-mobile-icon">
              <GraduationCap size={27} />
            </span>

            <p className="forgot-eyebrow">NEED HELP SIGNING IN?</p>

            <h2>Forgot your password?</h2>

            <p className="forgot-description">
              Enter the email address associated with your account.
              We'll use it to begin the password recovery process.
            </p>

            {message ? (
              <div className="forgot-result" role="status">
                <CheckCircle2 size={27} />

                <h3>Request validated</h3>

                <p>{message}</p>

                <button
                  type="button"
                  className="forgot-submit"
                  onClick={() => {
                    setEmail("");
                    setMessage("");
                  }}
                >
                  Try another email
                </button>
              </div>
            ) : (
              <form className="forgot-form" onSubmit={handleSubmit}>
                <div className="forgot-field">
                  <label htmlFor="forgot-email">Email address</label>

                  <div className="forgot-input-wrap">
                    <Mail size={18} />

                    <input
                      id="forgot-email"
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <p className="forgot-error" role="alert">
                    {error}
                  </p>
                )}

                <button type="submit" className="forgot-submit">
                  Continue
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            <Link to="/login" className="forgot-back-link">
              <ArrowLeft size={16} />
              Back to sign in
            </Link>

            <p className="forgot-register-prompt">
              Don't have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ForgotPassword;
