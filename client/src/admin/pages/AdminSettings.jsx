import { useState } from "react";
import {
  Settings,
  Building2,
  Globe,
  BookOpen,
  Bell,
  Palette,
  Save,
  RotateCcw,
  CheckCircle2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import "./AdminSettings.css";

const defaultSettings = {
  academyName: "Roxy Billion Academy",
  description:
    "A learning platform helping people build practical skills for their future.",
  contactEmail: "support@roxybillionacademy.com",
  website: "https://roxybillionacademy.com",
  language: "English",
  timezone: "Africa/Lagos",
  dateFormat: "DD/MM/YYYY",
  defaultCourseStatus: "Draft",
  allowEnrollment: true,
  emailNotifications: true,
  newStudentAlerts: true,
  courseCompletionAlerts: false,
};

const sections = [
  { id: "profile", label: "Academy Profile", icon: Building2 },
  { id: "general", label: "General", icon: Globe },
  { id: "courses", label: "Course Settings", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeSection, setActiveSection] = useState("profile");
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);

  function updateSetting(name, value) {
    setSettings((current) => ({ ...current, [name]: value }));
    setSaved(false);
    setNotice("");
  }

  function saveSettings(event) {
    event.preventDefault();
    setSaved(true);
    setNotice("Settings saved for this demo session.");
  }

  function resetSettings() {
    setSettings(defaultSettings);
    setSaved(false);
    setNotice("Settings restored to their demo defaults.");
  }

  function renderToggle(name, title, description) {
    return (
      <div className="settings-toggle-row" key={name}>
        <div className="settings-toggle-copy">
          <strong>{title}</strong>
          <p>{description}</p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={settings[name]}
          aria-label={title}
          className={`settings-switch ${settings[name] ? "on" : ""}`}
          onClick={() => updateSetting(name, !settings[name])}
        >
          <span />
        </button>
      </div>
    );
  }

  return (
    <section className="admin-settings">
      <header className="settings-page-header">
        <div>
          <span className="settings-eyebrow">ADMINISTRATION</span>
          <h1>Settings</h1>
          <p>Manage your academy preferences and platform configuration.</p>
        </div>

        <div className="settings-header-icon">
          <Settings size={24} />
        </div>
      </header>

      <div className="settings-status-banner">
        <div className="settings-status-icon">
          <ShieldCheck size={20} />
        </div>
        <div>
          <strong>Academy configuration</strong>
          <p>Manage the preferences displayed across your admin workspace.</p>
        </div>
        <span className="settings-demo-badge">DEMO MODE</span>
      </div>

      <div className="settings-layout">
        <aside className="settings-navigation">
          <h2>SETTINGS MENU</h2>

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
                  setNotice("");
                }}
              >
                <Icon size={18} />
                <span>{section.label}</span>
              </button>
            );
          })}

          <div className="settings-nav-note">
            <ShieldCheck size={17} />
            <p>Your changes are local demo settings and are not sent to a server.</p>
          </div>
        </aside>

        <form className="settings-panel" onSubmit={saveSettings}>
          {activeSection === "profile" && (
            <>
              <div className="settings-panel-heading">
                <div className="settings-panel-heading-icon">
                  <Building2 size={20} />
                </div>
                <div>
                  <h2>Academy Profile</h2>
                  <p>Manage your academy's public identity and contact details.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label className="settings-field full">
                  <span>Academy name</span>
                  <input
                    value={settings.academyName}
                    onChange={(event) =>
                      updateSetting("academyName", event.target.value)
                    }
                    required
                  />
                </label>

                <label className="settings-field full">
                  <span>Academy description</span>
                  <textarea
                    rows={4}
                    value={settings.description}
                    onChange={(event) =>
                      updateSetting("description", event.target.value)
                    }
                    required
                  />
                </label>

                <label className="settings-field">
                  <span>Contact email</span>
                  <div className="settings-input-with-icon">
                    <Mail size={16} />
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(event) =>
                        updateSetting("contactEmail", event.target.value)
                      }
                      required
                    />
                  </div>
                </label>

                <label className="settings-field">
                  <span>Website URL</span>
                  <input
                    type="url"
                    value={settings.website}
                    onChange={(event) =>
                      updateSetting("website", event.target.value)
                    }
                  />
                </label>
              </div>
            </>
          )}

          {activeSection === "general" && (
            <>
              <div className="settings-panel-heading">
                <div className="settings-panel-heading-icon">
                  <Globe size={20} />
                </div>
                <div>
                  <h2>General Settings</h2>
                  <p>Choose how dates, language, and time are displayed.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label className="settings-field">
                  <span>Platform language</span>
                  <select
                    value={settings.language}
                    onChange={(event) =>
                      updateSetting("language", event.target.value)
                    }
                  >
                    <option>English</option>
                    <option>French</option>
                    <option>Portuguese</option>
                  </select>
                </label>

                <label className="settings-field">
                  <span>Timezone</span>
                  <select
                    value={settings.timezone}
                    onChange={(event) =>
                      updateSetting("timezone", event.target.value)
                    }
                  >
                    <option value="Africa/Lagos">Africa/Lagos (WAT)</option>
                    <option value="Europe/London">Europe/London</option>
                    <option value="America/New_York">America/New_York</option>
                  </select>
                </label>

                <label className="settings-field full">
                  <span>Date format</span>
                  <select
                    value={settings.dateFormat}
                    onChange={(event) =>
                      updateSetting("dateFormat", event.target.value)
                    }
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </label>
              </div>
            </>
          )}

          {activeSection === "courses" && (
            <>
              <div className="settings-panel-heading">
                <div className="settings-panel-heading-icon">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h2>Course Settings</h2>
                  <p>Configure default behaviour for course publishing and enrollment.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label className="settings-field full">
                  <span>Default course status for new courses</span>
                  <select
                    value={settings.defaultCourseStatus}
                    onChange={(event) =>
                      updateSetting("defaultCourseStatus", event.target.value)
                    }
                  >
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <small>
                    This is a demo preference; it does not change the Courses page.
                  </small>
                </label>
              </div>

              <div className="settings-toggle-list">
                {renderToggle(
                  "allowEnrollment",
                  "Allow student enrollment",
                  "Enable the enrollment option in this demo configuration."
                )}
              </div>
            </>
          )}

          {activeSection === "notifications" && (
            <>
              <div className="settings-panel-heading">
                <div className="settings-panel-heading-icon">
                  <Bell size={20} />
                </div>
                <div>
                  <h2>Notifications</h2>
                  <p>Choose which events you would like to be notified about.</p>
                </div>
              </div>

              <div className="settings-toggle-list">
                {renderToggle(
                  "emailNotifications",
                  "Email notifications",
                  "Enable the general email notification preference."
                )}

                {renderToggle(
                  "newStudentAlerts",
                  "New student alerts",
                  "Show a preference for alerts when students join the academy."
                )}

                {renderToggle(
                  "courseCompletionAlerts",
                  "Course completion alerts",
                  "Show a preference for completed courses."
                )}
              </div>
            </>
          )}

          {activeSection === "appearance" && (
            <>
              <div className="settings-panel-heading">
                <div className="settings-panel-heading-icon">
                  <Palette size={20} />
                </div>
                <div>
                  <h2>Appearance</h2>
                  <p>Preview the visual identity used by the academy admin.</p>
                </div>
              </div>

              <div className="settings-brand-preview">
                <div className="settings-brand-logo">RB</div>
                <div>
                  <strong>{settings.academyName || "Your Academy"}</strong>
                  <p>LEARN. BUILD. GROW.</p>
                </div>
              </div>

              <div className="settings-color-grid">
                <div>
                  <span className="settings-color-swatch navy" />
                  <strong>Deep Navy</strong>
                  <small>#071326</small>
                </div>

                <div>
                  <span className="settings-color-swatch gold" />
                  <strong>Academy Gold</strong>
                  <small>#E8BD62</small>
                </div>

                <div>
                  <span className="settings-color-swatch white" />
                  <strong>White</strong>
                  <small>#F5F7FB</small>
                </div>
              </div>

              <p className="settings-appearance-note">
                Brand colors are shown for preview only and cannot be changed here.
              </p>
            </>
          )}

          <div className="settings-form-footer">
            <div className="settings-feedback" role="status">
              {notice && (
                <>
                  <CheckCircle2 size={16} />
                  <span>{notice}</span>
                </>
              )}
            </div>

            <div className="settings-form-actions">
              <button
                type="button"
                className="settings-reset-button"
                onClick={resetSettings}
              >
                <RotateCcw size={15} />
                Reset
              </button>

              <button type="submit" className="settings-save-button">
                <Save size={16} />
                {saved ? "Saved" : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
