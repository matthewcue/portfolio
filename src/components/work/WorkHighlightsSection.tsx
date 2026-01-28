import Container from "../Container";
import WorkCard from "./WorkCard";
import { WorkItem } from "../../content/work";

interface WorkHighlightsSectionProps {
  items: WorkItem[];
}

const WorkHighlightsSection = ({ items }: WorkHighlightsSectionProps) => {
  const highlights = items.filter((item) => item.featured);
  const displayItems = highlights.length > 0 ? highlights : items.slice(0, 4);

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <section className="work-section" aria-labelledby="work-highlights-title">
      <Container>
        <header className="work-section__header">
          <p className="section-label">Highlights</p>
          <h2 id="work-highlights-title">Featured applied work.</h2>
          <p className="section-description">
            A quick snapshot of the projects and lab notes that best represent my current focus.
          </p>
        </header>
        <div className="work-highlights-grid">
          {displayItems.map((item) => (
            <WorkCard key={`${item.kind}-${item.slug}`} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkHighlightsSection;
