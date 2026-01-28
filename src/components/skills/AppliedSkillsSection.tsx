import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Container from "../Container";
import Icon from "../Icon";
import { useCursor } from "../../cursor/CursorContext";
import { Project } from "../../content/projects";
import { LabEntry } from "../../content/labEntries";

const AppliedSkillsSection = ({
  projects,
  labEntries
}: {
  projects: Project[];
  labEntries: LabEntry[];
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { setInteractive } = useCursor();

  const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);
  const highlightedLabs = labEntries.slice(0, 3);

  return (
    <section className="skills-section" aria-labelledby="applied-title" id="applied-skills">
      <Container>
        <header className="skills-section__header">
          <p className="section-label">Applied experience</p>
          <h2 id="applied-title">Where I&apos;ve used these skills.</h2>
          <p className="section-description">
            I use these skills in a small homelab and personal projects that mirror the work I&apos;d do
            on a team.
          </p>
        </header>

        <div className="applied-grid">
          <motion.div
            className="applied-column"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="applied-column__title">Projects</h3>
            <div className="applied-card-grid">
              {featuredProjects.map((project) => (
                <Link
                  key={project.slug}
                  to={`/projects/${project.slug}`}
                  className="applied-card"
                  onPointerEnter={() => setInteractive(true)}
                  onPointerLeave={() => setInteractive(false)}
                >
                  <div className="applied-card__header">
                    <h4>{project.title}</h4>
                    <Icon size={18}>
                      <ArrowRightIcon />
                    </Icon>
                  </div>
                  <p className="muted">{project.summary}</p>
                  <div className="applied-tags">
                    {project.stack.map((item) => (
                      <span key={`${project.slug}-${item}`} className="skill-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="applied-skills">
                    <span className="applied-skills__label">Skills used:</span>
                    <div className="applied-tags">
                      {project.skillsDemonstrated.map((skill) => (
                        <span key={`${project.slug}-${skill}`} className="skill-tag skill-tag--ghost">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="applied-link">View project →</span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="applied-column"
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="applied-column__title">Lab notes</h3>
            <div className="applied-card-grid">
              {highlightedLabs.map((lab) => (
                <Link
                  key={lab.slug}
                  to="/work"
                  className="applied-card"
                  onPointerEnter={() => setInteractive(true)}
                  onPointerLeave={() => setInteractive(false)}
                >
                  <div className="applied-card__header">
                    <h4>{lab.title}</h4>
                    <Icon size={18}>
                      <ArrowRightIcon />
                    </Icon>
                  </div>
                  <p className="muted">{new Date(lab.date).toLocaleDateString()}</p>
                  <p>{lab.summary}</p>
                  {lab.skillsUsed && (
                    <div className="applied-skills">
                      <span className="applied-skills__label">Skills used:</span>
                      <div className="applied-tags">
                        {lab.skillsUsed.map((skill) => (
                          <span key={`${lab.slug}-${skill}`} className="skill-tag skill-tag--ghost">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <span className="applied-link">View lab note →</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AppliedSkillsSection;
