import { useState } from "react";
import { Mail, MessageCircle, Send, CheckCircle2 } from "lucide-react";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "General inquiry",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <p className="contact-eyebrow">WE'RE HERE TO HELP</p>
        <h1>
          Let's start a
          <span>conversation.</span>
        </h1>
        <p>
          Have a question about the academy, courses, or your learning journey?
          Send us a message.
        </p>
      </section>

      <section className="contact-content">
        <div className="contact-information">
          <p className="contact-eyebrow">GET IN TOUCH</p>
          <h2>How can we help?</h2>
          <p>
            Share your question with us. We're working toward a learning
            experience that makes education easier to explore and access.
          </p>

          <div className="contact-info-card">
            <span><Mail size={21} /></span>
            <div>
              <h3>Email inquiries</h3>
              <p>Use the contact form to send your message.</p>
            </div>
          </div>

          <div className="contact-info-card">
            <span><MessageCircle size={21} /></span>
            <div>
              <h3>Learning support</h3>
              <p>Tell us if you need help understanding how the academy works.</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact-success" role="status">
              <CheckCircle2 size={45} />
              <h2>Thank you for reaching out.</h2>
              <p>
                Your form passed the frontend demonstration. It has not been
                sent or saved because the backend is not connected yet.
              </p>
              <button
                type="button"
                className="contact-submit"
                onClick={() => {
                  setSubmitted(false);
                  setForm({
                    name: "",
                    email: "",
                    subject: "General inquiry",
                    message: "",
                  });
                }}
              >
                Write another message
              </button>
            </div>
          ) : (
            <>
              <h2>Send us a message</h2>
              <p className="contact-form-description">
                Complete the fields below.
              </p>

              <label htmlFor="contact-name">Full name</label>
              <input
                id="contact-name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />

              <label htmlFor="contact-email">Email address</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />

              <label htmlFor="contact-subject">What is your inquiry about?</label>
              <select
                id="contact-subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option>General inquiry</option>
                <option>Courses and learning</option>
                <option>Account support</option>
                <option>Business partnership</option>
                <option>Other</option>
              </select>

              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={5}
                required
              />

              <button className="contact-submit" type="submit">
                Submit Message <Send size={16} />
              </button>
              <p className="contact-form-note">
                Message delivery will be enabled during backend integration.
              </p>
            </>
          )}
        </form>
      </section>
    </div>
  );
}

export default Contact;
