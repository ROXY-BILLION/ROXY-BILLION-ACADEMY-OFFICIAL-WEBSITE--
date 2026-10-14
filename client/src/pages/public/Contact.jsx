import { useState } from "react";
import {
  Mail,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import "./Contact.css";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setStatus({
        type: "error",
        message: "Please complete all fields before continuing.",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setStatus({
      type: "success",
      message:
        "Your form passed validation. Message delivery will be enabled when the backend contact workflow is connected.",
    });

    setForm(initialForm);
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-eyebrow">WE'RE HERE TO HELP</span>

          <h1>
            Let's start a <span>conversation.</span>
          </h1>

          <p>
            Have a question about courses, learning opportunities, or
            the academy? Send us a message and let us know how we can help.
          </p>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-layout">
          <aside className="contact-information">
            <span className="contact-eyebrow">GET IN TOUCH</span>

            <h2>How can we help you?</h2>

            <p className="contact-information-description">
              Whether you're exploring your first course or looking for
              more information, we're happy to hear from you.
            </p>

            <div className="contact-information-list">
              <div className="contact-information-item">
                <div className="contact-information-icon">
                  <Mail size={21} />
                </div>

                <div>
                  <h3>Email support</h3>
                  <p>
                    Send us your questions using the contact form.
                  </p>
                </div>
              </div>

              <div className="contact-information-item">
                <div className="contact-information-icon">
                  <MessageCircle size={21} />
                </div>

                <div>
                  <h3>Learning enquiries</h3>
                  <p>
                    Ask about courses, access, and learning opportunities.
                  </p>
                </div>
              </div>

              <div className="contact-information-item">
                <div className="contact-information-icon">
                  <Clock size={21} />
                </div>

                <div>
                  <h3>Response times</h3>
                  <p>
                    We aim to respond as soon as our support workflow is
                    available.
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-information-note">
              <span className="contact-note-icon">
                <CheckCircle size={19} />
              </span>

              <p>
                Your learning journey matters. Include enough detail in
                your message so we can understand your enquiry.
              </p>
            </div>
          </aside>

          <div className="contact-form-card">
            <div className="contact-form-heading">
              <span className="contact-eyebrow">SEND A MESSAGE</span>
              <h2>How can we assist you?</h2>
              <p>Complete the form below to prepare your enquiry.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-subject">Subject</label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose a subject</option>
                  <option value="Course enquiries">Course enquiries</option>
                  <option value="Account support">Account support</option>
                  <option value="Membership and pricing">
                    Membership and pricing
                  </option>
                  <option value="Technical support">Technical support</option>
                  <option value="Partnerships">Partnerships</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help..."
                  rows={6}
                  required
                />
              </div>

              {status.message && (
                <div
                  className={`contact-status contact-status-${status.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.type === "success" ? (
                    <CheckCircle size={19} />
                  ) : (
                    <AlertCircle size={19} />
                  )}

                  <p>{status.message}</p>
                </div>
              )}

              <button className="contact-submit-button" type="submit">
                Validate message
                <Send size={17} />
              </button>

              <p className="contact-form-disclaimer">
                This form currently validates your information in the
                browser. It does not send or store messages yet.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-bottom-section">
        <div>
          <span className="contact-eyebrow">YOUR NEXT STEP STARTS HERE</span>
          <h2>Ready to explore new possibilities?</h2>
          <p>
            Discover learning opportunities designed to help you grow
            across different subjects and interests.
          </p>
        </div>

        <a className="contact-explore-link" href="/courses">
          Explore courses
          <ArrowRight size={17} />
        </a>
      </section>
    </div>
  );
}

export default Contact;
