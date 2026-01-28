import { Link } from "react-router-dom";
import Card from "./Card";
import TagPill from "./TagPill";
import Badge from "./Badge";
import { Project } from "../content/projects";

interface ProjectListProps {
  projects: Project[];
}

const ProjectList = ({ projects }: ProjectListProps) => (
  <div className="grid">
    {projects.map((project) => (
      <Card key={project.slug}>
        <div className="card-header">
          <Badge label={project.category} tone="accent" />
          {project.status && <Badge label={project.status} tone="neutral" />}
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="tag-row">
          {project.stack.slice(0, 5).map((item) => (
            <TagPill key={item} label={item} />
          ))}
        </div>
        <Link className="text-link" to={`/projects/${project.slug}`}>
          View project →
        </Link>
      </Card>
    ))}
  </div>
);

export default ProjectList;
