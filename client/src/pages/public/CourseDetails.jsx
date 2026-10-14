import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Clock,
  GraduationCap,
  Layers3,
  LockKeyhole,
  PlayCircle,
  Target,
} from "lucide-react";
import "./CourseDetails.css";

const courses = [
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
    overview:
      "Start your web development journey by learning how to structure web pages. Explore HTML elements, headings, paragraphs, links, images, lists, forms, and semantic page structure.",
    outcomes: [
      "Understand HTML documents and their structure.",
      "Create headings, paragraphs, links, lists, and images.",
      "Build accessible forms using appropriate HTML elements.",
      "Organise a page using semantic HTML.",
      "Create a simple multi-section web page.",
    ],
    curriculum: [
      {
        title: "Introduction to HTML",
        lessons: ["What HTML is", "Your first HTML document"],
      },
      {
        title: "Text and page structure",
        lessons: ["Headings and paragraphs", "Lists and semantic elements"],
      },
      {
        title: "Links and media",
        lessons: ["Links and navigation", "Images and alternative text"],
      },
      {
        title: "Forms and practice",
        lessons: ["HTML forms", "Build a simple web page"],
      },
    ],
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
    overview:
      "Learn how to transform plain HTML into attractive, readable, responsive interfaces. Practise colours, typography, spacing, Flexbox, Grid, and responsive layouts.",
    outcomes: [
      "Apply colours, typography, spacing, and borders.",
      "Understand the CSS box model.",
      "Build layouts with Flexbox and Grid.",
      "Create responsive designs for different screens.",
      "Style a complete multi-section website.",
    ],
    curriculum: [
      {
        title: "CSS foundations",
        lessons: ["CSS syntax and selectors", "Colours and typography"],
      },
      {
        title: "Spacing and layout",
        lessons: ["The box model", "Flexbox layouts"],
      },
      {
        title: "Modern page design",
        lessons: ["CSS Grid", "Cards and navigation"],
      },
      {
        title: "Responsive design",
        lessons: ["Media queries", "Build a responsive page"],
      },
    ],
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
    overview:
      "Develop a foundation in JavaScript through variables, functions, conditions, arrays, objects, events, and DOM manipulation. Use these concepts to make web pages interactive.",
    outcomes: [
      "Use variables, data types, and operators.",
      "Write functions and conditional logic.",
      "Work with arrays and objects.",
      "Respond to user events.",
      "Build small interactive browser projects.",
    ],
    curriculum: [
      {
        title: "JavaScript foundations",
        lessons: ["Variables and data types", "Operators and conditions"],
      },
      {
        title: "Reusable logic",
        lessons: ["Functions", "Loops and iteration"],
      },
      {
        title: "Working with data",
        lessons: ["Arrays", "Objects"],
      },
      {
        title: "Browser interaction",
        lessons: ["DOM manipulation", "Events and a mini project"],
      },
    ],
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
    overview:
      "Explore the foundations of running and understanding a business. Learn about customers, value propositions, planning, basic finances, and everyday business decisions.",
    outcomes: [
      "Explain key business concepts.",
      "Identify customer needs and target audiences.",
      "Outline a simple business plan.",
      "Understand basic costs and revenue.",
      "Evaluate common business decisions.",
    ],
    curriculum: [
      {
        title: "Understanding business",
        lessons: ["Business types and models", "Creating value"],
      },
      {
        title: "Customers and markets",
        lessons: ["Understanding customers", "Market research basics"],
      },
      {
        title: "Planning and finance",
        lessons: ["A simple business plan", "Costs and revenue"],
      },
      {
        title: "Putting ideas into practice",
        lessons: ["Decision-making", "Business planning exercise"],
      },
    ],
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
    overview:
      "Review essential mathematical concepts and build confidence through clear explanations and guided practice in numbers, fractions, percentages, algebra, and problem-solving.",
    outcomes: [
      "Work confidently with numbers and operations.",
      "Understand fractions, decimals, and percentages.",
      "Solve introductory algebra problems.",
      "Interpret basic mathematical relationships.",
      "Apply mathematics to everyday problems.",
    ],
    curriculum: [
      {
        title: "Numbers and operations",
        lessons: ["Number systems", "Operations and order"],
      },
      {
        title: "Fractions and percentages",
        lessons: ["Fractions and decimals", "Percentages in everyday life"],
      },
      {
        title: "Introduction to algebra",
        lessons: ["Expressions and variables", "Simple equations"],
      },
      {
        title: "Problem-solving",
        lessons: ["Word problems", "Practice assessment"],
      },
    ],
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
    overview:
      "Discover the principles that help creative work communicate clearly. Explore composition, contrast, colour, typography, visual hierarchy, and the process of developing design ideas.",
    outcomes: [
      "Recognise key visual design principles.",
      "Use contrast and hierarchy to organise content.",
      "Understand colour relationships.",
      "Make informed typography choices.",
      "Plan a simple creative design project.",
    ],
    curriculum: [
      {
        title: "Design foundations",
        lessons: ["What makes effective design", "Balance and alignment"],
      },
      {
        title: "Colour and contrast",
        lessons: ["Colour relationships", "Contrast and readability"],
      },
      {
        title: "Typography and hierarchy",
        lessons: ["Typography basics", "Visual hierarchy"],
      },
      {
        title: "Creative practice",
        lessons: ["Developing a concept", "Plan a design project"],
      },
    ],
  },
];

function CourseCategoryIcon({ category, size = 24 }) {
  if (category === "Business") {
    return <GraduationCap size={size} />;
  }

  if (category === "Science & Mathematics") {
    return <Target size={size} />;
  }

  if (category === "Creative Arts & Design") {
    return <Layers3 size={size} />;
  }

  return <BookOpen size={size} />;
}

function CourseDetails() {
  const { slug } = useParams();
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    return (
      <main className="course-details-page">
        <section className="course-not-found">
          <div className="course-not-found-icon">
            <BookOpen size={30} />
          </div>

          <span className="course-details-eyebrow">COURSE NOT FOUND</span>

          <h1>This course isn't available here yet.</h1>

          <p>
            The course may have moved or may not exist in this preview.
            Explore the catalogue to find another learning opportunity.
          </p>

          <Link to="/courses" className="course-primary-button">
            <ArrowLeft size={17} />
            Back to courses
          </Link>
        </section>
      </main>
    );
  }

  return (
    <div className="course-details-page">
      <section className="course-details-hero">
        <div className="course-details-hero-inner">
          <Link to="/courses" className="course-back-link">
            <ArrowLeft size={17} />
            All courses
          </Link>

          <div className="course-details-hero-grid">
            <div className="course-details-hero-copy">
              <span className="course-details-category">
                {course.category}
              </span>

              <h1>{course.title}</h1>

              <p>{course.overview}</p>

              <div className="course-details-meta">
                <span>
                  <GraduationCap size={17} />
                  {course.level}
                </span>

                <span>
                  <Clock size={17} />
                  {course.duration}
                </span>

                <span>
                  <BookOpen size={17} />
                  {course.lessons} lessons
                </span>
              </div>

              <div className="course-details-actions">
                <Link to="/register" className="course-primary-button">
                  Create an account
                  <ArrowRight size={17} />
                </Link>

                <span className="course-details-free-note">
                  <CheckCircle size={16} />
                  Registration starts your learning journey
                </span>
              </div>
            </div>

            <div className="course-details-visual">
              <div className="course-details-visual-ring course-ring-one" />
              <div className="course-details-visual-ring course-ring-two" />

              <div className="course-details-visual-icon">
                <CourseCategoryIcon category={course.category} size={62} />
              </div>

              <div className="course-visual-tag course-visual-tag-top">
                <BookOpen size={16} />
                Structured lessons
              </div>

              <div className="course-visual-tag course-visual-tag-bottom">
                <Target size={16} />
                Practical learning
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="course-details-content">
        <div className="course-details-main">
          <section className="course-content-section">
            <span className="course-details-eyebrow">
              YOUR LEARNING GOALS
            </span>

            <h2>What you'll learn</h2>

            <p className="course-content-intro">
              By working through this course, you'll develop knowledge
              and skills in the following areas.
            </p>

            <div className="course-outcomes-grid">
              {course.outcomes.map((outcome) => (
                <div className="course-outcome" key={outcome}>
                  <CheckCircle size={19} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="course-content-section">
            <span className="course-details-eyebrow">
              COURSE STRUCTURE
            </span>

            <h2>Curriculum preview</h2>

            <p className="course-content-intro">
              Preview the topics covered in the learning programme.
            </p>

            <div className="course-curriculum">
              {course.curriculum.map((section, index) => (
                <details
                  className="course-curriculum-section"
                  key={section.title}
                  open={index === 0}
                >
                  <summary>
                    <span className="course-curriculum-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="course-curriculum-title">
                      {section.title}
                      <small>{section.lessons.length} preview topics</small>
                    </span>

                    <ArrowRight
                      size={18}
                      className="course-curriculum-arrow"
                    />
                  </summary>

                  <ul>
                    {section.lessons.map((lesson) => (
                      <li key={lesson}>
                        <PlayCircle size={17} />
                        <span>{lesson}</span>
                        <LockKeyhole
                          size={14}
                          className="course-preview-lock"
                        />
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>

            <p className="course-curriculum-note">
              This is a curriculum preview. Full lessons and enrolment
              will be connected in a later stage.
            </p>
          </section>
        </div>

        <aside className="course-details-sidebar">
          <div className="course-enrol-card">
            <div className="course-enrol-icon">
              <CourseCategoryIcon category={course.category} size={29} />
            </div>

            <span className="course-details-eyebrow">START LEARNING</span>

            <h2>Ready to begin?</h2>

            <p>
              Create an account to prepare for enrolment and track your
              learning as academy features become available.
            </p>

            <div className="course-enrol-facts">
              <div>
                <Clock size={17} />
                <span>Estimated duration</span>
                <strong>{course.duration}</strong>
              </div>

              <div>
                <BookOpen size={17} />
                <span>Course lessons</span>
                <strong>{course.lessons}</strong>
              </div>

              <div>
                <GraduationCap size={17} />
                <span>Experience level</span>
                <strong>{course.level}</strong>
              </div>
            </div>

            <Link to="/register" className="course-primary-button">
              Get started
              <ArrowRight size={17} />
            </Link>

            <Link to="/contact" className="course-sidebar-contact">
              Have a question? Contact us
            </Link>
          </div>

          <div className="course-sidebar-note">
            <CheckCircle size={19} />

            <p>
              <strong>Learn at your own pace.</strong>
              <span>
                Lesson access, assessments, and certificates will depend
                on the course and your enrolment.
              </span>
            </p>
          </div>
        </aside>
      </section>

      <section className="course-details-bottom">
        <div>
          <span className="course-details-eyebrow">KEEP EXPLORING</span>
          <h2>Your next learning opportunity is waiting.</h2>
        </div>

        <Link to="/courses" className="course-secondary-button">
          Browse all courses
          <ArrowRight size={17} />
        </Link>
      </section>
    </div>
  );
}

export default CourseDetails;