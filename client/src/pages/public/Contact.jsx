import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Send,
  ShieldCheck,
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
  const [feedback, setFeedback] = useState({
    type: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (feedback.message) {
      setFeedback({ type: "", message: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const subject = form.subject.trim();
    const message = form.message.trim();

    if (!name || !email || !subject || !message) {
      setFeedback({
        type: "error",
        message: "Please complete every field before continuing.",
      });
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message:
        "Your form passed validation. Actual message delivery will be enabled when the backend is connected.",
    });
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-container contact-hero-grid">
          <div className="contact-hero-copy">
            <p className="contact-eyebrow">
              <MessageCircle size={16} />
              WE'RE HERE TO HELP
            </p>

            <h1>
              Let's start a <span>conversation.</span>
            </h1>

            <p className="contact-hero-description">
              Have a question about our courses, learning experience, or
              academy? Reach out to us. We would love to hear from you.
            </p>

            <div className="contact-hero-actions">
              <a href="#contact-form" className="contact-primary-button">
                Send a message
                <ArrowRight size={18} />
              </a>

              <Link to="/courses" className="contact-secondary-button">
                Explore courses
              </Link>
            </div>

            <div className="contact-trust-note">
              <ShieldCheck size={19} />
              <span>Your information should be shared securely.</span>
            </div>
          </div>

          <div className="contact-hero-card">
            <div className="contact-card-icon">
              <Mail size={28} />
            </div>

            <p className="contact-card-label">YOUR VOICE MATTERS</p>

            <h2>Every question is a step forward.</h2>

            <p>
              Whether you're a prospective student, a current learner, or
              someone interested in working with us, we're ready to listen.
            </p>

            <div className="contact-card-bottom">
              <span className="contact-card-dot" />
              <span>Learning starts with connection.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-main-section">
        <div className="contact-container contact-main-grid">
          <div className="contact-information">
            <p className="contact-eyebrow">GET IN TOUCH</p>

            <h2>How can we help you?</h2>

            <p className="contact-information-description">
              Send us your question or feedback using the form. Choose a
              subject that best describes what you need help with.
            </p>

            <div className="contact-information-item">
              <div className="contact-information-icon">
                <MessageCircle size={21} />
              </div>

              <div>
                <h3>General enquiries</h3>
                <p>
                  Questions about the academy, our mission, or learning
                  opportunities.
                </p>
              </div>
            </div>

            <div className="contact-information-item">
              <div className="contact-information-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3>Student support</h3>
                <p>
                  Help with courses, your account, learning progress, or
                  assessments.
                </p>
              </div>
            </div>

            <div className="contact-information-note">
              <strong>Before you send</strong>
              <p>
                Please avoid including passwords, payment card details, or
                other sensitive information in your message.
              </p>
            </div>
          </div>

          <div className="contact-form-card" id="contact-form">
            <div className="contact-form-heading">
              <p className="contact-eyebrow">CONTACT OUR TEAM</p>
              <h2>Send us a message</h2>
              <p>Complete the fields below to prepare your enquiry.</p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name">Full name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    autoComplete="name"
                    maxLength={100}
                    required
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email">Email address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    autoComplete="email"
                    maxLength={254}
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
                  <option value="">Choose an enquiry subject</option>
                  <option value="General enquiry">General enquiry</option>
                  <option value="Courses and learning">
                    Courses and learning
                  </option>
                  <option value="Student support">Student support</option>
                  <option value="Account assistance">Account assistance</option>
                  <option value="Partnership">Partnership opportunity</option>
                  <option value="Feedback">Feedback or suggestion</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="contact-field">
                <label htmlFor="contact-message">Your message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell us how we can help..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  maxLength={3000}
                  required
                />

                <span className="contact-character-count">
                  {form.message.length}/3000 characters
                </span>
              </div>

              {feedback.message && (
                <div
                  className={`contact-feedback contact-feedback-${feedback.type}`}
                  role="status"
                  aria-live="polite"
                >
                  {feedback.message}
                </div>
              )}

              <button type="submit" className="contact-submit-button">
                Validate message
                <Send size={17} />
              </button>

              <p className="contact-form-disclaimer">
                This form currently runs in preview mode. Submitting it does
                not send or store your message.
              </p>
            </form>
          </div>
        </div>
      </section>

      <section className="contact-bottom-cta">
        <div className="contact-container contact-bottom-cta-inner">
          <div>
            <p className="contact-eyebrow">YOUR NEXT CHAPTER</p>
            <h2>Ready to discover something new?</h2>
            <p>
              Explore learning opportunities across different subjects and
              start building your knowledge.
            </p>
          </div>

          <Link to="/courses" className="contact-primary-button">
            Explore the academy
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Contact;
