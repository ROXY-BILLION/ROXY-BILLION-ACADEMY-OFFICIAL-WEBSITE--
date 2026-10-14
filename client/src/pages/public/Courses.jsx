import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Search,
  X,
} from "lucide-react";
import sampleCourses from "../../data/sampleCourses";
import "./Courses.css";

function getCourseArtClass(category) {
  if (category === "Business") {
    return "course-card-art-business";
  }

  if (category === "Science & Mathematics") {
    return "course-card-art-science";
  }

  if (category === "Creative Arts & Design") {
    return "course-card-art-design";
  }

  return "course-card-art-code";
}

function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => [
      "All",
      ...new Set(sampleCourses.map((course) => course.category)),
    ],
    []
  );

  const filteredCourses = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return sampleCourses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" ||
        course.category === selectedCategory;

      const matchesSearch =
        !search ||
        course.title.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search) ||
        course.category.toLowerCase().includes(search) ||
        course.level.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
  }

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="courses-hero-content">
          <span className="courses-eyebrow">
            EXPLORE OUR PROGRAMMES
          </span>

          <h1>
            Find the right course for your <span>next chapter.</span>
          </h1>

          <p>
            Explore learning opportunities across technology, business,
            mathematics, creative disciplines, and more as the academy grows.
          </p>

          <div className="courses-hero-stats">
            <div>
              <BookOpen size={19} />
              <span>
                {sampleCourses.length} learning programmes
              </span>
            </div>

            <div>
              <GraduationCap size={19} />
              <span>Different subject areas</span>
            </div>
          </div>

          <a
            href="#course-catalogue"
            className="courses-category-button active"
          >
            Explore courses
            <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section
        className="courses-catalogue"
        id="course-catalogue"
      >
        <div className="courses-section-heading">
          <div>
            <span className="courses-eyebrow">
              THE COURSE CATALOGUE
            </span>

            <h2>Explore available courses</h2>

            <p>
              Search the catalogue or choose a subject area to get started.
            </p>
          </div>

          <div className="courses-count">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
          </div>
        </div>

        <label className="courses-search">
          <Search size={19} />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by course, subject, or level..."
            aria-label="Search courses"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </label>

        <div className="courses-category-list">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                selectedCategory === category
                  ? "courses-category-button active"
                  : "courses-category-button"
              }
              onClick={() => setSelectedCategory(category)}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => (
              <article className="course-card" key={course.id}>
                <div
                  className={`course-card-art ${getCourseArtClass(
                    course.category
                  )}`}
                >
                  <div className="course-card-art-icon">
                    <BookOpen size={31} />
                  </div>

                  <span className="course-category-label">
                    {course.category}
                  </span>
                </div>

                <div className="course-card-body">
                  <div className="course-card-meta">
                    <span>{course.level}</span>
                    <span>{course.lessons} lessons</span>
                  </div>

                  <h3>{course.title}</h3>

                  <p className="course-card-description">
                    {course.description}
                  </p>

                  <div className="course-card-duration">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>

                  <Link
                    to={`/courses/${course.slug}`}
                    className="course-card-link"
                  >
                    <span>View course details</span>
                    <ArrowRight size={17} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="courses-empty-state">
            <div className="courses-empty-icon">
              <Search size={28} />
            </div>

            <h3>No courses found</h3>

            <p>
              Try another search term or choose a different category.
            </p>

            <button
              type="button"
              className="courses-reset-button"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="courses-preview-note">
          Course catalogue preview. Course enrolment, full lessons,
          assessments, and certificates will be connected in later stages.
        </p>
      </section>
    </div>
  );
}

export default Courses;