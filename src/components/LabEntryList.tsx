import Card from "./Card";
import Badge from "./Badge";
import { LabEntry } from "../content/labEntries";

const LabEntryList = ({ entries }: { entries: LabEntry[] }) => (
  <div className="grid">
    {entries.map((entry) => (
      <Card key={entry.slug}>
        <Badge label={entry.category} tone="accent" />
        <h3>{entry.title}</h3>
        <p className="muted">{new Date(entry.date).toLocaleDateString()}</p>
        <p>{entry.summary}</p>
        <div className="meta-list">
          <strong>Lessons</strong>
          <ul>
            {entry.lessons.slice(0, 2).map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </div>
      </Card>
    ))}
  </div>
);

export default LabEntryList;
