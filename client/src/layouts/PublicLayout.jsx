import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import Footer from "../components/navigation/Footer";
import LoadingIntro from "../components/common/LoadingIntro";
import "./PublicLayout.css";

function PublicLayout() {
  const location = useLocation();

  return (
    <PublicLayoutContent
      key={location.pathname}
      pathname={location.pathname}
    />
  );
}

function PublicLayoutContent({ pathname }) {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="public-layout">
      {!introFinished && (
        <LoadingIntro
          pathname={pathname}
          onComplete={() => setIntroFinished(true)}
        />
      )}

      <Navbar />

      <main className="public-main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default PublicLayout;