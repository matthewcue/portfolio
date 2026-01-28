import Badge from "./Badge";
import { RoadmapItem } from "../content/skills";

const RoadmapTimeline = ({ items }: { items: RoadmapItem[] }) => (
  <ol className="timeline">
    {items.map((item) => (
      <li key={item.id} className="timeline-item">
        <div className="timeline-header">
          <h4>{item.title}</h4>
          <Badge label={item.status} tone="accent" />
        </div>
        {item.description && <p>{item.description}</p>}
        {item.targetDate && (
          <p className="muted">Target: {item.targetDate}</p>
        )}
      </li>
    ))}
  </ol>
);

export default RoadmapTimeline;
