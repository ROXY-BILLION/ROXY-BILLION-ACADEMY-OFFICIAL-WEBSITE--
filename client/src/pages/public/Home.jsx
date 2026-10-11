import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Calculator,
  Palette,
  Languages,
  Laptop,
  Heart,
  Compass,
  GraduationCap,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import "./Home.css";

const learningAreas = [
  {
    title: "Business & Entrepreneurship",
    description: "Develop business knowledge, entrepreneurial thinking, and practical management skills.",
    icon: BriefcaseBusiness,
    number: "01",
  },
  {
    title: "Finance & Personal Money",
    description: "Explore budgeting, financial literacy, planning, and responsible money management.",
    icon: Calculator,
    number: "02",
  },
  {
    title: "Technology & Digital Skills",
    description: "Discover software, digital tools, computing, and the modern technology landscape.",
    icon: Laptop,
    number: "03",
  },
  {
    title: "Languages & Communication",
    description: "Strengthen communication, language skills, writing, and expression.",
    icon: Languages,
    number: "04",
  },
  {
    title: "Creative Arts & Design",
    description: "Explore creativity, visual design, artistic expression, and creative practice.",
    icon: Palette,
    number: "05",
  },
  {
    title: "Personal Development",
    description: "Build productive habits, confidence, critical thinking, and lifelong learning skills.",
    icon: Heart,
    number: "06",
  },
];

const benefits = [
  "Learn at your own pace",
  "Explore different learning fields",
  "Practise through structured activities",
  "Build knowledge step by step",
];

function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="home-hero-copy">
            <p className="home-eyebrow">
              <Sparkles size={15} />
              YOUR NEXT CHAPTER STARTS HERE
            </p>

            <h1>
              Knowledge opens doors.
              <span>Learning moves you forward.</span>
            </h1>

            <p className="home-hero-description">
              Explore new subjects, develop useful skills, and discover
              new possibilities with an academy built for learners from
              different backgrounds and ambitions.
            </p>

            <div className="home-hero-actions">
              <Link to="/courses" className="home-button home-button-primary">
                Explore Courses <ArrowRight size={17} />
              </Link>

              <Link to="/about" className="home-button home-button-secondary">
                Discover Our Academy
              </Link>
            </div>

            <div className="home-hero-note">
              <CheckCircle2 size={17} />
              <span>Start with free learning</span>
            </div>
          </div>

          <div className="home-hero-art" aria-label="Learning and education">
            <div className="hero-art-orbit hero-art-orbit-one" />
            <div className="hero-art-orbit hero-art-orbit-two" />

            <div className="hero-art-main">
              <div className="hero-art-icon">
                <GraduationCap size={66} strokeWidth={1.2} />
              </div>

              <p className="hero-art-overline">A WORLD OF KNOWLEDGE</p>
              <h2>Find your path.</h2>
              <p>Discover. Learn. Grow.</p>
            </div>

            <div className="hero-floating-card hero-floating-top">
              <BookOpen size={20} />
              <span>Knowledge for life</span>
            </div>

            <div className="hero-floating-card hero-floating-bottom">
              <Compass size={20} />
              <span>Explore your potential</span>
            </div>
          </div>
        </div>

        <div className="home-hero-bottom">
          <span>BUSINESS</span>
          <span>TECHNOLOGY</span>
          <span>FINANCE</span>
          <span>CREATIVITY</span>
          <span>PERSONAL GROWTH</span>
        </div>
      </section>

      <section className="home-section home-areas">
        <div className="home-section-heading">
          <div>
            <p className="home-section-eyebrow">EXPAND YOUR HORIZONS</p>
            <h2>One academy. Many possibilities.</h2>
          </div>

          <p>
            Your interests can take you in different directions.
            Find subjects that match your goals and explore something new.
          </p>
        </div>

        <div className="home-area-grid">
          {learningAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article className="home-area-card" key={area.title}>
                <div className="home-area-card-top">
                  <span className="home-area-icon">
                    <Icon size={23} />
                  </span>
                  <span className="home-area-number">{area.number}</span>
                </div>

                <h3>{area.title}</h3>
                <p>{area.description}</p>

                <Link to="/courses" className="home-area-link">
                  Explore learning <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="home-dynamic-note">
          These are introductory learning areas. The full course catalogue
          and its categories will be managed dynamically.
        </p>
      </section>

      <section className="home-section home-approach">
        <div className="home-approach-copy">
          <p className="home-section-eyebrow">LEARNING THAT FITS YOUR JOURNEY</p>
          <h2>Education should help you move forward.</h2>
          <p>
            Whether you want to strengthen your professional knowledge,
            explore a personal interest, or learn something completely new,
            your journey begins with curiosity.
          </p>

          <Link to="/about" className="home-text-link">
            Learn about our approach <ArrowRight size={17} />
          </Link>
        </div>

        <div className="home-benefit-list">
          {benefits.map((benefit, index) => (
            <div className="home-benefit" key={benefit}>
              <span>0{index + 1}</span>
              <p>{benefit}</p>
              <CheckCircle2 size={20} />
            </div>
          ))}
        </div>
      </section>

      <section className="home-final-cta">
        <div className="home-final-cta-icon">
          <GraduationCap size={35} />
        </div>
        <p className="home-section-eyebrow">YOUR JOURNEY BEGINS WITH ONE STEP</p>
        <h2>Make room for what you could become.</h2>
        <p>
          Start exploring subjects, discover learning opportunities,
          and take the next step toward your goals.
        </p>
        <Link to="/register" className="home-button home-button-primary">
          Begin Your Journey <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default Home;
