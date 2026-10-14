import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Users,
  Award,
  Compass,
  Laptop,
  BriefcaseBusiness,
  Globe,
  HeartPulse,
  Calculator,
  Palette,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import "./Home.css";

const learningAreas = [
  {
    icon: Laptop,
    title: "Technology & Digital Skills",
    description:
      "Explore software, digital tools, computing, and practical technology skills.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Business & Entrepreneurship",
    description:
      "Develop business knowledge, leadership, communication, and entrepreneurial thinking.",
  },
  {
    icon: Calculator,
    title: "Science & Mathematics",
    description:
      "Strengthen analytical thinking, numerical skills, and scientific understanding.",
  },
  {
    icon: Globe,
    title: "Languages & Communication",
    description:
      "Build confidence in writing, speaking, language learning, and communication.",
  },
  {
    icon: Palette,
    title: "Creative Arts & Design",
    description:
      "Discover creative expression, visual design, and new ways to communicate ideas.",
  },
  {
    icon: HeartPulse,
    title: "Personal Development",
    description:
      "Improve study habits, productivity, problem-solving, and lifelong learning.",
  },
];

const benefits = [
  {
    number: "01",
    title: "Learn at your own pace",
    description:
      "Build your knowledge around your schedule and return to your learning when you need to.",
  },
  {
    number: "02",
    title: "Focus on practical skills",
    description:
      "Work towards useful knowledge through structured lessons, exercises, and assessments.",
  },
  {
    number: "03",
    title: "Track your progress",
    description:
      "Keep your learning organised and see how far you have progressed through your courses.",
  },
];

function Home() {
  return (
    <div className="academy-home">
      <section className="home-hero">
        <div className="home-hero-content">
          <div className="home-eyebrow">
            <Sparkles size={15} />
            <span>YOUR JOURNEY TO KNOWLEDGE STARTS HERE</span>
          </div>

          <h1>
            Learn more.
            <br />
            <span>Become more.</span>
            <br />
            Achieve more.
          </h1>

          <p className="home-hero-description">
            Discover new subjects, develop valuable skills, and work towards
            your goals with Roxy Billion Academy — a learning community built
            for curiosity, growth, and opportunity.
          </p>

          <div className="home-hero-actions">
            <Link to="/courses" className="home-button home-button-primary">
              Explore Courses <ArrowRight size={18} />
            </Link>

            <Link to="/about" className="home-button home-button-secondary">
              Discover Our Academy
            </Link>
          </div>

          <div className="home-hero-trust">
            <CheckCircle2 size={17} />
            <span>
              Explore learning opportunities across different subjects
            </span>
          </div>
        </div>

        <div className="home-hero-visual" aria-label="Learning and education">
          <div className="home-visual-orbit home-orbit-one" />
          <div className="home-visual-orbit home-orbit-two" />

          <div className="home-visual-center">
            <div className="home-visual-logo">
              <GraduationCap size={54} strokeWidth={1.5} />
            </div>
            <span className="home-visual-kicker">ROXY BILLION</span>
            <strong>ACADEMY</strong>
            <p>Knowledge opens possibilities.</p>
          </div>

          <div className="home-floating-card home-floating-book">
            <span className="home-floating-icon">
              <BookOpen size={20} />
            </span>
            <span>
              <strong>Keep learning</strong>
              <small>One lesson at a time</small>
            </span>
          </div>

          <div className="home-floating-card home-floating-award">
            <span className="home-floating-icon">
              <Award size={20} />
            </span>
            <span>
              <strong>Build your skills</strong>
              <small>Celebrate your progress</small>
            </span>
          </div>
        </div>
      </section>

      <section className="home-value-strip" aria-label="Academy benefits">
        <div className="home-value-item">
          <BookOpen size={21} />
          <span>Structured Learning</span>
        </div>
        <div className="home-value-item">
          <Compass size={21} />
          <span>Explore New Subjects</span>
        </div>
        <div className="home-value-item">
          <Users size={21} />
          <span>Student-Focused</span>
        </div>
        <div className="home-value-item">
          <Award size={21} />
          <span>Progress & Achievement</span>
        </div>
      </section>

      <section className="home-section home-learning-section">
        <div className="home-section-heading">
          <div>
            <p className="home-section-eyebrow">EXPLORE YOUR POSSIBILITIES</p>
            <h2>
              One academy.
              <br />
              <span>Many ways to grow.</span>
            </h2>
          </div>

          <p className="home-section-description">
            Learning is not limited to one subject. Find an area that interests
            you, discover something new, and keep developing your potential.
          </p>
        </div>

        <div className="home-learning-grid">
          {learningAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article className="home-learning-card" key={area.title}>
                <div className="home-learning-icon">
                  <Icon size={25} strokeWidth={1.7} />
                </div>

                <h3>{area.title}</h3>
                <p>{area.description}</p>

                <Link to="/courses" className="home-card-link">
                  Explore learning <ArrowRight size={16} />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="home-section-action">
          <Link to="/courses" className="home-button home-button-outline">
            Browse Learning Opportunities <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="home-approach-section">
        <div className="home-approach-visual">
          <div className="home-approach-frame">
            <div className="home-approach-topline">
              <span className="home-status-dot" />
              <span>YOUR LEARNING JOURNEY</span>
            </div>

            <div className="home-approach-symbol">
              <GraduationCap size={68} strokeWidth={1.35} />
            </div>

            <div className="home-approach-line" />

            <div className="home-approach-step">
              <span>01</span>
              <div>
                <strong>Discover</strong>
                <small>Find a subject that interests you.</small>
              </div>
              <CheckCircle2 size={20} />
            </div>

            <div className="home-approach-step">
              <span>02</span>
              <div>
                <strong>Learn</strong>
                <small>Build knowledge through lessons.</small>
              </div>
              <CheckCircle2 size={20} />
            </div>

            <div className="home-approach-step">
              <span>03</span>
              <div>
                <strong>Grow</strong>
                <small>Practise, improve, and make progress.</small>
              </div>
              <ArrowRight size={20} />
            </div>
          </div>
        </div>

        <div className="home-approach-content">
          <p className="home-section-eyebrow">A BETTER WAY TO LEARN</p>
          <h2>
            Turn your curiosity into <span>real progress.</span>
          </h2>

          <p>
            Everyone has something new to learn. Our goal is to make the
            learning journey organised, approachable, and rewarding — whether
            you are beginning with the basics or developing existing skills.
          </p>

          <div className="home-benefit-list">
            {benefits.map((benefit) => (
              <div className="home-benefit" key={benefit.number}>
                <span className="home-benefit-number">{benefit.number}</span>
                <div>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          <Link to="/about" className="home-text-link">
            Learn about our mission <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="home-final-cta">
        <div className="home-final-cta-icon">
          <GraduationCap size={35} />
        </div>

        <p className="home-section-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>

        <h2>
          Your potential has no
          <span> single direction.</span>
        </h2>

        <p>
          Start exploring, choose what you want to learn, and take your next
          step with Roxy Billion Academy.
        </p>

        <div className="home-final-cta-actions">
          <Link to="/register" className="home-button home-button-primary">
            Get Started <ArrowRight size={18} />
          </Link>
          <Link to="/courses" className="home-button home-button-secondary">
            View Courses
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
