import { Link } from "react-router-dom";

function PlaceholderPage({ title, description, backTo = "/" }) {
  return (
    <section className="placeholder-page">
      <p className="placeholder-eyebrow">
        ROXY BILLION ACADEMY
      </p>

      <h1>{title}</h1>

      <p className="placeholder-description">
        {description}
      </p>

      <Link className="placeholder-link" to={backTo}>
        Return to home
      </Link>
    </section>
  );
}

export default PlaceholderPage;