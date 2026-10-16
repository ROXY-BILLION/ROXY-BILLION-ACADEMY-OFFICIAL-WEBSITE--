import { useMemo, useState } from "react";
import {
  Search,
  Mail,
  MailOpen,
  CheckCheck,
  Clock3,
  Send,
  MessageSquare,
  UserRound,
  X,
} from "lucide-react";
import "./AdminMessages.css";

const initialMessages = [
  {
    id: 1,
    name: "Daniel Okafor",
    email: "daniel.okafor@example.com",
    subject: "Question about MERN Stack Development",
    message:
      "Hello Roxy Billion Academy, I would like to know if the MERN Stack Development course is suitable for someone who has basic HTML and CSS knowledge. Will I be able to follow the lessons?",
    date: "Oct 16, 2026",
    time: "10:42 AM",
    status: "unread",
  },
  {
    id: 2,
    name: "Amara Johnson",
    email: "amara.j@example.com",
    subject: "Payment confirmation",
    message:
      "Good afternoon. I completed my payment for the Web Development course but would like to confirm the next steps before I begin learning.",
    date: "Oct 16, 2026",
    time: "9:15 AM",
    status: "unread",
  },
  {
    id: 3,
    name: "Michael Adeyemi",
    email: "michael.a@example.com",
    subject: "Certificate question",
    message:
      "I have completed all the lessons in my course. Please can you explain how I can access my certificate?",
    date: "Oct 15, 2026",
    time: "4:30 PM",
    status: "replied",
  },
  {
    id: 4,
    name: "Grace Williams",
    email: "grace.w@example.com",
    subject: "Premium plan enquiry",
    message:
      "I am interested in the Premium plan. I would like to understand the difference between Premium and Premium+ before subscribing.",
    date: "Oct 15, 2026",
    time: "1:20 PM",
    status: "read",
  },
  {
    id: 5,
    name: "Samuel Peter",
    email: "samuel.p@example.com",
    subject: "Unable to access a lesson",
    message:
      "I am having difficulty opening one of my lessons. The lesson page keeps loading, and I cannot continue my course.",
    date: "Oct 14, 2026",
    time: "11:05 AM",
    status: "replied",
  },
  {
    id: 6,
    name: "Faith Emmanuel",
    email: "faith.e@example.com",
    subject: "Course recommendation",
    message:
      "I want to start learning technology but I am not sure which course to choose. Could you recommend a good starting point for a beginner?",
    date: "Oct 13, 2026",
    time: "2:45 PM",
    status: "read",
  },
];

function formatStatus(status) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function AdminMessages() {
  const [messages, setMessages] = useState(initialMessages);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [reply, setReply] = useState("");
  const [notice, setNotice] = useState("");

  const selectedMessage = messages.find(
    (message) => message.id === selectedId
  );

  const stats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter((message) => message.status === "unread").length,
      replied: messages.filter((message) => message.status === "replied").length,
      read: messages.filter((message) => message.status === "read").length,
    }),
    [messages]
  );

  const filteredMessages = useMemo(() => {
    const query = search.toLowerCase().trim();

    return messages.filter((message) => {
      const matchesSearch =
        message.name.toLowerCase().includes(query) ||
        message.email.toLowerCase().includes(query) ||
        message.subject.toLowerCase().includes(query) ||
        message.message.toLowerCase().includes(query);

      const matchesFilter =
        activeFilter === "all" || message.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [messages, search, activeFilter]);

  function openMessage(message) {
    setSelectedId(message.id);
    setReply("");
    setNotice("");

    if (message.status === "unread") {
      setMessages((current) =>
        current.map((item) =>
          item.id === message.id ? { ...item, status: "read" } : item
        )
      );
    }
  }

  function markAsUnread(id) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, status: "unread" } : message
      )
    );

    setNotice("Message marked as unread.");
  }

  function sendReply(event) {
    event.preventDefault();

    if (!reply.trim() || !selectedMessage) return;

    setMessages((current) =>
      current.map((message) =>
        message.id === selectedMessage.id
          ? { ...message, status: "replied" }
          : message
      )
    );

    setReply("");
    setNotice("Demo reply recorded. No email was sent.");
  }

  return (
    <section className="admin-messages">
      <div className="messages-page-header">
        <div>
          <span className="messages-eyebrow">COMMUNICATION</span>
          <h1>Messages</h1>
          <p>Manage enquiries and keep track of conversations.</p>
        </div>

        <div className="messages-header-icon">
          <MessageSquare size={23} />
        </div>
      </div>

      <div className="messages-stats">
        <article className="message-stat-card">
          <div className="message-stat-icon total">
            <Mail size={19} />
          </div>
          <div>
            <span>Total messages</span>
            <strong>{stats.total}</strong>
            <small>All enquiries received</small>
          </div>
        </article>

        <article className="message-stat-card">
          <div className="message-stat-icon unread">
            <MailOpen size={19} />
          </div>
          <div>
            <span>Unread messages</span>
            <strong>{stats.unread}</strong>
            <small>Awaiting your attention</small>
          </div>
        </article>

        <article className="message-stat-card">
          <div className="message-stat-icon replied">
            <CheckCheck size={19} />
          </div>
          <div>
            <span>Replied</span>
            <strong>{stats.replied}</strong>
            <small>Marked as replied</small>
          </div>
        </article>

        <article className="message-stat-card">
          <div className="message-stat-icon read">
            <Clock3 size={19} />
          </div>
          <div>
            <span>Read</span>
            <strong>{stats.read}</strong>
            <small>Opened by admin</small>
          </div>
        </article>
      </div>

      <div className={`messages-workspace ${selectedMessage ? "has-selection" : ""}`}>
        <div className="messages-inbox">
          <div className="messages-inbox-header">
            <div>
              <h2>Inbox</h2>
              <span>{filteredMessages.length} messages</span>
            </div>

            <div className="messages-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search messages..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  type="button"
                  className="messages-clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          <div className="messages-filters">
            {[
              { label: "All", value: "all" },
              { label: "Unread", value: "unread" },
              { label: "Read", value: "read" },
              { label: "Replied", value: "replied" },
            ].map((filter) => (
              <button
                type="button"
                key={filter.value}
                className={activeFilter === filter.value ? "active" : ""}
                onClick={() => setActiveFilter(filter.value)}
              >
                {filter.label}
                {filter.value === "unread" && stats.unread > 0 && (
                  <span className="filter-count">{stats.unread}</span>
                )}
              </button>
            ))}
          </div>

          <div className="messages-list">
            {filteredMessages.map((message) => (
              <button
                type="button"
                key={message.id}
                className={`message-item ${
                  selectedId === message.id ? "selected" : ""
                } ${message.status === "unread" ? "is-unread" : ""}`}
                onClick={() => openMessage(message)}
              >
                <div className="message-avatar">
                  {message.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="message-item-content">
                  <div className="message-item-top">
                    <strong>{message.name}</strong>
                    <span>{message.date}</span>
                  </div>

                  <h3>{message.subject}</h3>
                  <p>{message.message}</p>

                  <div className="message-item-bottom">
                    <span className={`message-status ${message.status}`}>
                      {formatStatus(message.status)}
                    </span>
                    <span>{message.time}</span>
                  </div>
                </div>
              </button>
            ))}

            {filteredMessages.length === 0 && (
              <div className="messages-empty">
                <Mail size={28} />
                <h3>No messages found</h3>
                <p>Try a different search or filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("all");
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="message-details">
          {selectedMessage ? (
            <>
              <div className="message-details-header">
                <div>
                  <span className="messages-eyebrow">MESSAGE DETAILS</span>
                  <h2>Conversation</h2>
                </div>

                <button
                  type="button"
                  className="message-close-details"
                  onClick={() => {
                    setSelectedId(null);
                    setNotice("");
                  }}
                  aria-label="Close message details"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="message-subject">
                <span>SUBJECT</span>
                <h3>{selectedMessage.subject}</h3>
                <span className={`message-status ${selectedMessage.status}`}>
                  {formatStatus(selectedMessage.status)}
                </span>
              </div>

              <div className="message-sender">
                <div className="message-avatar large">
                  {selectedMessage.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </div>

                <div className="message-sender-info">
                  <strong>{selectedMessage.name}</strong>
                  <a href={`mailto:${selectedMessage.email}`}>
                    {selectedMessage.email}
                  </a>
                  <span>
                    {selectedMessage.date} at {selectedMessage.time}
                  </span>
                </div>
              </div>

              <div className="message-body">
                <p>{selectedMessage.message}</p>
              </div>

              {notice && (
                <div className="message-notice" role="status">
                  {notice}
                </div>
              )}

              <form className="message-reply-form" onSubmit={sendReply}>
                <label htmlFor="message-reply">Reply to this message</label>
                <textarea
                  id="message-reply"
                  rows={5}
                  placeholder="Write your response here..."
                  value={reply}
                  onChange={(event) => setReply(event.target.value)}
                />

                <div className="message-reply-footer">
                  <button
                    type="button"
                    className="message-mark-unread"
                    onClick={() => markAsUnread(selectedMessage.id)}
                  >
                    <MailOpen size={16} />
                    Mark unread
                  </button>

                  <button
                    type="submit"
                    className="message-send-reply"
                    disabled={!reply.trim()}
                  >
                    <Send size={16} />
                    Record reply
                  </button>
                </div>

                <p className="message-demo-note">
                  Demo interface only. Replies are not sent by email.
                </p>
              </form>
            </>
          ) : (
            <div className="message-details-empty">
              <div className="message-empty-icon">
                <UserRound size={28} />
              </div>
              <h2>Select a message</h2>
              <p>
                Choose a message from your inbox to read its details and
                prepare a reply.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
