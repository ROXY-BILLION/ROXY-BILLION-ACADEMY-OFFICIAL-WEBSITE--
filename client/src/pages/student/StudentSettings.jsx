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
import { useAuth } from "../../hooks/useAuth.js";
import StudentNavigation from "./StudentNavigation";
import {
  changeUserPassword,
  updateUserProfile,
} from "../../services/auth.js";
import "./StudentSettings.css";

const PROFILE_KEY = "rba_student_profile";
const PREFERENCES_KEY = "rba_student_preferences";

const defaultPreferences = {
  emailUpdates: true,
  courseReminders: true,
  achievementNotifications: true,
  weeklySummary: false,
};

function readStoredValue(key, fallback) {
  try {
    const stored = localStorage.getItem(key);

    if (!stored) return { ...fallback };

    const parsed = JSON.parse(stored);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ...fallback };
    }

    return { ...fallback, ...parsed };
  } catch {
    return { ...fallback };
  }
}

function readStoredProfile() {
  try {
    const stored = localStorage.getItem(PROFILE_KEY);

    if (!stored) return {};

    const parsed = JSON.parse(stored);

    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch {
    return {};
  }
}

function StudentSettings() {
  const { user, loading, refreshUser } = useAuth();

  if (loading) {
    return (
      <main className="student-settings-page page-container">
        <p>Loading your account settings...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="student-settings-page page-container">
        <p>Please log in to manage your account settings.</p>
      </main>
    );
  }

  return (
    <StudentSettingsContent
      key={user._id || user.id || user.email}
      user={user}
      refreshUser={refreshUser}
    />
  );
}

function StudentSettingsContent({ user, refreshUser }) {
  const [profile, setProfile] = useState(() => {
    const stored = readStoredProfile();

    return {
      fullName: user.name || user.fullName || stored.fullName || "",
      email: user.email || "",
      phone: stored.phone || "",
      country: stored.country || "Nigeria",
      bio: stored.bio || "",
    };
  });

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
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [preferencesSaving, setPreferencesSaving] = useState(false);

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

  async function saveProfile(event) {
    event.preventDefault();

    if (profileSaving) return;

    const fullName = profile.fullName.trim();

    if (fullName.length < 2 || fullName.length > 80) {
      setNotice({
        type: "error",
        text: "Your name must contain between 2 and 80 characters.",
      });
      return;
    }

    setProfileSaving(true);
    setNotice(null);

    try {
      await updateUserProfile({ name: fullName });

      let localDetailsSaved = false;

      try {
        localStorage.setItem(
          PROFILE_KEY,
          JSON.stringify({
            fullName,
            email: user.email || "",
            phone: profile.phone.trim(),
            country: profile.country.trim(),
            bio: profile.bio.trim(),
          })
        );

        localDetailsSaved = true;
      } catch {
        // Optional details cannot be persisted if local storage fails.
      }

      setProfile((current) => ({
        ...current,
        fullName,
        email: user.email || "",
        phone: current.phone.trim(),
        country: current.country.trim(),
        bio: current.bio.trim(),
      }));

      try {
        await refreshUser();
      } catch {
        // The account update may already have succeeded.
      }

      setNotice({
        type: localDetailsSaved ? "success" : "error",
        text: localDetailsSaved
          ? "Your account name has been updated. Phone, country, and bio are saved in this browser only."
          : "Your account name was updated, but the optional profile details could not be saved locally.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text: error.message || "Unable to update your account name.",
      });
    } finally {
      setProfileSaving(false);
    }
  }

  function savePreferences() {
    if (preferencesSaving) return;

    setPreferencesSaving(true);
    setNotice(null);

    try {
      localStorage.setItem(
        PREFERENCES_KEY,
        JSON.stringify(preferences)
      );

      setNotice({
        type: "success",
        text: "Your notification preferences have been saved in this browser. They are not synchronized with the academy server.",
      });
    } catch {
      setNotice({
        type: "error",
        text: "Your preferences could not be saved in this browser.",
      });
    } finally {
      setPreferencesSaving(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();

    if (passwordSaving) return;

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      setNotice({
        type: "error",
        text: "Complete all password fields.",
      });
      return;
    }

    if (passwords.next.length < 8 || passwords.next.length > 72) {
      setNotice({
        type: "error",
        text: "Your new password must contain between 8 and 72 characters.",
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

    if (passwords.current === passwords.next) {
      setNotice({
        type: "error",
        text: "Choose a new password different from your current password.",
      });
      return;
    }

    setPasswordSaving(true);
    setNotice(null);

    try {
      const result = await changeUserPassword({
        currentPassword: passwords.current,
        newPassword: passwords.next,
      });

      setPasswords({
        current: "",
        next: "",
        confirm: "",
      });

      setNotice({
        type: "success",
        text: result.message || "Your password has been changed successfully.",
      });
    } catch (error) {
      setNotice({
        type: "error",
        text:
          error.message ||
          "Unable to change your password. Please try again.",
      });
    } finally {
      setPasswordSaving(false);
    }
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
              {(profile.fullName.trim() || "S")
                .charAt(0)
                .toUpperCase()}
            </div>

            <h2>{profile.fullName.trim() || "Student Account"}</h2>

            <p>{profile.email || "No account email available"}</p>

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
                  className={activeSection === section.id ? "active" : ""}
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
                  <p className="home-section-eyebrow">PERSONAL DETAILS</p>
                  <h2>Personal Information</h2>
                  <p>
                    Update the information associated with your student
                    profile.
                  </p>
                </div>

                <UserRound size={25} />
              </div>

              <form
                className="student-settings-form"
                onSubmit={saveProfile}
              >
                <div className="student-settings-field">
                  <label htmlFor="student-full-name">Full name</label>
                  <input
                    id="student-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={profile.fullName}
                    onChange={updateProfile}
                    placeholder="Enter your full name"
                    minLength={2}
                    maxLength={80}
                    required
                  />
                </div>

                <div className="student-settings-field">
                  <label htmlFor="student-email">Email address</label>
                  <input
                    id="student-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={profile.email}
                    readOnly
                    aria-describedby="student-email-note"
                  />
                  <small id="student-email-note">
                    Email changes are not supported by the current account API.
                  </small>
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
                    Phone, country, and bio are saved in this browser only.
                  </p>

                  <button
                    type="submit"
                    className="student-settings-save-button"
                    disabled={profileSaving}
                  >
                    <Save size={17} />
                    {profileSaving ? "Saving Profile..." : "Save Profile"}
                  </button>
                </div>
              </form>
            </article>
          )}

          {activeSection === "security" && (
            <article className="student-settings-panel">
              <div className="student-settings-panel-heading">
                <div>
                  <p className="home-section-eyebrow">ACCOUNT PROTECTION</p>
                  <h2>Password & Security</h2>
                  <p>
                    Keep your account protected with a strong, unique password.
                  </p>
                </div>

                <ShieldCheck size={25} />
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
                        maxLength={72}
                        required
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPasswords((current) => !current)
                        }
                        aria-label={
                          showPasswords ? "Hide passwords" : "Show passwords"
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
                    Passwords are never saved by this page.
                  </p>

                  <button
                    type="submit"
                    className="student-settings-save-button"
                    disabled={passwordSaving}
                  >
                    <ShieldCheck size={17} />
                    {passwordSaving
                      ? "Updating Password..."
                      : "Change Password"}
                  </button>
                </div>
              </form>
            </article>
          )}

          {activeSection === "notifications" && (
            <article className="student-settings-panel">
              <div className="student-settings-panel-heading">
                <div>
                  <p className="home-section-eyebrow">STAY INFORMED</p>
                  <h2>Notification Preferences</h2>
                  <p>
                    Choose which learning updates you would like enabled for
                    your account.
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
                      checked={Boolean(preferences[item.id])}
                      onChange={() => updatePreference(item.id)}
                    />
                  </label>
                ))}
              </div>

              <div className="student-settings-form-footer">
                <p>
                  <Bell size={16} />
                  Preferences are stored in this browser, not on the server.
                </p>

                <button
                  type="button"
                  className="student-settings-save-button"
                  onClick={savePreferences}
                  disabled={preferencesSaving}
                >
                  <Save size={17} />
                  {preferencesSaving ? "Saving..." : "Save Preferences"}
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