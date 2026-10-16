import {
  BookOpen,
  Users,
  GraduationCap,
  MessageSquare,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Clock3,
  MoreHorizontal,
} from "lucide-react";
import "./AdminDashboard.css";

const overviewStats = [
  {
    title: "Total Courses",
    value: "24",
    change: "+12.5%",
    description: "Compared with last month",
    icon: BookOpen,
    tone: "gold",
  },
  {
    title: "Total Students",
    value: "1,284",
    change: "+8.2%",
    description: "Compared with last month",
    icon: Users,
    tone: "blue",
  },
  {
    title: "Enrollments",
    value: "856",
    change: "+14.6%",
    description: "Compared with last month",
    icon: GraduationCap,
    tone: "purple",
  },
  {
    title: "Messages",
    value: "18",
    change: "6 unread",
    description: "Awaiting your attention",
    icon: MessageSquare,
    tone: "green",
  },
];

const recentEnrollments = [
  {
    name: "Amara Johnson",
    course: "Frontend Development",
    date: "Oct 15, 2026",
    status: "Active",
  },
  {
    name: "Daniel Williams",
    course: "Software Engineering",
    date: "Oct 14, 2026",
    status: "Active",
  },
  {
    name: "Sarah Okafor",
    course: "Backend Development",
    date: "Oct 14, 2026",
    status: "Pending",
  },
  {
    name: "Michael James",
    course: "Frontend Development",
    date: "Oct 13, 2026",
    status: "Active",
  },
];

const recentMessages = [
  {
    name: "Grace Thompson",
    subject: "Course enrollment question",
    time: "12 minutes ago",
    unread: true,
  },
  {
    name: "David Anderson",
    subject: "Certificate assistance",
    time: "1 hour ago",
    unread: true,
  },
  {
    name: "Esther Bello",
    subject: "Partnership enquiry",
    time: "3 hours ago",
    unread: false,
  },
];

const enrollmentActivity = [
  { month: "May", value: 42 },
  { month: "Jun", value: 58 },
  { month: "Jul", value: 47 },
  { month: "Aug", value: 76 },
  { month: "Sep", value: 63 },
  { month: "Oct", value: 91 },
];

function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <section className="admin-dashboard-heading">
        <div>
          <p className="admin-dashboard-eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Welcome back. Here is what is happening at your academy.
          </p>
        </div>

        <button
          type="button"
          className="admin-dashboard-primary-action"
        >
          <Plus size={18} />
          Add New Course
        </button>
      </section>

      <section className="admin-dashboard-stats">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              className="admin-dashboard-stat-card"
              key={stat.title}
            >
              <div className="admin-dashboard-stat-top">
                <span
                  className={`admin-dashboard-stat-icon ${stat.tone}`}
                >
                  <Icon size={21} />
                </span>

                <button
                  type="button"
                  className="admin-dashboard-icon-button"
                  aria-label={`More options for ${stat.title}`}
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <p className="admin-dashboard-stat-label">
                {stat.title}
              </p>

              <div className="admin-dashboard-stat-value-row">
                <h2>{stat.value}</h2>
                <span className="admin-dashboard-stat-change">
                  {stat.change}
                </span>
              </div>

              <p className="admin-dashboard-stat-description">
                {stat.description}
              </p>
            </article>
          );
        })}
      </section>

      <section className="admin-dashboard-main-grid">
        <article className="admin-dashboard-panel admin-dashboard-activity">
          <div className="admin-dashboard-panel-heading">
            <div>
              <h2>Enrollment Activity</h2>
              <p>Student enrollment overview</p>
            </div>

            <span className="admin-dashboard-period">
              Last 6 months
            </span>
          </div>

          <div className="admin-dashboard-chart">
            <div className="admin-dashboard-chart-scale">
              <span>100</span>
              <span>75</span>
              <span>50</span>
              <span>25</span>
              <span>0</span>
            </div>

            <div className="admin-dashboard-chart-content">
              <div className="admin-dashboard-chart-grid">
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>

              <div className="admin-dashboard-bars">
                {enrollmentActivity.map((item) => (
                  <div
                    className="admin-dashboard-bar-group"
                    key={item.month}
                  >
                    <div className="admin-dashboard-bar-track">
                      <div
                        className={`admin-dashboard-bar ${
                          item.month === "Oct" ? "highlight" : ""
                        }`}
                        style={{ height: `${item.value}%` }}
                        title={`${item.value} enrollments`}
                      />
                    </div>

                    <span>{item.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="admin-dashboard-chart-footer">
            <span>
              <i className="admin-dashboard-chart-legend" />
              Enrollments
            </span>

            <strong>
              +18.4% <ArrowUpRight size={15} />
            </strong>
          </div>
        </article>

        <article className="admin-dashboard-panel admin-dashboard-messages">
          <div className="admin-dashboard-panel-heading">
            <div>
              <h2>Recent Messages</h2>
              <p>Your latest inbox activity</p>
            </div>

            <a
              href="/admin/messages"
              className="admin-dashboard-text-action"
            >
              View all <ArrowRight size={15} />
            </a>
          </div>

          <div className="admin-dashboard-message-list">
            {recentMessages.map((message) => (
              <div
                className="admin-dashboard-message"
                key={message.name}
              >
                <span className="admin-dashboard-message-avatar">
                  {message.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </span>

                <div className="admin-dashboard-message-content">
                  <div className="admin-dashboard-message-title">
                    <h3>{message.name}</h3>

                    {message.unread && (
                      <span className="admin-dashboard-unread-dot" />
                    )}
                  </div>

                  <p>{message.subject}</p>

                  <span className="admin-dashboard-message-time">
                    <Clock3 size={12} />
                    {message.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>

      <section className="admin-dashboard-panel admin-dashboard-enrollments">
        <div className="admin-dashboard-panel-heading">
          <div>
            <h2>Recent Enrollments</h2>
            <p>Latest students joining your academy</p>
          </div>

          <a
            href="/admin/enrollments"
            className="admin-dashboard-text-action"
          >
            View enrollments <ArrowRight size={15} />
          </a>
        </div>

        <div className="admin-dashboard-table-wrap">
          <table className="admin-dashboard-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Enrollment date</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>

            <tbody>
              {recentEnrollments.map((enrollment) => (
                <tr key={enrollment.name}>
                  <td>
                    <div className="admin-dashboard-student">
                      <span className="admin-dashboard-student-avatar">
                        {enrollment.name
                          .split(" ")
                          .map((part) => part[0])
                          .join("")}
                      </span>

                      <strong>{enrollment.name}</strong>
                    </div>
                  </td>

                  <td>{enrollment.course}</td>
                  <td>{enrollment.date}</td>

                  <td>
                    <span
                      className={`admin-dashboard-status ${
                        enrollment.status === "Active"
                          ? "active"
                          : "pending"
                      }`}
                    >
                      {enrollment.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-dashboard-icon-button"
                      aria-label={`More actions for ${enrollment.name}`}
                    >
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;