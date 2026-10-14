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

export default sampleCourses;