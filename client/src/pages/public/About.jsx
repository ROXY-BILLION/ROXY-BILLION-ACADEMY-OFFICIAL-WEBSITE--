import { Link } from "react-router-dom";
import {
  ArrowRight,
  Compass,
  HeartHandshake,
  Lightbulb,
  Target,
  BookOpen,
} from "lucide-react";
import "./About.css";

const values = [
  {
    icon: BookOpen,
    title: "Accessible knowledge",
    description: "Learning opportunities should help people from different backgrounds explore subjects and develop their abilities.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity and discovery",
    description: "We encourage learners to ask questions, explore ideas, and build understanding beyond familiar subjects.",
  },
  {
    icon: Target,
    title: "Purposeful progress",
    description: "Clear learning goals and structured activities can help learners turn curiosity into meaningful progress.",
  },
  {
    icon: HeartHandshake,
    title: "Supportive learning",
    description: "A positive learning experience should respect individual goals, encourage persistence, and welcome growth.",
  },
];

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <p className="about-eyebrow">ABOUT ROXY BILLION ACADEMY</p>
        <h1>
          Education for a world
          <span>full of possibilities.</span>
        </h1>
        <p>
          We are building a learning platform where people can discover
          knowledge, develop useful skills, and explore subjects that
          matter to their personal and professional journeys.
        </p>
      </section>

      <section className="about-story">
        <div className="about-story-symbol">
          <Compass size={52} strokeWidth={1.2} />
        </div>

        <div>
          <p className="about-eyebrow">OUR PURPOSE</p>
          <h2>A place to keep learning, whatever your ambition.</h2>
          <p>
            Education reaches far beyond one profession or industry.
            It can help someone understand money, start a business,
            learn a language, explore creative work, strengthen digital
            skills, or simply discover a new interest.
          </p>
          <p>
            Roxy Billion Academy is being developed to bring diverse
            learning opportunities together in one accessible place,
            with a focus on clear explanations, structured lessons,
            and opportunities to practise what you learn.
          </p>
        </div>
      </section>

      <section className="about-values-section">
        <div className="about-section-heading">
          <p className="about-eyebrow">WHAT GUIDES US</p>
          <h2>Learning built around people and progress.</h2>
        </div>

        <div className="about-values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="about-value-card" key={value.title}>
                <span className="about-value-icon">
                  <Icon size={24} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-cta">
        <h2>Curiosity is a great place to start.</h2>
        <p>Explore the learning opportunities and find a subject that interests you.</p>
        <Link to="/courses" className="home-button home-button-primary">
          Explore Courses <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default About;
