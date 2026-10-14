
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
  Check,
  Code2,
  Lightbulb,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
import StudentNavigation from "./StudentNavigation";
import "./FreeAIGuide.css";

const suggestions = [
  "What is HTML and how does it work?",
  "Explain the difference between HTML, CSS, and JavaScript.",
  "How do I fix a JavaScript error?",
  "What is React used for?",
];

const knowledgeBase = [
  {
    keywords: ["html", "hypertext", "markup"],
    title: "Understanding HTML",
    answer:
      "HTML stands for HyperText Markup Language. It defines the structure of a webpage using elements such as headings, paragraphs, links, images, and forms.",
    code: '<h1>Welcome</h1>\n<p>This is my first webpage.</p>',
    tip: "Start by learning headings, paragraphs, links, images, and semantic HTML elements.",
  },
  {
    keywords: ["css", "style", "styling", "color", "layout"],
    title: "Understanding CSS",
    answer:
      "CSS stands for Cascading Style Sheets. It controls how a webpage looks, including colors, spacing, typography, responsive layouts, and animations.",
    code: "h1 {\n  color: navy;\n  font-size: 2rem;\n}",
    tip: "Practice the box model, Flexbox, Grid, and media queries.",
  },
  {
    keywords: ["javascript", " js ", "function", "variable", "array", "error", "bug", "debug"],
    title: "Understanding JavaScript",
    answer:
      "JavaScript adds logic and interactivity to websites. It can respond to user actions, validate forms, update page content, and communicate with APIs.",
    code:
      'function greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("Student"));',
    tip: "Read the exact error message, identify the affected line, and test one fix at a time.",
  },
  {
    keywords: ["react", "component", "jsx", "props", "state", "hook"],
    title: "Understanding React",
    answer:
      "React is a JavaScript library for building user interfaces from reusable components. Components can receive props and use state to manage changing information.",
    code:
      'function Welcome() {\n  return <h1>Welcome to React</h1>;\n}\n\nexport default Welcome;',
    tip: "Learn components, JSX, props, useState, and useEffect in that order.",
  },
  {
    keywords: ["node", "express", "backend", "server", "api", "endpoint"],
    title: "Understanding Backend Development",
    answer:
      "Backend development handles server-side logic, data processing, authentication, and database operations. Node.js lets you run JavaScript on the server, while Express helps build web servers and APIs.",
    code:
      'import express from "express";\n\nconst app = express();\napp.use(express.json());\n\napp.get("/api/health", (req, res) => {\n  res.json({ status: "ok" });\n});',
    tip: "Understand HTTP requests, routes, status codes, validation, and error handling.",
  },
  {
    keywords: ["mongodb", "database", "mongoose", "collection", "document"],
    title: "Understanding MongoDB",
    answer:
      "MongoDB is a document-oriented database. It stores records as documents grouped into collections. Mongoose is a popular Node.js library for defining schemas and working with MongoDB.",
    code:
      'const student = {\n  name: "Alex",\n  course: "Web Development",\n};',
    tip: "Learn documents, collections, CRUD operations, schemas, and database security.",
  },
  {
    keywords: ["git", "github", "commit", "repository", "version control"],
    title: "Understanding Git and GitHub",
    answer:
      "Git tracks changes to your code. GitHub hosts Git repositories online so you can back up projects, collaborate, and share your work.",
    code:
      "git add .\ngit commit -m \"Describe your changes\"\ngit push",
    tip: "Commit small, meaningful changes and never push passwords or API secrets.",
  },
];

function createResponse(message) {
  const normalized = message.toLowerCase();
  const match = knowledgeBase.find((topic) =>
    topic.keywords.some((keyword) =>
      normalized.includes(keyword.trim())
    )
  );

  if (
    normalized.includes("hello") ||
    normalized.includes("hi ") ||
    normalized.trim() === "hi"
  ) {
    return {
      title: "Welcome to your learning journey",
      answer:
        "Hello! I'm the Roxy Billion Academy AI Guide demo. Ask me about programming concepts, web development, or common coding problems.",
      tip: "Choose one of the suggested questions to get started.",
    };
  }

  if (
    normalized.includes("difference between html") ||
    normalized.includes("html, css") ||
    normalized.includes("html css javascript")
  ) {
    return {
      title: "HTML vs CSS vs JavaScript",
      answer:
        "HTML provides the structure of a webpage, CSS controls its appearance, and JavaScript adds behaviour and interactivity. They work together to create websites.",
      code:
        "HTML        → Structure\nCSS         → Presentation\nJavaScript  → Behaviour",
      tip: "Build one simple page using all three technologies to understand how they work together.",
    };
  }

  if (match) {
    return {
      title: match.title,
      answer: match.answer,
      code: match.code,
      tip: match.tip,
    };
  }

  return {
    title: "Let's break your question down",
    answer:
      "This frontend demo has a limited set of prepared learning topics, so I don't have a reliable answer for that specific question yet. Try asking about HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, Git, or GitHub.",
    tip:
      "When asking about a coding error, include the exact error message, the relevant code, and what you expected to happen. Never include passwords or secret API keys.",
  };
}

function FreeAIGuide() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [copiedMessage, setCopiedMessage] = useState(null);

  function sendQuestion(value = question) {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    const response = createResponse(trimmed);

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: trimmed,
      },
      {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        response,
      },
    ]);

    setQuestion("");
    setCopiedMessage(null);
  }

  function startNewChat() {
    setMessages([]);
    setQuestion("");
    setCopiedMessage(null);
  }

  async function copyCode(code, id) {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedMessage(id);
    } catch {
      setCopiedMessage(null);
    }
  }

  return (
    <main className="free-ai-page page-container">
      <StudentNavigation />

      <header className="free-ai-header">
        <div>
          <p className="home-section-eyebrow">
            YOUR LEARNING COMPANION
          </p>
          <h1>Free AI Guide</h1>
          <p>
            Explore programming concepts, understand code, and get
            guidance as you develop your skills.
          </p>
        </div>

        <div className="free-ai-header-icon">
          <Sparkles size={32} />
        </div>
      </header>

      <div className="free-ai-layout">
        <aside className="free-ai-sidebar">
          <div className="free-ai-sidebar-heading">
            <div className="free-ai-small-icon">
              <BookOpen size={20} />
            </div>
            <div>
              <h2>Learning support</h2>
              <p>Explore technical topics</p>
            </div>
          </div>

          <div className="free-ai-topic-list">
            {[
              "HTML & CSS",
              "JavaScript",
              "React",
              "Backend APIs",
              "Databases",
              "Git & GitHub",
            ].map((topic) => (
              <button
                type="button"
                key={topic}
                onClick={() => sendQuestion(`Explain ${topic}`)}
              >
                <Code2 size={17} />
                <span>{topic}</span>
                <ArrowRight size={15} />
              </button>
            ))}
          </div>

          <div className="free-ai-sidebar-note">
            <Lightbulb size={20} />
            <div>
              <h3>Learn by doing</h3>
              <p>
                Read the explanation, try the example in your editor,
                and experiment with small changes.
              </p>
            </div>
          </div>

          <Link to="/my-courses" className="free-ai-course-link">
            Return to My Courses
            <ArrowRight size={17} />
          </Link>
        </aside>

        <section className="free-ai-chat">
          <div className="free-ai-chat-header">
            <div className="free-ai-chat-identity">
              <div className="free-ai-bot-avatar">
                <Bot size={23} />
              </div>
              <div>
                <h2>Academy AI Guide</h2>
                <p>
                  <span className="free-ai-status-dot" />
                  Frontend demo assistant
                </p>
              </div>
            </div>

            <button
              type="button"
              className="free-ai-reset-button"
              onClick={startNewChat}
            >
              <RotateCcw size={16} />
              New chat
            </button>
          </div>

          <div className="free-ai-messages" aria-live="polite">
            {messages.length === 0 ? (
              <div className="free-ai-welcome">
                <div className="free-ai-welcome-icon">
                  <Sparkles size={29} />
                </div>

                <h2>What would you like to learn today?</h2>
                <p>
                  Ask a question about programming or choose a
                  suggestion to begin.
                </p>

                <div className="free-ai-suggestions">
                  {suggestions.map((suggestion) => (
                    <button
                      type="button"
                      key={suggestion}
                      onClick={() => sendQuestion(suggestion)}
                    >
                      <MessageCircle size={17} />
                      <span>{suggestion}</span>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <article
                  className={`free-ai-message ${message.role}`}
                  key={message.id}
                >
                  <div className="free-ai-message-avatar">
                    {message.role === "user" ? (
                      <UserRound size={18} />
                    ) : (
                      <Bot size={19} />
                    )}
                  </div>

                  <div className="free-ai-message-content">
                    {message.role === "user" ? (
                      <p>{message.text}</p>
                    ) : (
                      <>
                        <h3>{message.response.title}</h3>
                        <p>{message.response.answer}</p>

                        {message.response.code && (
                          <div className="free-ai-code-block">
                            <div className="free-ai-code-header">
                              <span>Example</span>
                              <button
                                type="button"
                                onClick={() =>
                                  copyCode(
                                    message.response.code,
                                    message.id
                                  )
                                }
                              >
                                {copiedMessage === message.id ? (
                                  <Check size={15} />
                                ) : (
                                  <Code2 size={15} />
                                )}
                                {copiedMessage === message.id
                                  ? "Copied"
                                  : "Copy code"}
                              </button>
                            </div>

                            <pre>
                              <code>{message.response.code}</code>
                            </pre>
                          </div>
                        )}

                        {message.response.tip && (
                          <div className="free-ai-tip">
                            <Lightbulb size={18} />
                            <p>{message.response.tip}</p>
                          </div>
                        )}

                        <p className="free-ai-demo-disclaimer">
                          Prepared demo response — not generated by
                          a live AI model.
                        </p>
                      </>
                    )}
                  </div>
                </article>
              ))
            )}
          </div>

          <form
            className="free-ai-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendQuestion();
            }}
          >
            <label
              className="free-ai-input-label"
              htmlFor="free-ai-question"
            >
              Ask your learning question
            </label>

            <div className="free-ai-input-row">
              <textarea
                id="free-ai-question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault();
                    sendQuestion();
                  }
                }}
                placeholder="Ask about HTML, JavaScript, React..."
                rows={2}
                maxLength={2000}
              />

              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Send question"
              >
                <Send size={19} />
              </button>
            </div>

            <p className="free-ai-composer-note">
              Demo assistant. Don't enter passwords, personal data,
              or private API keys.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default FreeAIGuide;
