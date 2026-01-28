import PageTransition from "../components/PageTransition";
import Section from "../components/Section";
import SkillsMatrix from "../components/SkillsMatrix";
import RoadmapTimeline from "../components/RoadmapTimeline";
import { skillAreas, roadmapItems } from "../content/skills";

const SkillsPage = () => (
  <PageTransition>
    <Section
      title="Skills overview"
      description="Focused on IT support, sysadmin fundamentals, and growing cloud skills."
    >
      <p>
        I am building depth in troubleshooting and operations while expanding
        into automation and cloud services.
      </p>
    </Section>

    <Section title="Skills matrix" description="Grouped by area for quick scanning.">
      <SkillsMatrix areas={skillAreas} />
    </Section>

    <Section title="Roadmap" description="What I am planning and actively learning next.">
      <RoadmapTimeline items={roadmapItems} />
    </Section>
  </PageTransition>
);

export default SkillsPage;
