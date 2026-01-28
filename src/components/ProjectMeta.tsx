import TagPill from "./TagPill";
import Badge from "./Badge";
import { Project } from "../content/projects";

const ProjectMeta = ({ project }: { project: Project }) => (
  <aside className="project-meta">
    <h4>Project details</h4>
    <p><strong>Role:</strong> {project.role}</p>
    {project.status && <Badge label={project.status} tone="accent" />}
    <div className="tag-row">
      {project.stack.map((item) => (
        <TagPill key={item} label={item} />
      ))}
    </div>
    <div className="meta-list">
      <h5>Skills demonstrated</h5>
      <ul>
        {project.skillsDemonstrated.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>
    </div>
    {project.links && project.links.length > 0 && (
      <div className="meta-list">
        <h5>Links</h5>
        <ul>
          {project.links.map((link) => (
            <li key={link.url}>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )}
  </aside>
);

export default ProjectMeta;
