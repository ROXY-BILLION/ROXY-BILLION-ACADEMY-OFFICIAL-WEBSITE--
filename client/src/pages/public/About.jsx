import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Target,
  Users,
  Globe,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import "./About.css";

const values = [
  {
    icon: BookOpen,
    title: "Lifelong Learning",
    description:
      "We believe learning is an ongoing journey that helps people grow, adapt, and discover new possibilities.",
  },
  {
    icon: Users,
    title: "Learner First",
    description:
      "We aim to create an approachable learning experience that respects different goals, backgrounds, and learning speeds.",
  },
  {
    icon: Lightbulb,
    title: "Curiosity & Discovery",
    description:
      "We encourage learners to ask questions, explore unfamiliar subjects, and develop their own ideas.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Responsibility",
    description:
      "We value clear learning materials, responsible education, and a commitment to continually improving the experience.",
  },
  {
    icon: HeartHandshake,
    title: "Opportunity for Growth",
    description:
      "We want learners to find opportunities to build knowledge, strengthen skills, and work towards their ambitions.",
  },
  {
    icon: Globe,
    title: "Broad Perspectives",
    description:
      "We welcome learning across disciplines because knowledge from different fields can enrich everyday life.",
  },
];

const principles = [
  {
    number: "01",
    title: "Make learning approachable",
    description:
      "Present learning opportunities in a clear, organised way so learners can identify their next step.",
  },
  {
    number: "02",
    title: "Encourage practical progress",
    description:
      "Support learning through lessons, exercises, assessments, and opportunities to apply knowledge.",
  },
  {
    number: "03",
    title: "Celebrate continuous improvement",
    description:
      "Help learners recognise their progress and stay motivated as they develop new abilities.",
  },
];

function About() {
  return (
    <div className="academy-about">
      <section className="about-hero">
        <div className="about-hero-content">
          <p className="about-eyebrow">
            <Sparkles size={15} />
            ABOUT ROXY BILLION ACADEMY
          </p>

          <h1>
            Education that opens
            <span> doors to possibility.</span>
          </h1>

          <p className="about-hero-description">
            Roxy Billion Academy is built around a simple belief: everyone
            should have opportunities to discover knowledge, develop useful
            skills, and move closer to their goals.
          </p>

          <div className="about-hero-actions">
            <Link to="/courses" className="about-button about-button-primary">
              Explore Courses <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="about-button about-button-secondary">
              Contact Our Team
            </Link>
          </div>
        </div>

        <div className="about-hero-visual">
          <div className="about-visual-ring about-ring-one" />
          <div className="about-visual-ring about-ring-two" />

          <div className="about-visual-card">
            <div className="about-visual-emblem">
              <GraduationCap size={54} strokeWidth={1.5} />
            </div>
            <p>KNOWLEDGE</p>
            <h2>Creates Possibilities</h2>
            <span>Discover · Learn · Grow</span>
          </div>

          <div className="about-floating-note about-note-top">
            <Compass size={20} />
            <span>Explore your potential</span>
          </div>

          <div className="about-floating-note about-note-bottom">
            <TrendingUp size={20} />
            <span>Keep moving forward</span>
          </div>
        </div>
      </section>

      <section className="about-purpose-section">
        <div className="about-purpose-heading">
          <p className="about-section-eyebrow">OUR PURPOSE</p>
          <h2>
            Learning should be a journey of <span>growth.</span>
          </h2>
        </div>

        <div className="about-purpose-copy">
          <p>
            Education can create new perspectives, strengthen confidence, and
            help people make informed decisions. We are building Roxy Billion
            Academy to bring different learning opportunities together in one
            organised, accessible experience.
          </p>
          <p>
            Whether someone wants to strengthen an existing ability, explore a
            new interest, or begin learning from the basics, our goal is to
            make the next step easier to find.
          </p>
        </div>
      </section>

      <section className="about-mission-section">
        <article className="about-mission-card">
          <div className="about-feature-icon">
            <Target size={27} />
          </div>
          <p className="about-section-eyebrow">OUR MISSION</p>
          <h2>Make learning more accessible and purposeful.</h2>
          <p>
            To provide an organised learning platform where people can explore
            different subjects, build knowledge, practise skills, and pursue
            personal, academic, and professional goals.
          </p>
        </article>

        <article className="about-vision-card">
          <div className="about-feature-icon">
            <Compass size={27} />
          </div>
          <p className="about-section-eyebrow">OUR VISION</p>
          <h2>Inspire a lifelong love of learning.</h2>
          <p>
            To grow into a trusted learning destination where curiosity is
            encouraged, progress is valued, and learners can continue
            discovering what they are capable of achieving.
          </p>
        </article>
      </section>

      <section className="about-values-section">
        <div className="about-centered-heading">
          <p className="about-section-eyebrow">WHAT GUIDES US</p>
          <h2>
            The values behind <span>every lesson.</span>
          </h2>
          <p>
            These principles shape the experience we want to create for every
            learner and every subject we introduce.
          </p>
        </div>

        <div className="about-values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="about-value-card" key={value.title}>
                <div className="about-value-icon">
                  <Icon size={24} strokeWidth={1.7} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="about-method-section">
        <div className="about-method-intro">
          <p className="about-section-eyebrow">HOW WE APPROACH LEARNING</p>
          <h2>
            A clearer path from <span>interest to progress.</span>
          </h2>
          <p>
            Learning looks different for everyone. We aim to provide a
            structured experience that helps learners understand what they
            are studying and identify their next step.
          </p>
        </div>

        <div className="about-principles">
          {principles.map((principle) => (
            <article className="about-principle" key={principle.number}>
              <span className="about-principle-number">
                {principle.number}
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </div>
              <ArrowRight size={20} className="about-principle-arrow" />
            </article>
          ))}
        </div>
      </section>

      <section className="about-commitment-section">
        <div className="about-commitment-icon">
          <GraduationCap size={38} />
        </div>
        <p className="about-section-eyebrow">OUR COMMITMENT</p>
        <h2>
          Every new skill begins with <span>a first step.</span>
        </h2>
        <p>
          We are building an academy that encourages exploration, supports
          consistent effort, and helps learners approach their ambitions with
          confidence. The journey begins with a willingness to learn.
        </p>

        <div className="about-commitment-actions">
          <Link to="/courses" className="about-button about-button-primary">
            Start Exploring <ArrowRight size={18} />
          </Link>
          <Link to="/contact" className="about-button about-button-secondary">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
