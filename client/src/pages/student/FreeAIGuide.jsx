import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bot,
  BookOpen,
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

const topics = [
  "HTML & CSS",
  "JavaScript",
  "React",
  "Backend APIs",
  "Databases",
  "Git & GitHub",
];

function FreeAIGuide() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  function sendQuestion(value = question) {
    const trimmed = value.trim();

    if (!trimmed) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        role: "user",
        text: trimmed,
      },
    ]);

    setQuestion("");
  }

  function startNewChat() {
    setMessages([]);
    setQuestion("");
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
            Prepare questions about your studies and explore the
            learning topics supported by the academy.
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
              <p>Explore learning topics</p>
            </div>
          </div>

          <div className="free-ai-topic-list">
            {topics.map((topic) => (
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
                Practise with your course lessons and work through
                exercises as you develop your skills.
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
                  Live AI connection unavailable
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
                  Choose a suggested question or select a topic.
                  Your questions can be prepared here, but live AI
                  answers are not available until the academy connects
                  its AI backend.
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
              <>
                {messages.map((message) => (
                  <article
                    className={`free-ai-message ${message.role}`}
                    key={message.id}
                  >
                    <div className="free-ai-message-avatar">
                      <UserRound size={18} />
                    </div>

                    <div className="free-ai-message-content">
                      <p>{message.text}</p>
                    </div>
                  </article>
                ))}

                <article className="free-ai-message assistant">
                  <div className="free-ai-message-avatar">
                    <Bot size={19} />
                  </div>

                  <div className="free-ai-message-content">
                    <h3>Live AI is not connected yet</h3>
                    <p>
                      Your question has been added to this page's
                      temporary chat, but it has not been sent to an
                      AI service. A secure backend connection is
                      required before the guide can generate answers.
                    </p>
                  </div>
                </article>
              </>
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
              Prepare your learning question
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
                placeholder="Write a question about your learning..."
                rows={2}
                maxLength={2000}
              />

              <button
                type="submit"
                disabled={!question.trim()}
                aria-label="Add question to chat"
              >
                <Send size={19} />
              </button>
            </div>

            <p className="free-ai-composer-note">
              Live AI answers are not available yet. Do not enter
              passwords, private personal information, or API keys.
            </p>
          </form>
        </section>
      </div>
    </main>
  );
}

export default FreeAIGuide;