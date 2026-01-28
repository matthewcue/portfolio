import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SiteLayout from "./layout/SiteLayout";
import ThemeProvider from "./theme/ThemeProvider";
import { TypographyProvider } from "./theme/TypographyProvider";
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
  return (
    <Routes>
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
  );
};

const App = () => (
  <BrowserRouter>
    {/* ThemeProvider owns light/dark state and localStorage persistence. */}
    <ThemeProvider>
      <TypographyProvider>
        {/* CursorProvider lets interactive components opt into cursor effects. */}
        <CursorProvider>
          <AppRoutes />
        </CursorProvider>
      </TypographyProvider>
    </ThemeProvider>
  </BrowserRouter>
);

export default App;
