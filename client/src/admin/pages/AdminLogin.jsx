
import { useState } from "react";
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      return;
    }

    alert("Login form created. Backend authentication is not connected yet.");
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

        <p className="admin-login-eyebrow">ADMINISTRATOR ACCESS</p>

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
              onChange={(event) => setEmail(event.target.value)}
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
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button
              className="admin-login-password-toggle"
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button className="admin-login-submit" type="submit">
            Sign in to dashboard
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
