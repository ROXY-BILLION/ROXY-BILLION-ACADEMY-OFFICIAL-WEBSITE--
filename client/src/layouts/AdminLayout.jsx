import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <span className="admin-brand">Roxy Billion Academy</span>
        <span className="admin-label">Administration</span>
      </header>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;