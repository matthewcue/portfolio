import { useMemo, useState } from "react";
import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import ProjectList from "../components/ProjectList";
import projects, { ProjectCategory } from "../content/projects";

const categories: ("all" | ProjectCategory)[] = [
  "all",
  "it-ops",
  "security",
  "dev",
  "data",
  "other"
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | ProjectCategory>("all");
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "all" || project.category === activeCategory;
      const matchesFeatured = !featuredOnly || project.featured;
      return matchesCategory && matchesFeatured;
    });
  }, [activeCategory, featuredOnly]);

  return (
    <PageTransition>
      <Section
        title="Projects"
        description="Hands-on projects focused on IT operations, security, and automation."
      >
        <div className="filters">
          <div className="filter-group">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={
                  activeCategory === category
                    ? "filter-button active"
                    : "filter-button"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
          <label className="filter-toggle">
            <input
              type="checkbox"
              checked={featuredOnly}
              onChange={(event) => setFeaturedOnly(event.target.checked)}
            />
            Featured only
          </label>
        </div>
        <ProjectList projects={filteredProjects} />
      </Section>
    </PageTransition>
  );
};

export default ProjectsPage;
