import { useMemo, useState } from "react";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  GraduationCap,
  Eye,
  MoreHorizontal,
  X,
  Mail,
  CalendarDays,
  BookOpen,
  ChevronDown,
} from "lucide-react";
import "./AdminStudents.css";

const initialStudents = [
  {
    id: 1,
    name: "Daniel Johnson",
    email: "daniel.johnson@example.com",
    plan: "Premium",
    courses: 4,
    progress: 78,
    status: "Active",
    joined: "Oct 02, 2026",
  },
  {
    id: 2,
    name: "Amara Williams",
    email: "amara.williams@example.com",
    plan: "Premium+",
    courses: 6,
    progress: 92,
    status: "Active",
    joined: "Sep 28, 2026",
  },
  {
    id: 3,
    name: "Samuel Okafor",
    email: "samuel.okafor@example.com",
    plan: "Free",
    courses: 2,
    progress: 35,
    status: "Active",
    joined: "Sep 25, 2026",
  },
  {
    id: 4,
    name: "Grace Adeyemi",
    email: "grace.adeyemi@example.com",
    plan: "Premium",
    courses: 3,
    progress: 64,
    status: "Inactive",
    joined: "Sep 19, 2026",
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    plan: "Free",
    courses: 1,
    progress: 18,
    status: "Active",
    joined: "Sep 15, 2026",
  },
  {
    id: 6,
    name: "Faith Ibrahim",
    email: "faith.ibrahim@example.com",
    plan: "Premium+",
    courses: 5,
    progress: 86,
    status: "Active",
    joined: "Sep 10, 2026",
  },
  {
    id: 7,
    name: "David James",
    email: "david.james@example.com",
    plan: "Premium",
    courses: 2,
    progress: 42,
    status: "Suspended",
    joined: "Sep 04, 2026",
  },
  {
    id: 8,
    name: "Esther Musa",
    email: "esther.musa@example.com",
    plan: "Free",
    courses: 1,
    progress: 12,
    status: "Active",
    joined: "Aug 30, 2026",
  },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function AdminStudents() {
  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [planFilter, setPlanFilter] = useState("All");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(search.toLowerCase()) ||
        student.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || student.status === statusFilter;

      const matchesPlan =
        planFilter === "All" || student.plan === planFilter;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [students, search, statusFilter, planFilter]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const premiumStudents = students.filter(
    (student) => student.plan !== "Free"
  ).length;

  const suspendedStudents = students.filter(
    (student) => student.status === "Suspended"
  ).length;

  function toggleStudentStatus(student) {
    const nextStatus =
      student.status === "Suspended" ? "Active" : "Suspended";

    setStudents((currentStudents) =>
      currentStudents.map((item) =>
        item.id === student.id
          ? { ...item, status: nextStatus }
          : item
      )
    );

    if (selectedStudent?.id === student.id) {
      setSelectedStudent({ ...student, status: nextStatus });
    }

    setActiveMenu(null);
  }

  return (
    <main className="admin-students">
      <div className="admin-students-heading">
        <div>
          <span className="admin-students-eyebrow">
            USER MANAGEMENT
          </span>
          <h1>Students</h1>
          <p>Manage student accounts, subscriptions, and learning progress.</p>
        </div>

        <div className="admin-students-total">
          <Users size={18} />
          <span>{students.length} total students</span>
        </div>
      </div>

      <section className="admin-students-stats">
        <article className="admin-students-stat-card">
          <div className="admin-students-stat-icon gold">
            <Users size={21} />
          </div>
          <div>
            <span>Total Students</span>
            <h2>{students.length}</h2>
            <p>Registered accounts</p>
          </div>
        </article>

        <article className="admin-students-stat-card">
          <div className="admin-students-stat-icon green">
            <UserCheck size={21} />
          </div>
          <div>
            <span>Active Students</span>
            <h2>{activeStudents}</h2>
            <p>Currently active</p>
          </div>
        </article>

        <article className="admin-students-stat-card">
          <div className="admin-students-stat-icon blue">
            <GraduationCap size={21} />
          </div>
          <div>
            <span>Paid Subscribers</span>
            <h2>{premiumStudents}</h2>
            <p>Premium and Premium+</p>
          </div>
        </article>

        <article className="admin-students-stat-card">
          <div className="admin-students-stat-icon red">
            <UserX size={21} />
          </div>
          <div>
            <span>Suspended</span>
            <h2>{suspendedStudents}</h2>
            <p>Restricted accounts</p>
          </div>
        </article>
      </section>

      <section className="admin-students-content">
        <div className="admin-students-content-heading">
          <div>
            <h2>All Students</h2>
            <p>View and manage every student account.</p>
          </div>

          <span className="admin-students-result-count">
            {filteredStudents.length} results
          </span>
        </div>

        <div className="admin-students-toolbar">
          <div className="admin-students-search">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search name or email..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <label className="admin-students-filter">
            <span>Status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="All">All statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
            <ChevronDown size={15} />
          </label>

          <label className="admin-students-filter">
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

        <div className="admin-students-table-wrap">
          <table className="admin-students-table">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>PLAN</th>
                <th>COURSES</th>
                <th>LEARNING PROGRESS</th>
                <th>STATUS</th>
                <th>JOINED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td>
                    <div className="admin-student-identity">
                      <div className="admin-student-avatar">
                        {getInitials(student.name)}
                      </div>
                      <div>
                        <strong>{student.name}</strong>
                        <span>{student.email}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-student-plan plan-${student.plan
                        .toLowerCase()
                        .replace("+", "plus")}`}
                    >
                      {student.plan}
                    </span>
                  </td>

                  <td>
                    <span className="admin-student-course-count">
                      <BookOpen size={14} />
                      {student.courses}
                    </span>
                  </td>

                  <td>
                    <div className="admin-student-progress">
                      <div className="admin-student-progress-label">
                        <span>Overall</span>
                        <strong>{student.progress}%</strong>
                      </div>
                      <div className="admin-student-progress-track">
                        <div
                          style={{ width: `${student.progress}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`admin-student-status status-${student.status.toLowerCase()}`}
                    >
                      <span />
                      {student.status}
                    </span>
                  </td>

                  <td className="admin-student-joined">
                    {student.joined}
                  </td>

                  <td>
                    <div className="admin-student-actions">
                      <button
                        type="button"
                        className="admin-student-action-btn"
                        title="View student"
                        onClick={() => {
                          setSelectedStudent(student);
                          setActiveMenu(null);
                        }}
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        className="admin-student-action-btn"
                        title="More actions"
                        onClick={() =>
                          setActiveMenu(
                            activeMenu === student.id ? null : student.id
                          )
                        }
                      >
                        <MoreHorizontal size={18} />
                      </button>

                      {activeMenu === student.id && (
                        <div className="admin-student-action-menu">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedStudent(student);
                              setActiveMenu(null);
                            }}
                          >
                            <Eye size={15} />
                            View details
                          </button>

                          <button
                            type="button"
                            className={
                              student.status === "Suspended"
                                ? "menu-activate"
                                : "menu-suspend"
                            }
                            onClick={() => toggleStudentStatus(student)}
                          >
                            {student.status === "Suspended"
                              ? "Reactivate account"
                              : "Suspend account"}
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7">
                    <div className="admin-students-empty">
                      <Users size={30} />
                      <h3>No students found</h3>
                      <p>
                        Try changing your search or filter settings.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="admin-students-table-footer">
          <span>
            Showing {filteredStudents.length} of {students.length} students
          </span>
          <span>Demo data · UI preview</span>
        </div>
      </section>

      {selectedStudent && (
        <div
          className="admin-students-modal-overlay"
          onClick={() => setSelectedStudent(null)}
        >
          <section
            className="admin-students-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-student-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="admin-students-modal-header">
              <div>
                <span>STUDENT PROFILE</span>
                <h2 id="admin-student-modal-title">Student Details</h2>
              </div>

              <button
                type="button"
                aria-label="Close student details"
                onClick={() => setSelectedStudent(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="admin-students-profile">
              <div className="admin-students-profile-avatar">
                {getInitials(selectedStudent.name)}
              </div>
              <h3>{selectedStudent.name}</h3>
              <p>{selectedStudent.email}</p>
              <span
                className={`admin-student-status status-${selectedStudent.status.toLowerCase()}`}
              >
                <span />
                {selectedStudent.status}
              </span>
            </div>

            <div className="admin-students-profile-details">
              <div>
                <span>
                  <GraduationCap size={16} /> Subscription
                </span>
                <strong>{selectedStudent.plan}</strong>
              </div>

              <div>
                <span>
                  <BookOpen size={16} /> Enrolled courses
                </span>
                <strong>{selectedStudent.courses}</strong>
              </div>

              <div>
                <span>
                  <CalendarDays size={16} /> Registration date
                </span>
                <strong>{selectedStudent.joined}</strong>
              </div>

              <div>
                <span>
                  <UserCheck size={16} /> Learning progress
                </span>
                <strong>{selectedStudent.progress}%</strong>
              </div>
            </div>

            <div className="admin-students-modal-actions">
              <a href={`mailto:${selectedStudent.email}`}>
                <Mail size={16} />
                Contact Student
              </a>

              <button
                type="button"
                className={
                  selectedStudent.status === "Suspended"
                    ? "admin-student-reactivate"
                    : "admin-student-suspend"
                }
                onClick={() => toggleStudentStatus(selectedStudent)}
              >
                {selectedStudent.status === "Suspended"
                  ? "Reactivate Account"
                  : "Suspend Account"}
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default AdminStudents;
