import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";

// Shared shell for all pages: header, main content, and footer.
const SiteLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app-shell">
      <Navbar />
      <main className={`app-main ${isHome ? "home-main" : ""}`.trim()}>
        {isHome ? (
          <Outlet />
        ) : (
          <Container>
            <Outlet />
          </Container>
        )}
      </main>
      {!isHome && <Footer />}
    </div>
  );
};

export default SiteLayout;
