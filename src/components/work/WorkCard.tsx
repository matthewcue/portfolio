import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { useCursor } from "../../cursor/CursorContext";
import { WorkItem, WorkTrack } from "../../content/work";

interface WorkCardProps {
  item: WorkItem;
}

const trackLabels: Record<WorkTrack, string> = {
  support: "Support & Systems",
  systems: "Systems & OS",
  networking: "Networking",
  automation: "Automation & Scripts",
  cloud: "Cloud & Security",
  other: "Other"
};

const formatStatus = (status?: WorkItem["status"]) => {
  if (!status) return "In progress";
  return status
    .split("-")
    .map((segment) => segment[0]?.toUpperCase() + segment.slice(1))
    .join(" ");
};

const WorkCard = ({ item }: WorkCardProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { setInteractive } = useCursor();

  const detailPath = item.kind === "project" ? `/projects/${item.slug}` : `/lab/${item.slug}`;
  const detailLabel = item.kind === "project" ? "View project" : "View lab note";
  const skills = item.skills.slice(0, 4);

  return (
    <motion.article
      className="work-card"
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onPointerEnter={() => setInteractive(true)}
      onPointerLeave={() => setInteractive(false)}
    >
      <div className="work-card__badges">
        <span className="badge badge-accent">{item.kind === "project" ? "Project" : "Lab"}</span>
        <span className="badge">{trackLabels[item.track]}</span>
      </div>
      <h3 className="work-card__title">{item.title}</h3>
      <p className="muted">{item.summary}</p>

      <div className="work-card__skills">
        <span className="work-card__meta-label">Skills used:</span>
        <div className="work-card__skill-row">
          {skills.map((skill) => (
            <span key={`${item.slug}-${skill}`} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="work-card__meta">
        {item.kind === "project" ? (
          <span>
            Type: Project · Status: {formatStatus(item.status)}
          </span>
        ) : (
          <span>
            Type: Lab note
            {item.lab.category ? ` · Category: ${item.lab.category}` : ""}
          </span>
        )}
      </div>

      <Link
        className="text-link"
        to={detailPath}
        onPointerEnter={() => setInteractive(true)}
        onPointerLeave={() => setInteractive(false)}
      >
        {detailLabel} →
      </Link>
    </motion.article>
  );
};

export default WorkCard;
