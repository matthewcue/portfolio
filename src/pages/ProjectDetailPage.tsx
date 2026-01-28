import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import ProjectMeta from "../components/ProjectMeta";
import projects from "../content/projects";

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <PageTransition>
        <h1>Project not found</h1>
        <p>We couldn’t find that project. Try the full list instead.</p>
        <Link className="text-link" to="/work">
          Back to work →
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <header className="detail-hero">
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="lead">{project.summary}</p>
        {project.startDate && (
          <p className="muted">
            {project.startDate}
            {project.endDate ? ` → ${project.endDate}` : ""}
          </p>
        )}
      </header>

      <div className="detail-layout">
        <div className="detail-body">
          <section>
            <h2>Context</h2>
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          {project.highlights && (
            <section>
              <h2>What I did</h2>
              <ul>
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          )}

          {project.outcome && (
            <section>
              <h2>Outcome</h2>
              <p>{project.outcome}</p>
            </section>
          )}

          <section>
            <h2>Next improvements</h2>
            <p>
              I plan to add more automation and better monitoring to make this
              project closer to production readiness.
            </p>
          </section>
        </div>

        <ProjectMeta project={project} />
      </div>
    </PageTransition>
  );
};

export default ProjectDetailPage;
