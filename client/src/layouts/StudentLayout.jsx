import { Outlet } from "react-router-dom";

function StudentLayout() {
  return (
    <div className="student-layout">
      <header className="student-header">
        <span className="student-brand">Roxy Billion Academy</span>
        <span className="student-label">Student Area</span>
      </header>

      <main className="student-main">
        <Outlet />
      </main>
    </div>
  );
}

export default StudentLayout;