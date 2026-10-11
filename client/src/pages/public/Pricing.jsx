import { Link } from "react-router-dom";
import { Check, ArrowRight, Sparkles,  Video,} from "lucide-react";
import "./Pricing.css";

const plans = [
  {
    name: "Free",
    subtitle: "Start your learning journey",
    price: "₦0",
    period: "forever",
    description: "Explore learning and build your knowledge at your own pace.",
    features: [
      "Text-based lessons",
      "Access to available Free courses",
      "Text questions for the AI Guide",
      "Guided project coaching",
      "Practice activities and assessments",
    ],
    action: "Start Learning Free",
    to: "/register",
    featured: true,
  },
  {
    name: "Premium",
    subtitle: "A richer learning experience",
    price: "Coming soon",
    period: "planned plan",
    description: "An expanded learning experience for students who want more.",
    features: [
      "Planned video lessons",
      "Text and voice AI questions",
      "Expanded learning support",
      "Ad-free learning experience",
    ],
    action: "Explore the Plan",
    to: "/contact",
    featured: false,
  },
  {
    name: "Premium Plus",
    subtitle: "A more interactive experience",
    price: "Coming soon",
    period: "planned plan",
    description: "A future plan with additional interactive learning features.",
    features: [
      "Planned Premium features",
      "AI teacher/avatar experience",
      "More interactive learning support",
      "Expanded learning tools",
    ],
    action: "Learn More",
    to: "/contact",
    featured: false,
  },
];

function Pricing() {
  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <p className="pricing-eyebrow">LEARNING PLANS</p>
        <h1>
          Choose how you
          <span>want to learn.</span>
        </h1>
        <p>
          Start with Free learning. Future plans are being designed
          to offer additional ways to learn, practise, and interact.
        </p>
      </section>

      <section className="pricing-grid">
        {plans.map((plan) => (
          <article
            className={`pricing-card ${plan.featured ? "pricing-card-featured" : ""}`}
            key={plan.name}
          >
            {plan.featured && (
              <div className="pricing-featured-label">
                <Sparkles size={14} />
                AVAILABLE FIRST
              </div>
            )}

            <p className="pricing-card-subtitle">{plan.subtitle}</p>
            <h2>{plan.name}</h2>

            <div className="pricing-price">
              <strong>{plan.price}</strong>
              <span>{plan.period}</span>
            </div>

            <p className="pricing-description">{plan.description}</p>

            <div className="pricing-divider" />

            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              to={plan.to}
              className={`pricing-action ${plan.featured ? "pricing-action-primary" : ""}`}
            >
              {plan.action} <ArrowRight size={16} />
            </Link>
          </article>
        ))}
      </section>

      <section className="pricing-note">
        <div className="pricing-note-icon">
          <Video size={23} />
        </div>
        <div>
          <h3>Future learning features</h3>
          <p>
            Premium video lessons, voice interaction, and the Premium Plus
            AI teacher are planned features. They are not available for
            purchase in this initial Free release.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Pricing;
