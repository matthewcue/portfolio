import Badge from "./Badge";
import { SkillArea } from "../content/skills";

const SkillsMatrix = ({ areas }: { areas: SkillArea[] }) => (
  <div className="skills-matrix">
    {areas.map((area) => (
      <div key={area.id} className="skill-area">
        <h3>{area.title}</h3>
        {area.description && <p className="muted">{area.description}</p>}
        <div className="skill-grid">
          {area.skills.map((skill) => (
            <div key={skill.name} className="skill-item">
              <div className="skill-header">
                <strong>{skill.name}</strong>
                <Badge label={skill.level} tone="accent" />
              </div>
              {skill.notes && <p className="muted">{skill.notes}</p>}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default SkillsMatrix;
