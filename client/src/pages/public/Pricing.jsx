import { Link } from "react-router-dom";
import {
  Check,
  Crown,
  GraduationCap,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import "./Pricing.css";

const plans = [
  {
    id: "free",
    name: "Free",
    description: "Start learning and discover what you can achieve.",
    price: "₦0",
    period: "forever",
    icon: GraduationCap,
    featured: false,
    features: [
      "Access to selected free courses",
      "Structured lessons and learning resources",
      "Practice exercises and quizzes where available",
      "Track your learning progress",
      "Text-based AI Guide with usage limits",
      "No payment card required",
    ],
    buttonText: "Get started free",
    link: "/register",
  },
  {
    id: "premium",
    name: "Premium",
    description: "Build skills with more learning opportunities.",
    price: "₦7,500",
    period: "per month",
    icon: Crown,
    featured: true,
    features: [
      "Access to eligible Premium courses",
      "More lessons and practice opportunities",
      "Course assessments where available",
      "Certificates for eligible completed courses",
      "Expanded AI Guide access within plan limits",
      "Progress tracking across your learning",
    ],
    buttonText: "Choose Premium",
    link: "/register?plan=premium",
  },
  {
    id: "premium-plus",
    name: "Premium Plus",
    description: "Get an enhanced learning experience.",
    price: "₦18,000",
    period: "per month",
    icon: Sparkles,
    featured: false,
    features: [
      "Everything included in Premium",
      "Access to eligible Premium Plus courses",
      "Additional learning resources",
      "More AI Guide usage within plan limits",
      "Advanced learning and practice opportunities",
      "A broader learning experience across subjects",
    ],
    buttonText: "Choose Premium Plus",
    link: "/register?plan=premium-plus",
  },
];

function Pricing() {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero-content">
          <span className="pricing-eyebrow">
            SIMPLE PLANS. MEANINGFUL PROGRESS.
          </span>

          <h1>
            Invest in your <span>next chapter.</span>
          </h1>

          <p>
            Whether you want to explore a new subject, develop practical
            skills, or continue your education, choose a plan that fits
            your learning goals.
          </p>

          <div className="pricing-trust">
            <span>
              <ShieldCheck size={17} />
              Start with Free
            </span>
            <span>
              <GraduationCap size={17} />
              Learn across subjects
            </span>
          </div>
        </div>
      </section>

      <section className="pricing-plans-section">
        <div className="pricing-section-heading">
          <span className="pricing-eyebrow">MEMBERSHIP OPTIONS</span>
          <h2>Choose how you want to learn</h2>
          <p>
            Start for free and explore the academy before deciding whether
            a paid plan is right for you.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => {
            const PlanIcon = plan.icon;

            return (
              <article
                className={`pricing-card ${
                  plan.featured ? "pricing-card-featured" : ""
                }`}
                key={plan.id}
              >
                {plan.featured && (
                  <div className="pricing-popular-label">
                    <Sparkles size={14} />
                    Popular choice
                  </div>
                )}

                <div className="pricing-plan-icon">
                  <PlanIcon size={23} />
                </div>

                <h3>{plan.name}</h3>

                <p className="pricing-plan-description">
                  {plan.description}
                </p>

                <div className="pricing-price">
                  <strong>{plan.price}</strong>
                  <span>{plan.period}</span>
                </div>

                <div className="pricing-card-divider" />

                <p className="pricing-features-heading">
                  What&apos;s included
                </p>

                <ul className="pricing-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className="pricing-check">
                        <Check size={15} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link className="pricing-plan-button" to={plan.link}>
                  {plan.buttonText}
                  <ArrowRight size={17} />
                </Link>
              </article>
            );
          })}
        </div>

        <p className="pricing-note">
          Premium prices are proposed planning figures, not confirmed
          launch prices. Paid subscriptions and payments are not active yet.
          Course availability and included features may vary.
        </p>
      </section>

      <section className="pricing-help-section">
        <div className="pricing-help-content">
          <div>
            <span className="pricing-eyebrow">NEED MORE INFORMATION?</span>
            <h2>Not sure which plan is right for you?</h2>
            <p>
              Tell us what you want to learn, and we can help you understand
              the available options.
            </p>
          </div>

          <Link to="/contact" className="pricing-help-button">
            Contact our team
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
