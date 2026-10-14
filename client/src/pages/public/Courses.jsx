
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  BookOpen,
  Clock,
  GraduationCap,
  Layers3,
} from "lucide-react";
import "./Courses.css";

const sampleCourses = [
  {
    id: 1,
    title: "HTML Fundamentals",
    slug: "html-fundamentals",
    category: "Technology",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 12,
    description:
      "Learn how web pages are structured and build a solid foundation in HTML.",
    icon: "code",
    featured: true,
  },
  {
    id: 2,
    title: "CSS and Web Design",
    slug: "css-and-web-design",
    category: "Technology",
    level: "Beginner",
    duration: "6 weeks",
    lessons: 16,
    description:
      "Discover layouts, responsive design, typography, colours, and modern styling.",
    icon: "design",
    featured: true,
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    slug: "javascript-essentials",
    category: "Technology",
    level: "Beginner",
    duration: "8 weeks",
    lessons: 20,
    description:
      "Explore programming fundamentals and add interactive behaviour to websites.",
    icon: "code",
    featured: false,
  },
  {
    id: 4,
    title: "Business Fundamentals",
    slug: "business-fundamentals",
    category: "Business",
    level: "Beginner",
    duration: "5 weeks",
    lessons: 14,
    description:
      "Understand business planning, customers, operations, and decision-making.",
    icon: "business",
    featured: false,
  },
  {
    id: 5,
    title: "Mathematics Essentials",
    slug: "mathematics-essentials",
    category: "Science & Mathematics",
    level: "Beginner",
    duration: "6 weeks",
    lessons: 18,
    description:
      "Strengthen your mathematical foundation through structured learning and practice.",
    icon: "science",
    featured: false,
  },
  {
    id: 6,
    title: "Creative Design Principles",
    slug: "creative-design-principles",
    category: "Creative Arts & Design",
    level: "Beginner",
    duration: "4 weeks",
    lessons: 10,
    description:
      "Learn about visual balance, composition, colour, and creative problem-solving.",
    icon: "design",
    featured: false,
  },
];

const categories = [
  "All courses",
  ...new Set(sampleCourses.map((course) => course.category)),
];

function getCourseIcon(icon) {
  if (icon === "design") return Layers3;
  if (icon === "business") return GraduationCap;
  if (icon === "science") return BookOpen;
  return BookOpen;
}

function Courses() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All courses");

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sampleCourses.filter((course) => {
      const matchesCategory =
        activeCategory === "All courses" ||
        course.category === activeCategory;

      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.description.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="courses-page">
      <section className="courses-hero">
        <div className="courses-hero-content">
          <span className="courses-eyebrow">
            DISCOVER YOUR NEXT OPPORTUNITY
          </span>

          <h1>
            Learn something <span>meaningful.</span>
          </h1>

          <p>
            Explore learning opportunities across technology, business,
            mathematics, creative fields, and more. Find a subject that
            matches your interests and goals.
          </p>

          <div className="courses-hero-stats">
            <div>
              <BookOpen size={19} />
              <span>Structured learning</span>
            </div>
            <div>
              <GraduationCap size={20} />
              <span>Different skill levels</span>
            </div>
          </div>
        </div>
      </section>

      <section className="courses-catalogue">
        <div className="courses-section-heading">
          <div>
            <span className="courses-eyebrow">COURSE CATALOGUE</span>
            <h2>Find your learning path</h2>
            <p>
              Search available courses or browse by subject area.
            </p>
          </div>

          <span className="courses-count">
            {filteredCourses.length}{" "}
            {filteredCourses.length === 1 ? "course" : "courses"}
          </span>
        </div>

        <div className="courses-search">
          <Search size={20} />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search courses, subjects, or skills..."
            aria-label="Search courses"
          />
        </div>

        <div className="courses-category-list" aria-label="Filter by category">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`courses-category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="courses-grid">
            {filteredCourses.map((course) => {
              const CourseIcon = getCourseIcon(course.icon);

              return (
                <article className="course-card" key={course.id}>
                  <div
                    className={`course-card-art course-card-art-${course.icon}`}
                  >
                    <div className="course-card-art-icon">
                      <CourseIcon size={30} />
                    </div>

                    {course.featured && (
                      <span className="course-featured-label">
                        Featured
                      </span>
                    )}

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
                      Explore course
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="courses-empty-state">
            <div className="courses-empty-icon">
              <Search size={26} />
            </div>
            <h3>No courses found</h3>
            <p>
              Try another search term or choose a different category.
            </p>
            <button
              type="button"
              className="courses-reset-button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All courses");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

        <p className="courses-preview-note">
          These are sample courses for the frontend preview. Course content,
          availability, and categories will be connected to the academy
          backend later.
        </p>
      </section>
    </div>
  );
}

export default Courses;
