import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Container from "../components/Container";

// Shared shell for all pages: header, main content, and footer.
const SiteLayout = () => (
  <div className="app-shell">
    <Navbar />
    <main className="app-main">
      <Container>
        <Outlet />
      </Container>
    </main>
    <Footer />
  </div>
);

export default SiteLayout;
