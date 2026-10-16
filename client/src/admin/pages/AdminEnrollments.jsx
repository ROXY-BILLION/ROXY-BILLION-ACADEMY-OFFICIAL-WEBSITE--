import { useMemo, useState } from "react";
import {
  Search,
  BookOpen,
  Users,
  CheckCircle2,
  Clock3,
  Eye,
  MoreHorizontal,
  X,
  GraduationCap,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import "./AdminEnrollments.css";

const initialEnrollments = [
  {
    id: "ENR-1001",
    student: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    course: "Web Development Fundamentals",
    category: "Frontend Development",
    plan: "Free",
    progress: 78,
    status: "Active",
    date: "Oct 14, 2026",
    payment: "Not required",
  },
  {
    id: "ENR-1002",
    student: "Amara Williams",
    email: "amara.williams@example.com",
    course: "MERN Stack Development",
    category: "Software Engineering",
    plan: "Premium+",
    progress: 92,
    status: "Completed",
    date: "Oct 12, 2026",
    payment: "Paid",
  },
  {
    id: "ENR-1003",
    student: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    course: "Backend API Development",
    category: "Backend Development",
    plan: "Premium",
    progress: 35,
    status: "Active",
    date: "Oct 10, 2026",
    payment: "Paid",
  },
  {
    id: "ENR-1004",
    student: "Grace Adeyemi",
    email: "grace.adeyemi@example.com",
    course: "Introduction to Business",
    category: "Business & Entrepreneurship",
    plan: "Premium",
    progress: 64,
    status: "Active",
    date: "Oct 08, 2026",
    payment: "Paid",
  },
  {
    id: "ENR-1005",
    student: "Michael Brown",
    email: "michael.brown@example.com",
    course: "Web Development Fundamentals",
    category: "Frontend Development",
    plan: "Free",
    progress: 18,
    status: "Active",
    date: "Oct 06, 2026",
    payment: "Not required",
  },
  {
    id: "ENR-1006",
    student: "Faith Ibrahim",
    email: "faith.ibrahim@example.com",
    course: "Advanced React Applications",
    category: "Frontend Development",
    plan: "Premium+",
    progress: 0,
    status: "Pending",
    date: "Oct 04, 2026",
    payment: "Pending",
  },
  {
    id: "ENR-1007",
    student: "David James",
    email: "david.james@example.com",
    course: "Backend API Development",
    category: "Backend Development",
    plan: "Premium",
    progress: 42,
    status: "Cancelled",
    date: "Sep 29, 2026",
    payment: "Refunded",
  },
  {
    id: "ENR-1008",
    student: "Esther Musa",
    email: "esther.musa@example.com",
    course: "MERN Stack Development",
    category: "Software Engineering",
    plan: "Premium",
    progress: 12,
    status: "Pending",
    date: "Sep 25, 2026",
    payment: "Pending",
  },
];

function AdminEnrollments() {
  const [enrollments, setEnrollments] = useState(initialEnrollments);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredEnrollments = useMemo(() => {
    return enrollments.filter((enrollment) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        enrollment.student.toLowerCase().includes(searchText) ||
        enrollment.email.toLowerCase().includes(searchText) ||
        enrollment.course.toLowerCase().includes(searchText) ||
        enrollment.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || enrollment.status === statusFilter;

      const matchesPlan =
        planFilter === "All" || enrollment.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [enrollments, search, statusFilter, planFilter]);

  const activeCount = enrollments.filter(
    (item) => item.status === "Active"
  ).length;

  const completedCount = enrollments.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingCount = enrollments.filter(
    (item) => item.status === "Pending"
  ).length;

  function updateEnrollmentStatus(enrollment, nextStatus) {
    setEnrollments((current) =>
      current.map((item) =>
        item.id === enrollment.id
          ? { ...item, status: nextStatus }
          : item
      )
    );

    if (selectedEnrollment?.id === enrollment.id) {
      setSelectedEnrollment({
        ...enrollment,
        status: nextStatus,
      });
    }

    setActiveMenu(null);
  }

  return (
    <main className="admin-enrollments">
      <header className="admin-enrollments-heading">
        <div>
          <span className="admin-enrollments-eyebrow">
            LEARNING MANAGEMENT
          </span>
          <h1>Enrollments</h1>
          <p>
            Track course registrations, student progress, and enrollment
            status.
          </p>
        </div>

        <div className="admin-enrollments-total">
          <BookOpen size={18} />
          <span>{enrollments.length} enrollments</span>
        </div>
      </header>

      <section className="admin-enrollments-stats">
        <article className="admin-enrollments-stat">
          <div className="admin-enrollments-stat-icon gold">
            <Users size={21} />
          </div>
          <div>
            <span>Total Enrollments</span>
            <h2>{enrollments.length}</h2>
            <p>All course registrations</p>
          </div>
        </article>

        <article className="admin-enrollments-stat">
          <div className="admin-enrollments-stat-icon green">
            <BookOpen size={21} />
          </div>
          <div>
            <span>Active</span>
            <h2>{activeCount}</h2>
            <p>Currently learning</p>
          </div>
        </article>

        <article className="admin-enrollments-stat">
          <div className="admin-enrollments-stat-icon blue">
            <CheckCircle2 size={21} />
          </div>
          <div>
            <span>Completed</span>
            <h2>{completedCount}</h2>
            <p>Finished courses</p>
          </div>
        </article>

        <article className="admin-enrollments-stat">
          <div className="admin-enrollments-stat-icon orange">
            <Clock3 size={21} />
          </div>
          <div>
            <span>Pending</span>
            <h2>{pendingCount}</h2>
            <p>Awaiting activation</p>
          </div>
        </article>
      </section>

      <section className="admin-enrollments-panel">
        <div className="admin-enrollments-panel-heading">
          <div>
            <h2>All Enrollments</h2>
            <p>Review and manage student course registrations.</p>
          </div>

          <span className="admin-enrollments-count">
            {filteredEnrollments.length} results
          </span>
        </div>

        <div className="admin-enrollments-toolbar">
          <div className="admin-enrollments-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search student, course or ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <label className="admin-enrollments-filter">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="admin-enrollments-filter">
            <span>Plan</span>
            <select
              value={planFilter}
              onChange={(event) => setPlanFilter(event.target.value)}
            >
              <option value="All">All plans</option>
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
              <option value="Premium+">Premium+</option>
            </select>
            <ChevronDown size={15} />
          </label>
        </div>

        <div className="admin-enrollments-table-wrap">
          <table className="admin-enrollments-table">
            <thead>
              <tr>
                <th>ENROLLMENT</th>
                <th>STUDENT</th>
                <th>COURSE</th>
                <th>PLAN</th>
                <th>PROGRESS</th>
                <th>STATUS</th>
                <th>ENROLLED ON</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredEnrollments.map((enrollment) => (
                <tr key={enrollment.id}>
                  <td>
                    <span className="admin-enrollment-id">
                      {enrollment.id}
                    </span>
                  </td>

                  <td>
                    <div className="admin-enrollment-student">
                      <strong>{enrollment.student}</strong>
                      <span>{enrollment.email}</span>
                    </div>
                  </td>

                  <td>
                    <div className="admin-enrollment-course">
                      <strong>{enrollment.course}</strong>
                      <span>{enrollment.category}</span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-enrollment-plan plan-${enrollment.plan
                        .toLowerCase()
                        .replace("+", "plus")}`}
                    >
                      {enrollment.plan}
                    </span>
                  </td>

                  <td>
                    <div className="admin-enrollment-progress">
                      <div>
                        <span>{enrollment.progress}%</span>
                      </div>
                      <div className="admin-enrollment-progress-track">
                        <span
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-enrollment-status status-${enrollment.status.toLowerCase()}`}
                    >
                      <span />
                      {enrollment.status}
                    </span>
                  </td>

                  <td className="admin-enrollment-date">
                    {enrollment.date}
                  </td>

                  <td>
                    <div className="admin-enrollment-actions">
                      <button
                        type="button"
                        title="View enrollment"
                        onClick={() => {
                          setSelectedEnrollment(enrollment);
                          setActiveMenu(null);
                        }}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        title="More actions"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === enrollment.id
                              ? null
                              : enrollment.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenu === enrollment.id && (
                        <div className="admin-enrollment-menu">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedEnrollment(enrollment);
                              setActiveMenu(null);
                            }}
                          >
                            View details
                          </button>

                          {enrollment.status === "Pending" && (
                            <button
                              type="button"
                              className="menu-activate"
                              onClick={() =>
                                updateEnrollmentStatus(
                                  enrollment,
                                  "Active"
                                )
                              }
                            >
                              Activate enrollment
                            </button>
                          )}

                          {enrollment.status === "Active" && (
                            <button
                              type="button"
                              className="menu-complete"
                              onClick={() =>
                                updateEnrollmentStatus(
                                  enrollment,
                                  "Completed"
                                )
                              }
                            >
                              Mark completed
                            </button>
                          )}

                          {enrollment.status !== "Cancelled" &&
                            enrollment.status !== "Completed" && (
                              <button
                                type="button"
                                className="menu-cancel"
                                onClick={() =>
                                  updateEnrollmentStatus(
                                    enrollment,
                                    "Cancelled"
                                  )
                                }
                              >
                                Cancel enrollment
                              </button>
                            )}

                          {enrollment.status === "Cancelled" && (
                            <button
                              type="button"
                              className="menu-activate"
                              onClick={() =>
                                updateEnrollmentStatus(
                                  enrollment,
                                  "Active"
                                )
                              }
                            >
                              Reactivate enrollment
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredEnrollments.length === 0 && (
                <tr>
                  <td colSpan="8">
                    <div className="admin-enrollments-empty">
                      <BookOpen size={30} />
                      <h3>No enrollments found</h3>
                      <p>Try another search term or filter.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="admin-enrollments-footer">
          <span>
            Showing {filteredEnrollments.length} of {enrollments.length}{" "}
            enrollments
          </span>
          <span>Demo data · UI preview</span>
        </footer>
      </section>

      {selectedEnrollment && (
        <div
          className="admin-enrollments-overlay"
          onClick={() => setSelectedEnrollment(null)}
        >
          <section
            className="admin-enrollments-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-enrollment-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="admin-enrollments-modal-heading">
              <div>
                <span>ENROLLMENT DETAILS</span>
                <h2 id="admin-enrollment-modal-title">
                  {selectedEnrollment.id}
                </h2>
              </div>

              <button
                type="button"
                aria-label="Close enrollment details"
                onClick={() => setSelectedEnrollment(null)}
              >
                <X size={20} />
              </button>
            </header>

            <div className="admin-enrollment-modal-course">
              <div className="admin-enrollment-modal-icon">
                <GraduationCap size={25} />
              </div>
              <div>
                <h3>{selectedEnrollment.course}</h3>
                <p>{selectedEnrollment.category}</p>
              </div>
            </div>

            <div className="admin-enrollment-modal-details">
              <div>
                <span>Student</span>
                <strong>{selectedEnrollment.student}</strong>
              </div>

              <div>
                <span>Email address</span>
                <strong className="admin-enrollment-email">
                  {selectedEnrollment.email}
                </strong>
              </div>

              <div>
                <span>Subscription plan</span>
                <strong>{selectedEnrollment.plan}</strong>
              </div>

              <div>
                <span>Enrollment date</span>
                <strong>{selectedEnrollment.date}</strong>
              </div>

              <div>
                <span>Payment status</span>
                <strong>{selectedEnrollment.payment}</strong>
              </div>

              <div>
                <span>Enrollment status</span>
                <span
                  className={`admin-enrollment-status status-${selectedEnrollment.status.toLowerCase()}`}
                >
                  <span />
                  {selectedEnrollment.status}
                </span>
              </div>
            </div>

            <div className="admin-enrollment-modal-progress">
              <div>
                <span>Course progress</span>
                <strong>{selectedEnrollment.progress}%</strong>
              </div>
              <div className="admin-enrollment-progress-track">
                <span
                  style={{ width: `${selectedEnrollment.progress}%` }}
                />
              </div>
            </div>

            <div className="admin-enrollment-modal-actions">
              {selectedEnrollment.status === "Pending" && (
                <button
                  type="button"
                  className="enrollment-activate-btn"
                  onClick={() =>
                    updateEnrollmentStatus(
                      selectedEnrollment,
                      "Active"
                    )
                  }
                >
                  Activate enrollment
                </button>
              )}

              {selectedEnrollment.status === "Active" && (
                <button
                  type="button"
                  className="enrollment-activate-btn"
                  onClick={() =>
                    updateEnrollmentStatus(
                      selectedEnrollment,
                      "Completed"
                    )
                  }
                >
                  Mark as completed
                </button>
              )}

              {selectedEnrollment.status === "Cancelled" && (
                <button
                  type="button"
                  className="enrollment-activate-btn"
                  onClick={() =>
                    updateEnrollmentStatus(
                      selectedEnrollment,
                      "Active"
                    )
                  }
                >
                  Reactivate enrollment
                </button>
              )}

              <a href={`mailto:${selectedEnrollment.email}`}>
                <CreditCard size={16} />
                Contact student
              </a>

              <button
                type="button"
                className="enrollment-close-btn"
                onClick={() => setSelectedEnrollment(null)}
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

export default AdminEnrollments;
