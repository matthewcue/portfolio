import { Link, useParams } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import labEntries from "../content/labEntries";

const formatStatus = (status?: string) => {
  if (!status) return "In progress";
  return status
    .split("-")
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(" ");
};

const LabDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = labEntries.find((item) => item.slug === slug);

  if (!entry) {
    return (
      <PageTransition>
        <h1>Lab note not found</h1>
        <p>We couldn’t find that lab entry. Try the applied work list instead.</p>
        <Link className="text-link" to="/work">
          Back to work →
        </Link>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <header className="detail-hero">
        <p className="eyebrow">{entry.category}</p>
        <h1>{entry.title}</h1>
        <p className="lead">{entry.summary}</p>
        <p className="muted">{new Date(entry.date).toLocaleDateString()}</p>
      </header>

      <div className="detail-layout">
        <div className="detail-body">
          <section>
            <h2>Context</h2>
            <p>{entry.context}</p>
          </section>

          <section>
            <h2>Steps</h2>
            <ul>
              {entry.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Lessons learned</h2>
            <ul>
              {entry.lessons.map((lesson) => (
                <li key={lesson}>{lesson}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="project-meta">
          <h3>Lab details</h3>
          <div className="meta-list">
            <ul>
              <li>
                <strong>Status:</strong> {formatStatus(entry.status)}
              </li>
              {entry.skillsUsed && entry.skillsUsed.length > 0 && (
                <li>
                  <strong>Skills used:</strong> {entry.skillsUsed.join(", ")}
                </li>
              )}
              {entry.relatedProjects && entry.relatedProjects.length > 0 && (
                <li>
                  <strong>Related projects:</strong> {entry.relatedProjects.join(", ")}
                </li>
              )}
            </ul>
          </div>
        </aside>
      </div>

      <Link className="text-link" to="/work">
        Back to work →
      </Link>
    </PageTransition>
  );
};

export default LabDetailPage;
