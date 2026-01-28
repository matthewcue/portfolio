import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import Container from "../Container";
import { useCursor } from "../../cursor/CursorContext";
import { WorkItem, WorkTrack } from "../../content/work";

interface WorkTimelineSectionProps {
  items: WorkItem[];
}

const trackLabels: Record<WorkTrack, string> = {
  support: "Support & Systems",
  systems: "Systems & OS",
  networking: "Networking",
  automation: "Automation & Scripts",
  cloud: "Cloud & Security",
  other: "Other"
};

const formatDate = (date?: string) => {
  if (!date) return "Date not listed";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(parsed);
};

const WorkTimelineSection = ({ items }: WorkTimelineSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { setInteractive } = useCursor();

  if (!items.length) {
    return null;
  }

  return (
    <section className="work-section" aria-labelledby="work-timeline-title">
      <Container>
        <header className="work-section__header">
          <p className="section-label">Timeline</p>
          <h2 id="work-timeline-title">Recent work in order.</h2>
          <p className="section-description">
            A chronological view of projects and lab notes, newest items first.
          </p>
        </header>
        <div className="work-timeline">
          {items.map((item) => {
            const detailPath =
              item.kind === "project" ? `/projects/${item.slug}` : `/lab/${item.slug}`;

            return (
              <motion.article
                key={`${item.kind}-${item.slug}`}
                className="work-timeline__item"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="work-timeline__badges">
                  <span className="badge badge-accent">
                    {item.kind === "project" ? "Project" : "Lab"}
                  </span>
                  <span className="badge">{trackLabels[item.track]}</span>
                </div>
                <div className="work-timeline__content">
                  <div className="work-timeline__meta">
                    <h3>{item.title}</h3>
                    <span className="muted">{formatDate(item.date)}</span>
                  </div>
                  <p className="muted">{item.summary}</p>
                  <p className="work-timeline__skills">
                    <span className="work-card__meta-label">Skills used:</span>
                    {" "}
                    {item.skills.slice(0, 3).join(", ")}
                  </p>
                  <Link
                    className="text-link"
                    to={detailPath}
                    onPointerEnter={() => setInteractive(true)}
                    onPointerLeave={() => setInteractive(false)}
                  >
                    View details →
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WorkTimelineSection;
