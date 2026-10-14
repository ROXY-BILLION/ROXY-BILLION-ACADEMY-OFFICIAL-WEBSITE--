
const learningCourses = [
  {
    slug: "web-development-fundamentals",
    title: "Web Development Fundamentals",
    category: "Technology",
    description:
      "Learn the foundations of building websites with HTML, CSS, and JavaScript.",

    modules: [
      {
        id: 1,
        title: "Module 1: Getting Started",
        lessons: [
          {
            id: 1,
            title: "Welcome to the Course",
            duration: "5 min",
            content:
              "Welcome to Web Development Fundamentals. In this course, you will explore the core technologies used to create modern websites. You will learn how websites work and how to begin building your own.",
          },
          {
            id: 2,
            title: "How Websites Work",
            duration: "8 min",
            content:
              "Websites use browsers, servers, and network requests to deliver pages and interactive experiences. The browser requests resources, the server responds, and the browser renders the page for the visitor.",
          },
          {
            id: 3,
            title: "Setting Up Your Workspace",
            duration: "10 min",
            content:
              "Prepare a code editor and a web browser so you can create, edit, and test websites. Organize your project files and learn how to open your work in a browser.",
          },
        ],
      },
      {
        id: 2,
        title: "Module 2: HTML Foundations",
        lessons: [
          {
            id: 4,
            title: "Introduction to HTML",
            duration: "12 min",
            content:
              "HTML provides the structure of a webpage. Learn how elements, tags, headings, paragraphs, links, and images work together to organize content.",
          },
          {
            id: 5,
            title: "Building Your First Page",
            duration: "15 min",
            content:
              "Combine HTML elements to build a simple webpage. Practice writing headings, paragraphs, links, and meaningful page sections.",
          },
        ],
      },
    ],

    project: {
      title: "Build Your First Personal Portfolio",
      difficulty: "Beginner",
      estimatedTime: "2–4 hours",
      description:
        "Create a personal portfolio website that introduces you, showcases your skills, and gives visitors a way to contact you.",
      objectives: [
        "Practice structuring content with HTML.",
        "Use CSS to create a clean, readable layout.",
        "Make the website responsive on mobile and desktop.",
        "Organize project files and test the website in a browser.",
      ],
      requirements: [
        "Create a homepage with your name and introduction.",
        "Add an About section describing yourself.",
        "Display at least three skills or technologies.",
        "Include at least one project in a projects section.",
        "Add a contact section with a working email link.",
        "Use CSS to style colors, spacing, and typography.",
        "Test the layout on mobile and desktop screens.",
      ],
      instructions:
        "Create the project in your code editor. Test it regularly in your browser, check every link, and review the layout at different screen widths before submitting your work.",
    },
  },
];

export default learningCourses;
