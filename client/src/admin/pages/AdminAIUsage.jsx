import { useMemo, useState } from "react";
import {
  BrainCircuit,
  Activity,
  MessageSquare,
  Coins,
  Search,
  Eye,
  X,
  ChevronDown,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import "./AdminAIUsage.css";

const initialUsage = [
  {
    id: "AI-2001",
    student: "Amara Williams",
    email: "amara.williams@example.com",
    feature: "AI Teacher",
    plan: "Premium+",
    requests: 42,
    tokens: 18400,
    cost: 1250,
    status: "Completed",
    date: "Oct 16, 2026",
  },
  {
    id: "AI-2002",
    student: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    feature: "Project Guide",
    plan: "Premium",
    requests: 28,
    tokens: 12300,
    cost: 840,
    status: "Completed",
    date: "Oct 16, 2026",
  },
  {
    id: "AI-2003",
    student: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    feature: "Text Assistant",
    plan: "Free",
    requests: 15,
    tokens: 5100,
    cost: 350,
    status: "Completed",
    date: "Oct 15, 2026",
  },
  {
    id: "AI-2004",
    student: "Faith Ibrahim",
    email: "faith.ibrahim@example.com",
    feature: "AI Teacher",
    plan: "Premium+",
    requests: 64,
    tokens: 26700,
    cost: 1900,
    status: "Completed",
    date: "Oct 15, 2026",
  },
  {
    id: "AI-2005",
    student: "Grace Adeyemi",
    email: "grace.adeyemi@example.com",
    feature: "Project Guide",
    plan: "Premium",
    requests: 9,
    tokens: 3200,
    cost: 220,
    status: "Failed",
    date: "Oct 14, 2026",
  },
  {
    id: "AI-2006",
    student: "Michael Brown",
    email: "michael.brown@example.com",
    feature: "Text Assistant",
    plan: "Free",
    requests: 21,
    tokens: 7600,
    cost: 510,
    status: "Completed",
    date: "Oct 14, 2026",
  },
  {
    id: "AI-2007",
    student: "Esther Musa",
    email: "esther.musa@example.com",
    feature: "AI Teacher",
    plan: "Premium+",
    requests: 33,
    tokens: 14100,
    cost: 980,
    status: "Processing",
    date: "Oct 13, 2026",
  },
];

const initialDailyUsage = [
  { day: "Oct 10", requests: 120 },
  { day: "Oct 11", requests: 165 },
  { day: "Oct 12", requests: 142 },
  { day: "Oct 13", requests: 210 },
  { day: "Oct 14", requests: 185 },
  { day: "Oct 15", requests: 248 },
  { day: "Oct 16", requests: 196 },
];

function formatNumber(value) {
  return new Intl.NumberFormat("en-NG").format(value);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

function AdminAIUsage() {
  const [usage, setUsage] = useState(initialUsage);
  const [search, setSearch] = useState("");
  const [featureFilter, setFeatureFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedUsage, setSelectedUsage] = useState(null);

  const filteredUsage = useMemo(() => {
    return usage.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        item.student.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query);

      const matchesFeature =
        featureFilter === "All" || item.feature === featureFilter;

      const matchesStatus =
        statusFilter === "All" || item.status === statusFilter;

      return matchesSearch && matchesFeature && matchesStatus;
    });
  }, [usage, search, featureFilter, statusFilter]);

  const totalRequests = usage.reduce(
    (total, item) => total + item.requests,
    0
  );

  const totalTokens = usage.reduce(
    (total, item) => total + item.tokens,
    0
  );

  const totalCost = usage.reduce(
    (total, item) => total + item.cost,
    0
  );

  const failedRequests = usage.filter(
    (item) => item.status === "Failed"
  ).length;

  const dailyTotal = initialDailyUsage.reduce(
    (total, item) => total + item.requests,
    0
  );

  function updateUsageStatus(id, nextStatus) {
    setUsage((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status: nextStatus } : item
      )
    );

    if (selectedUsage?.id === id) {
      setSelectedUsage((current) => ({
        ...current,
        status: nextStatus,
      }));
    }
  }

  return (
    <main className="admin-ai-usage">
      <header className="admin-ai-heading">
        <div>
          <span className="admin-ai-eyebrow">
            ARTIFICIAL INTELLIGENCE
          </span>
          <h1>AI Usage</h1>
          <p>
            Monitor AI activity, requests, token consumption, and estimated
            usage costs.
          </p>
        </div>

        <div className="admin-ai-live-label">
          <span />
          Demo monitoring
        </div>
      </header>

      <section className="admin-ai-stats">
        <article className="admin-ai-stat-card">
          <div className="admin-ai-stat-icon gold">
            <Activity size={21} />
          </div>
          <div>
            <span>Total Requests</span>
            <h2>{formatNumber(totalRequests)}</h2>
            <p>
              <ArrowUpRight size={14} />
              Across demo records
            </p>
          </div>
        </article>

        <article className="admin-ai-stat-card">
          <div className="admin-ai-stat-icon blue">
            <BrainCircuit size={21} />
          </div>
          <div>
            <span>Tokens Used</span>
            <h2>{formatNumber(totalTokens)}</h2>
            <p>Input and output estimate</p>
          </div>
        </article>

        <article className="admin-ai-stat-card">
          <div className="admin-ai-stat-icon green">
            <Coins size={21} />
          </div>
          <div>
            <span>Estimated Cost</span>
            <h2>{formatCurrency(totalCost)}</h2>
            <p>Illustrative NGN amount</p>
          </div>
        </article>

        <article className="admin-ai-stat-card">
          <div className="admin-ai-stat-icon red">
            <MessageSquare size={21} />
          </div>
          <div>
            <span>Failed Records</span>
            <h2>{failedRequests}</h2>
            <p>Marked as failed</p>
          </div>
        </article>
      </section>

      <section className="admin-ai-overview-grid">
        <article className="admin-ai-panel admin-ai-chart-panel">
          <div className="admin-ai-panel-heading">
            <div>
              <h2>Request Activity</h2>
              <p>Illustrative daily request volume</p>
            </div>
            <span className="admin-ai-panel-icon">
              <Activity size={18} />
            </span>
          </div>

          <div className="admin-ai-chart">
            {initialDailyUsage.map((item) => (
              <div className="admin-ai-chart-column" key={item.day}>
                <span className="admin-ai-chart-value">
                  {item.requests}
                </span>
                <div className="admin-ai-chart-bar-wrap">
                  <div
                    className="admin-ai-chart-bar"
                    style={{
                      height: `${(item.requests / 260) * 100}%`,
                    }}
                  />
                </div>
                <span className="admin-ai-chart-day">{item.day}</span>
              </div>
            ))}
          </div>

          <div className="admin-ai-chart-footer">
            <span>
              <span className="admin-ai-legend-dot" />
              AI requests
            </span>
            <strong>{formatNumber(dailyTotal)} total</strong>
          </div>
        </article>

        <article className="admin-ai-panel admin-ai-feature-panel">
          <div className="admin-ai-panel-heading">
            <div>
              <h2>AI Feature Usage</h2>
              <p>Request distribution in sample data</p>
            </div>
            <Zap size={19} className="admin-ai-feature-heading-icon" />
          </div>

          {[
            {
              name: "AI Teacher",
              description: "Interactive AI learning",
              requests: usage
                .filter((item) => item.feature === "AI Teacher")
                .reduce((sum, item) => sum + item.requests, 0),
              icon: BrainCircuit,
              className: "teacher",
            },
            {
              name: "Project Guide",
              description: "Projects and assignments",
              requests: usage
                .filter((item) => item.feature === "Project Guide")
                .reduce((sum, item) => sum + item.requests, 0),
              icon: GraduationCapIcon,
              className: "guide",
            },
            {
              name: "Text Assistant",
              description: "Text-based AI support",
              requests: usage
                .filter((item) => item.feature === "Text Assistant")
                .reduce((sum, item) => sum + item.requests, 0),
              icon: MessageSquare,
              className: "assistant",
            },
          ].map((feature) => {
            const FeatureIcon = feature.icon;
            const percentage =
              totalRequests > 0
                ? (feature.requests / totalRequests) * 100
                : 0;

            return (
              <div className="admin-ai-feature" key={feature.name}>
                <div className={`admin-ai-feature-icon ${feature.className}`}>
                  <FeatureIcon size={18} />
                </div>

                <div className="admin-ai-feature-main">
                  <div className="admin-ai-feature-info">
                    <div>
                      <strong>{feature.name}</strong>
                      <span>{feature.description}</span>
                    </div>
                    <strong>{formatNumber(feature.requests)}</strong>
                  </div>

                  <div className="admin-ai-feature-track">
                    <div style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="admin-ai-feature-note">
            Feature totals are calculated from the displayed demo records.
          </div>
        </article>
      </section>

      <section className="admin-ai-panel admin-ai-activity-panel">
        <div className="admin-ai-panel-heading admin-ai-activity-heading">
          <div>
            <h2>AI Activity Records</h2>
            <p>Inspect usage records and update their demo status.</p>
          </div>

          <span className="admin-ai-record-count">
            {filteredUsage.length} records
          </span>
        </div>

        <div className="admin-ai-toolbar">
          <div className="admin-ai-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search student or record ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <label className="admin-ai-filter">
            <select
              value={featureFilter}
              onChange={(event) => setFeatureFilter(event.target.value)}
              aria-label="Filter by AI feature"
            >
              <option value="All">All features</option>
              <option value="AI Teacher">AI Teacher</option>
              <option value="Project Guide">Project Guide</option>
              <option value="Text Assistant">Text Assistant</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="admin-ai-filter">
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              aria-label="Filter by status"
            >
              <option value="All">All statuses</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Failed">Failed</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>

        <div className="admin-ai-table-wrap">
          <table className="admin-ai-table">
            <thead>
              <tr>
                <th>RECORD</th>
                <th>STUDENT</th>
                <th>AI FEATURE</th>
                <th>REQUESTS</th>
                <th>TOKENS</th>
                <th>EST. COST</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsage.map((item) => (
                <tr key={item.id}>
                  <td>
                    <span className="admin-ai-record-id">{item.id}</span>
                    <span className="admin-ai-record-date">{item.date}</span>
                  </td>

                  <td>
                    <div className="admin-ai-student">
                      <strong>{item.student}</strong>
                      <span>{item.email}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-ai-feature-badge feature-${item.feature
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {item.feature}
                    </span>
                  </td>

                  <td>{formatNumber(item.requests)}</td>
                  <td>{formatNumber(item.tokens)}</td>

                  <td className="admin-ai-cost">
                    {formatCurrency(item.cost)}
                  </td>

                  <td>
                    <span
                      className={`admin-ai-status status-${item.status.toLowerCase()}`}
                    >
                      <span />
                      {item.status}
                    </span>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="admin-ai-view-button"
                      title="View usage details"
                      onClick={() => setSelectedUsage(item)}
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsage.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="admin-ai-empty">
                      <BrainCircuit size={30} />
                      <h3>No usage records found</h3>
                      <p>Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="admin-ai-table-footer">
          <span>
            Showing {filteredUsage.length} of {usage.length} records
          </span>
          <span>Demo data · Costs are illustrative</span>
        </footer>
      </section>

      {selectedUsage && (
        <div
          className="admin-ai-overlay"
          onClick={() => setSelectedUsage(null)}
        >
          <section
            className="admin-ai-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-ai-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="admin-ai-modal-heading">
              <div>
                <span>USAGE RECORD DETAILS</span>
                <h2 id="admin-ai-modal-title">{selectedUsage.id}</h2>
              </div>

              <button
                type="button"
                aria-label="Close usage details"
                onClick={() => setSelectedUsage(null)}
              >
                <X size={20} />
              </button>
            </header>

            <div className="admin-ai-modal-feature">
              <div>
                <BrainCircuit size={23} />
              </div>
              <section>
                <h3>{selectedUsage.feature}</h3>
                <p>{selectedUsage.plan} subscription</p>
              </section>
            </div>

            <div className="admin-ai-modal-details">
              <div>
                <span>Student</span>
                <strong>{selectedUsage.student}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{selectedUsage.email}</strong>
              </div>
              <div>
                <span>Requests</span>
                <strong>{formatNumber(selectedUsage.requests)}</strong>
              </div>
              <div>
                <span>Tokens consumed</span>
                <strong>{formatNumber(selectedUsage.tokens)}</strong>
              </div>
              <div>
                <span>Estimated cost</span>
                <strong>{formatCurrency(selectedUsage.cost)}</strong>
              </div>
              <div>
                <span>Date</span>
                <strong>{selectedUsage.date}</strong>
              </div>
              <div>
                <span>Status</span>
                <span
                  className={`admin-ai-status status-${selectedUsage.status.toLowerCase()}`}
                >
                  <span />
                  {selectedUsage.status}
                </span>
              </div>
            </div>

            <div className="admin-ai-modal-actions">
              {selectedUsage.status !== "Completed" && (
                <button
                  type="button"
                  className="admin-ai-mark-completed"
                  onClick={() =>
                    updateUsageStatus(selectedUsage.id, "Completed")
                  }
                >
                  Mark as completed
                </button>
              )}

              {selectedUsage.status !== "Failed" && (
                <button
                  type="button"
                  className="admin-ai-mark-failed"
                  onClick={() =>
                    updateUsageStatus(selectedUsage.id, "Failed")
                  }
                >
                  Mark as failed
                </button>
              )}

              <button
                type="button"
                className="admin-ai-close-modal"
                onClick={() => setSelectedUsage(null)}
              >
                Close details
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

function GraduationCapIcon(props) {
  return <BrainCircuit {...props} />;
}

export default AdminAIUsage;
