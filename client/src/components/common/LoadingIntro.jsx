import { useEffect } from "react";
import {
  GraduationCap,
  BookOpen,
  Compass,
  LayoutDashboard,
  Award,
  Settings,
  Mail,
  UserRound,
  Sparkles,
  ArrowRight,
  Code,
  BriefcaseBusiness,
  HeartHandshake,
} from "lucide-react";
import "./LoadingIntro.css";

const introPages = {
  home: {
    eyebrow: "WELCOME TO ROXY BILLION ACADEMY",
    title: "Learn Today. Build Tomorrow.",
    description:
      "Explore new opportunities, develop practical skills, and unlock your full potential.",
    icon: GraduationCap,
    className: "intro-home",
    symbols: [BookOpen, Sparkles, Award],
  },

  about: {
    eyebrow: "OUR STORY, YOUR FUTURE",
    title: "Education With Purpose.",
    description:
      "Discover an academy built to help learners grow, develop confidence, and reach their goals.",
    icon: HeartHandshake,
    className: "intro-about",
    symbols: [GraduationCap, HeartHandshake, Sparkles],
  },

  courses: {
    eyebrow: "DISCOVER • LEARN • GROW",
    title: "Find Your Next Skill.",
    description:
      "Explore learning opportunities across different subjects and choose your next challenge.",
    icon: BookOpen,
    className: "intro-courses",
    symbols: [BookOpen, Code, Compass],
  },

  courseDetails: {
    eyebrow: "YOUR NEXT LEARNING CHALLENGE",
    title: "Your Next Chapter Starts Here.",
    description:
      "Get ready to explore your course, practise new concepts, and turn knowledge into progress.",
    icon: Compass,
    className: "intro-course-details",
    symbols: [BookOpen, ArrowRight, Award],
  },

  pricing: {
    eyebrow: "INVEST IN YOUR GROWTH",
    title: "Choose Your Learning Path.",
    description:
      "Explore learning options designed to support your goals and your learning journey.",
    icon: Award,
    className: "intro-pricing",
    symbols: [Award, Sparkles, GraduationCap],
  },

  contact: {
    eyebrow: "WE ARE HERE TO HELP",
    title: "Let's Connect.",
    description:
      "Have a question or need assistance? Discover how to get in touch with our academy team.",
    icon: Mail,
    className: "intro-contact",
    symbols: [Mail, HeartHandshake, ArrowRight],
  },

  login: {
    eyebrow: "WELCOME BACK",
    title: "Your Journey Continues.",
    description:
      "Sign in to return to your learning space and continue working towards your goals.",
    icon: UserRound,
    className: "intro-login",
    symbols: [UserRound, BookOpen, ArrowRight],
  },

  register: {
    eyebrow: "YOUR FUTURE STARTS HERE",
    title: "Take Your First Step.",
    description:
      "Create your account and begin building a learning journey that belongs to you.",
    icon: GraduationCap,
    className: "intro-register",
    symbols: [Sparkles, GraduationCap, BookOpen],
  },

  forgotPassword: {
    eyebrow: "ACCOUNT RECOVERY",
    title: "Let's Get You Back.",
    description:
      "Recover access to your account and get ready to continue your learning journey.",
    icon: Settings,
    className: "intro-recovery",
    symbols: [Settings, UserRound, ArrowRight],
  },

  dashboard: {
    eyebrow: "YOUR PERSONAL LEARNING SPACE",
    title: "Track. Learn. Grow.",
    description:
      "Review your learning activity, manage your courses, and keep moving towards your goals.",
    icon: LayoutDashboard,
    className: "intro-dashboard",
    symbols: [LayoutDashboard, Award, BookOpen],
  },

  myCourses: {
    eyebrow: "YOUR SELECTED COURSES",
    title: "Pick Up Where You Left Off.",
    description:
      "Return to your enrolled courses and continue making progress at your own pace.",
    icon: BookOpen,
    className: "intro-my-courses",
    symbols: [BookOpen, Compass, Award],
  },

  learning: {
    eyebrow: "TIME TO LEARN",
    title: "Focus on Your Progress.",
    description:
      "Explore your lessons, understand new ideas, and put your knowledge into practice.",
    icon: Compass,
    className: "intro-learning",
    symbols: [BookOpen, Sparkles, ArrowRight],
  },

  assessments: {
    eyebrow: "PUT YOUR KNOWLEDGE TO THE TEST",
    title: "Show What You Know.",
    description:
      "Challenge yourself, practise what you have learned, and identify where you can improve.",
    icon: Award,
    className: "intro-assessments",
    symbols: [Award, Sparkles, Compass],
  },

  certificates: {
    eyebrow: "YOUR HARD WORK, RECOGNIZED",
    title: "Celebrate Your Achievement.",
    description:
      "Review your accomplishments and celebrate the milestones you have reached.",
    icon: Award,
    className: "intro-certificates",
    symbols: [Award, GraduationCap, Sparkles],
  },

  settings: {
    eyebrow: "YOUR ACCOUNT, YOUR WAY",
    title: "Make It Yours.",
    description:
      "Manage your profile, update your preferences, and keep your account information current.",
    icon: Settings,
    className: "intro-settings",
    symbols: [Settings, UserRound, Sparkles],
  },

  admin: {
    eyebrow: "ACADEMY MANAGEMENT",
    title: "Manage. Organize. Grow.",
    description:
      "Manage academy content, learning categories, students, and essential platform settings.",
    icon: LayoutDashboard,
    className: "intro-admin",
    symbols: [LayoutDashboard, Settings, BriefcaseBusiness],
  },

  adminCourses: {
    eyebrow: "COURSE MANAGEMENT",
    title: "Build Better Learning Experiences.",
    description:
      "Organize course content and maintain a high-quality learning catalogue.",
    icon: BookOpen,
    className: "intro-admin-courses",
    symbols: [BookOpen, Settings, Award],
  },

  adminCategories: {
    eyebrow: "ORGANIZE KNOWLEDGE",
    title: "Every Subject Has a Place.",
    description:
      "Manage learning categories and help students discover relevant subjects.",
    icon: Compass,
    className: "intro-admin-categories",
    symbols: [Compass, BookOpen, Settings],
  },

  adminStudents: {
    eyebrow: "STUDENT MANAGEMENT",
    title: "Support Every Learner.",
    description:
      "Review student information and help maintain a well-organized academy.",
    icon: UserRound,
    className: "intro-admin-students",
    symbols: [UserRound, GraduationCap, HeartHandshake],
  },

  adminEnrollments: {
    eyebrow: "ENROLLMENT MANAGEMENT",
    title: "Keep Learning Organized.",
    description:
      "Review enrollments and manage student access to learning opportunities.",
    icon: BriefcaseBusiness,
    className: "intro-admin-enrollments",
    symbols: [BriefcaseBusiness, BookOpen, UserRound],
  },

  adminMessages: {
    eyebrow: "ACADEMY COMMUNICATION",
    title: "Every Message Matters.",
    description:
      "Review incoming enquiries and keep communication with learners organized.",
    icon: Mail,
    className: "intro-admin-messages",
    symbols: [Mail, HeartHandshake, ArrowRight],
  },

  adminAI: {
    eyebrow: "AI USAGE OVERVIEW",
    title: "Smarter Learning Support.",
    description:
      "Review AI usage information and help manage the academy's learning support tools.",
    icon: Sparkles,
    className: "intro-admin-ai",
    symbols: [Sparkles, LayoutDashboard, Settings],
  },

  adminSettings: {
    eyebrow: "PLATFORM CONFIGURATION",
    title: "Shape the Academy.",
    description:
      "Manage platform settings and keep the academy aligned with its goals.",
    icon: Settings,
    className: "intro-admin-settings",
    symbols: [Settings, GraduationCap, Sparkles],
  },
};

const routeRules = [
  { test: /^\/$/, page: "home" },
  { test: /^\/about\/?$/, page: "about" },
  { test: /^\/courses\/?$/, page: "courses" },
  { test: /^\/courses\/[^/]+\/?$/, page: "courseDetails" },
  { test: /^\/pricing\/?$/, page: "pricing" },
  { test: /^\/contact\/?$/, page: "contact" },
  { test: /^\/login\/?$/, page: "login" },
  { test: /^\/register\/?$/, page: "register" },
  { test: /^\/forgot-password\/?$/, page: "forgotPassword" },
  { test: /^\/reset-password\/?$/, page: "forgotPassword" },
  { test: /^\/dashboard\/?$/, page: "dashboard" },
  { test: /^\/my-courses\/?$/, page: "myCourses" },
  { test: /^\/learn\/?$/, page: "learning" },
  { test: /^\/learn\/[^/]+\/?$/, page: "learning" },
  { test: /^\/assessments\/?$/, page: "assessments" },
  { test: /^\/projects\/?$/, page: "assessments" },
  { test: /^\/certificates\/?$/, page: "certificates" },
  { test: /^\/settings\/?$/, page: "settings" },
  { test: /^\/admin\/?$/, page: "admin" },
  { test: /^\/admin\/courses\/?$/, page: "adminCourses" },
  { test: /^\/admin\/categories\/?$/, page: "adminCategories" },
  { test: /^\/admin\/students\/?$/, page: "adminStudents" },
  { test: /^\/admin\/enrollments\/?$/, page: "adminEnrollments" },
  { test: /^\/admin\/messages\/?$/, page: "adminMessages" },
  { test: /^\/admin\/ai-usage\/?$/, page: "adminAI" },
  { test: /^\/admin\/settings\/?$/, page: "adminSettings" },
];

function getPageKey(pageKey, pathname) {
  if (pageKey && introPages[pageKey]) {
    return pageKey;
  }

  const normalizedPath = pathname?.split("?")[0] || "/";

  const matchingRule = routeRules.find((rule) =>
    rule.test.test(normalizedPath),
  );

  return matchingRule?.page || "home";
}

function LoadingIntro({ pageKey, pathname, onComplete }) {
  const resolvedPageKey = getPageKey(pageKey, pathname);
  const intro = introPages[resolvedPageKey];

  const MainIcon = intro.icon;
  const SymbolOne = intro.symbols[0];
  const SymbolTwo = intro.symbols[1];
  const SymbolThree = intro.symbols[2];

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      onComplete?.();
    }, 10000);

    return () => window.clearTimeout(timeout);
  }, [resolvedPageKey, onComplete]);

  return (
    <div
      className={`loading-intro ${intro.className}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${intro.title} introduction`}
    >
      <div className="intro-backdrop" />

      <div className="intro-modal">
        <div className="intro-ambient intro-ambient-one" />
        <div className="intro-ambient intro-ambient-two" />

        <div className="intro-visual">
          <div className="intro-orbit intro-orbit-one" />
          <div className="intro-orbit intro-orbit-two" />

          <div className="intro-symbol intro-symbol-one">
            <SymbolOne size={23} strokeWidth={1.6} />
          </div>

          <div className="intro-symbol intro-symbol-two">
            <SymbolTwo size={21} strokeWidth={1.6} />
          </div>

          <div className="intro-symbol intro-symbol-three">
            <SymbolThree size={22} strokeWidth={1.6} />
          </div>

          <div className="intro-main-icon">
            <MainIcon size={47} strokeWidth={1.4} />
          </div>

          <span className="intro-spark intro-spark-one">✦</span>
          <span className="intro-spark intro-spark-two">✧</span>
          <span className="intro-spark intro-spark-three">✦</span>
        </div>

        <div className="intro-content">
          <div className="intro-brand">
            <span className="intro-brand-mark">RB</span>

            <span className="intro-brand-name">
              ROXY BILLION
              <span>ACADEMY</span>
            </span>
          </div>

          <p className="intro-eyebrow">{intro.eyebrow}</p>

          <h2 className="intro-title">{intro.title}</h2>

          <p className="intro-description">{intro.description}</p>

          <div className="intro-loading">
            <div className="intro-loading-track">
              <span className="intro-loading-progress" />
            </div>

            <div className="intro-loading-footer">
              <span>Preparing your experience</span>
              <span className="intro-loading-dots">
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>

          <button
            className="intro-skip"
            type="button"
            onClick={() => onComplete?.()}
          >
            Skip introduction
            <ArrowRight size={15} />
          </button>
        </div>

        <div className="intro-bottom-line" />
      </div>
    </div>
  );
}

export default LoadingIntro;