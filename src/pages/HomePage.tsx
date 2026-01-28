import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import TagPill from "../components/TagPill";
import ProjectList from "../components/ProjectList";
import PostList from "../components/PostList";
import LabEntryList from "../components/LabEntryList";
import profile from "../content/profile";
import projects from "../content/projects";
import labEntries from "../content/labEntries";
import posts from "../content/posts";

const HomePage = () => {
  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const latestLab = [...labEntries].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 1);
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 2);

  return (
    <PageTransition>
      <section className="hero">
        <div className="hero-content">
          <p className="eyebrow">{profile.headline}</p>
          <h1>{profile.heroIntro}</h1>
          <p className="lead">{profile.heroSubcopy}</p>
          <div className="hero-actions">
            <Link className="button" to="/projects">
              View projects
            </Link>
            <Link className="button ghost" to="/resume">
              Resume
            </Link>
          </div>
        </div>
        <div className="hero-aside">
          <p className="muted">Stack snapshot</p>
          <div className="tag-row">
            {[
              "Windows",
              "Linux",
              "Networking",
              "PowerShell",
              "Azure basics"
            ].map((item) => (
              <TagPill key={item} label={item} />
            ))}
          </div>
        </div>
      </section>

      <Section
        title="Featured projects"
        description="A few hands-on projects that highlight my support and automation skills."
      >
        <ProjectList projects={featuredProjects} />
      </Section>

      <Section
        title="Skills snapshot"
        description="Quick pillars that match the roles I am targeting."
      >
        <div className="grid grid-4">
          {[
            "Support & Troubleshooting",
            "Networking & OS",
            "Automation & Scripting",
            "Web Tools (Secondary)"
          ].map((pillar) => (
            <Link key={pillar} to="/skills" className="card">
              <h3>{pillar}</h3>
              <p className="muted">See details →</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Latest lab" description="Recent homelab and security experiments.">
        <LabEntryList entries={latestLab} />
      </Section>

      <Section title="Latest writing" description="Short notes and troubleshooting guides.">
        <PostList posts={latestPosts} />
      </Section>
    </PageTransition>
  );
};

export default HomePage;
