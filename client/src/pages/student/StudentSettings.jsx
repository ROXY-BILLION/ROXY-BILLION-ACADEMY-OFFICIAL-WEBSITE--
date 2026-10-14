import { useState } from "react";
import {
  UserRound,
  ShieldCheck,
  Bell,
  Save,
  LockKeyhole,
  Eye,
  EyeOff,
  CheckCircle2,
  Settings,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import "./StudentSettings.css";

const PROFILE_KEY = "rba_student_profile";
const PREFERENCES_KEY = "rba_student_preferences";

const defaultProfile = {
  fullName: "",
  email: "",
  phone: "",
  country: "Nigeria",
  bio: "",
};

const defaultPreferences = {
  emailUpdates: true,
  courseReminders: true,
  achievementNotifications: true,
  weeklySummary: false,
};

function readStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? { ...fallback, ...JSON.parse(stored) } : fallback;
  } catch {
    return fallback;
  }
}

function StudentSettings() {
  const [profile, setProfile] = useState(() =>
    readStoredValue(PROFILE_KEY, defaultProfile)
  );

  const [preferences, setPreferences] = useState(() =>
    readStoredValue(PREFERENCES_KEY, defaultPreferences)
  );

  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const [showPasswords, setShowPasswords] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");
  const [notice, setNotice] = useState(null);

  function updateProfile(event) {
    const { name, value } = event.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));

    setNotice(null);
  }

  function updatePreference(name) {
    setPreferences((current) => ({
      ...current,
      [name]: !current[name],
    }));

    setNotice(null);
  }

  function saveProfile(event) {
    event.preventDefault();

    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

      setNotice({
        type: "success",
        text: "Your profile has been saved in this browser.",
      });
    } catch {
      setNotice({
        type: "error",
        text: "Your profile could not be saved in this browser.",
      });
    }
  }

  function savePreferences() {
    try {
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify(preferences)
      );

      setNotice({
        type: "success",
        text: "Your preferences have been saved in this browser.",
      });
    } catch {
      setNotice({
        type: "error",
        text: "Your preferences could not be saved.",
      });
    }
  }

  function changePassword(event) {
    event.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setNotice({
        type: "error",
        text: "Complete all password fields.",
      });
      return;
    }

    if (passwords.next.length < 8) {
      setNotice({
        type: "error",
        text: "Your new password must contain at least 8 characters.",
      });
      return;
    }

    if (passwords.next !== passwords.confirm) {
      setNotice({
        type: "error",
        text: "Your new passwords do not match.",
      });
      return;
    }

    setNotice({
      type: "info",
      text:
        "Password changes are not connected yet. A secure backend must verify your current password and update your account.",
    });
  }

  const sections = [
    {
      id: "profile",
      label: "Personal Information",
      description: "Your name and contact details",
      icon: UserRound,
    },
    {
      id: "security",
      label: "Password & Security",
      description: "Manage your account password",
      icon: ShieldCheck,
    },
    {
      id: "notifications",
      label: "Notifications",
      description: "Choose your learning updates",
      icon: Bell,
    },
  ];

  return (
    <main className="student-settings-page page-container">
      <StudentNavigation />

      <header className="student-settings-header">
        <div>
          <p className="home-section-eyebrow">YOUR ACCOUNT</p>
          <h1>Account Settings</h1>
          <p>
            Manage your profile, security preferences, and learning
            notifications in one place.
          </p>
        </div>

        <div className="student-settings-header-icon">
          <Settings size={32} />
        </div>
      </header>

      {notice && (
        <div
          className={`student-settings-notice ${notice.type}`}
          role="status"
        >
          {notice.type === "success" ? (
            <CheckCircle2 size={19} />
          ) : (
            <ShieldCheck size={19} />
          )}
          <span>{notice.text}</span>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <div className="student-settings-layout">
        <aside className="student-settings-sidebar">
          <div className="student-settings-account-card">
            <div className="student-settings-avatar">
              {profile.fullName.trim()
                ? profile.fullName.trim().charAt(0).toUpperCase()
                : "S"}
            </div>

            <h2>{profile.fullName.trim() || "Student Account"}</h2>

            <p>{profile.email || "Add your email address"}</p>

            <span className="student-settings-account-badge">
              <ShieldCheck size={14} />
              Student Profile
            </span>
          </div>

          <nav
            className="student-settings-section-nav"
            aria-label="Account settings sections"
          >
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  type="button"
                  key={section.id}
                  className={
                    activeSection === section.id ? "active" : ""
                  }
                  onClick={() => {
                    setActiveSection(section.id);
                    setNotice(null);
                  }}
                  aria-current={
                    activeSection === section.id ? "page" : undefined
                  }
                >
                  <Icon size={19} />

                  <span>
                    <strong>{section.label}</strong>
                    <small>{section.description}</small>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="student-settings-content">
          {activeSection === "profile" && (
            <article className="student-settings-panel">
              <div className="student-settings-panel-heading">
                <div>
                  <p className="home-section-eyebrow">
                    PERSONAL DETAILS
                  </p>
                  <h2>Personal Information</h2>
                  <p>
                    Update the information associated with your
                    student profile.
                  </p>
                </div>

                <UserRound size={25} />
              </div>

              <form
                className="student-settings-form"
                onSubmit={saveProfile}
              >
                <div className="student-settings-field">
                  <label htmlFor="student-full-name">
                    Full name
                  </label>
                  <input
                    id="student-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={profile.fullName}
                    onChange={updateProfile}
                    placeholder="Enter your full name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="student-settings-field">
                  <label htmlFor="student-email">
                    Email address
                  </label>
                  <input
                    id="student-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={profile.email}
                    onChange={updateProfile}
                    placeholder="you@example.com"
                    maxLength={254}
                    required
                  />
                </div>

                <div className="student-settings-field">
                  <label htmlFor="student-phone">
                    Phone number <span>Optional</span>
                  </label>
                  <input
                    id="student-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={profile.phone}
                    onChange={updateProfile}
                    placeholder="Enter your phone number"
                    maxLength={30}
                  />
                </div>

                <div className="student-settings-field">
                  <label htmlFor="student-country">Country</label>
                  <input
                    id="student-country"
                    name="country"
                    type="text"
                    autoComplete="country-name"
                    value={profile.country}
                    onChange={updateProfile}
                    maxLength={100}
                  />
                </div>

                <div className="student-settings-field full-width">
                  <label htmlFor="student-bio">
                    About me <span>Optional</span>
                  </label>
                  <textarea
                    id="student-bio"
                    name="bio"
                    value={profile.bio}
                    onChange={updateProfile}
                    placeholder="Tell us a little about your learning goals..."
                    rows={4}
                    maxLength={500}
                  />
                  <small>{profile.bio.length}/500 characters</small>
                </div>

                <div className="student-settings-form-footer">
                  <p>
                    <ShieldCheck size={16} />
                    Profile details are stored locally in this demo.
                  </p>

                  <button
                    type="submit"
                    className="student-settings-save-button"
                  >
                    <Save size={17} />
                    Save Profile
                  </button>
                </div>
              </form>
            </article>
          )}

          {activeSection === "security" && (
            <article className="student-settings-panel">
              <div className="student-settings-panel-heading">
                <div>
                  <p className="home-section-eyebrow">
                    ACCOUNT PROTECTION
                  </p>
                  <h2>Password & Security</h2>
                  <p>
                    Keep your account protected with a strong,
                    unique password.
                  </p>
                </div>

                <ShieldCheck size={25} />
              </div>

              <div className="student-settings-security-notice">
                <LockKeyhole size={21} />
                <div>
                  <h3>Password updates are not active yet</h3>
                  <p>
                    This form demonstrates the interface only. Your
                    current password cannot be verified until the
                    academy backend is connected.
                  </p>
                </div>
              </div>

              <form
                className="student-settings-form"
                onSubmit={changePassword}
              >
                {[
                  {
                    id: "current-password",
                    name: "current",
                    label: "Current password",
                    autoComplete: "current-password",
                  },
                  {
                    id: "new-password",
                    name: "next",
                    label: "New password",
                    autoComplete: "new-password",
                  },
                  {
                    id: "confirm-password",
                    name: "confirm",
                    label: "Confirm new password",
                    autoComplete: "new-password",
                  },
                ].map((field) => (
                  <div
                    className="student-settings-field full-width"
                    key={field.id}
                  >
                    <label htmlFor={field.id}>{field.label}</label>

                    <div className="student-settings-password-input">
                      <input
                        id={field.id}
                        name={field.name}
                        type={showPasswords ? "text" : "password"}
                        autoComplete={field.autoComplete}
                        value={passwords[field.name]}
                        onChange={(event) => {
                          setPasswords((current) => ({
                            ...current,
                            [field.name]: event.target.value,
                          }));
                          setNotice(null);
                        }}
                        minLength={field.name === "current" ? 1 : 8}
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((current) => !current)
                        }
                        aria-label={
                          showPasswords
                            ? "Hide passwords"
                            : "Show passwords"
                        }
                      >
                        {showPasswords ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}

                <div className="student-settings-form-footer">
                  <p>
                    <LockKeyhole size={16} />
                    Passwords are never saved by this demo.
                  </p>

                  <button
                    type="submit"
                    className="student-settings-save-button"
                  >
                    <ShieldCheck size={17} />
                    Validate Password Form
                  </button>
                </div>
              </form>
            </article>
          )}

          {activeSection === "notifications" && (
            <article className="student-settings-panel">
              <div className="student-settings-panel-heading">
                <div>
                  <p className="home-section-eyebrow">
                    STAY INFORMED
                  </p>
                  <h2>Notification Preferences</h2>
                  <p>
                    Choose which learning updates you would like
                    enabled for your account.
                  </p>
                </div>

                <Bell size={25} />
              </div>

              <div className="student-settings-preferences">
                {[
                  {
                    id: "emailUpdates",
                    title: "Academy updates",
                    description:
                      "News and important announcements from the academy.",
                  },
                  {
                    id: "courseReminders",
                    title: "Course reminders",
                    description:
                      "Reminders to continue lessons and learning activities.",
                  },
                  {
                    id: "achievementNotifications",
                    title: "Learning achievements",
                    description:
                      "Updates about completed courses and earned certificates.",
                  },
                  {
                    id: "weeklySummary",
                    title: "Weekly learning summary",
                    description:
                      "A summary of your learning progress each week.",
                  },
                ].map((item) => (
                  <label
                    className="student-settings-preference"
                    key={item.id}
                  >
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.description}</small>
                    </span>

                    <input
                      type="checkbox"
                      checked={preferences[item.id]}
                      onChange={() => updatePreference(item.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="student-settings-form-footer">
                <p>
                  <Bell size={16} />
                  Preferences are stored locally in this demo.
                </p>

                <button
                  type="button"
                  className="student-settings-save-button"
                  onClick={savePreferences}
                >
                  <Save size={17} />
                  Save Preferences
                </button>
              </div>
            </article>
          )}
        </section>
      </div>
    </main>
  );
}

export default StudentSettings;
