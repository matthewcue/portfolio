import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import SiteLayout from "./layout/SiteLayout";
import ThemeProvider from "./theme/ThemeProvider";
import { CursorProvider } from "./cursor/CursorContext";
import HomePage from "./pages/HomePage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import WorkPage from "./pages/WorkPage";
import LabDetailPage from "./pages/LabDetailPage";
import SkillsPage from "./pages/SkillsPage";
import WritingPage from "./pages/WritingPage";
import PostDetailPage from "./pages/PostDetailPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

// Routes are defined here so the router tree stays easy to scan.
const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/lab" element={<Navigate to="/work" replace />} />
          <Route path="/lab/:slug" element={<LabDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/writing" element={<WritingPage />} />
          <Route path="/writing/:slug" element={<PostDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/resume" element={<Navigate to="/about" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <BrowserRouter>
    {/* ThemeProvider owns light/dark state and localStorage persistence. */}
    <ThemeProvider>
      {/* CursorProvider lets interactive components opt into cursor effects. */}
      <CursorProvider>
        <AppRoutes />
      </CursorProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
