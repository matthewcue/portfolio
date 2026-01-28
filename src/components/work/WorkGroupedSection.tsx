import { motion, useReducedMotion } from "framer-motion";
import {
  BoltIcon,
  CloudIcon,
  LifebuoyIcon,
  ServerIcon,
  Squares2X2Icon,
  WifiIcon
} from "@heroicons/react/24/outline";
import Container from "../Container";
import Icon from "../Icon";
import WorkCard from "./WorkCard";
import { WorkItem, WorkTrack } from "../../content/work";

interface WorkGroupedSectionProps {
  items: WorkItem[];
}

const trackOrder: WorkTrack[] = [
  "support",
  "systems",
  "networking",
  "automation",
  "cloud",
  "other"
];

const trackMeta: Record<
  WorkTrack,
  { title: string; description: string; icon: typeof LifebuoyIcon }
> = {
  support: {
    title: "Support & Systems",
    description: "Hands-on troubleshooting, keeping endpoints usable.",
    icon: LifebuoyIcon
  },
  systems: {
    title: "Systems & OS",
    description: "Linux/Windows basics, VMs, server-side practice.",
    icon: ServerIcon
  },
  networking: {
    title: "Networking",
    description: "Wi-Fi, DNS, small network setups.",
    icon: WifiIcon
  },
  automation: {
    title: "Automation & Scripts",
    description: "Small scripts and tools to reduce repetitive tasks.",
    icon: BoltIcon
  },
  cloud: {
    title: "Cloud & Security",
    description: "Cloud fundamentals and security-related experiments.",
    icon: CloudIcon
  },
  other: {
    title: "Other",
    description: "Work that doesn’t fit neatly into the above categories.",
    icon: Squares2X2Icon
  }
};

const WorkGroupedSection = ({ items }: WorkGroupedSectionProps) => {
  const prefersReducedMotion = useReducedMotion();

  const groups = trackOrder.reduce<Record<WorkTrack, WorkItem[]>>(
    (acc, track) => {
      acc[track] = items.filter((item) => item.track === track);
      return acc;
    },
    {
      support: [],
      systems: [],
      networking: [],
      automation: [],
      cloud: [],
      other: []
    }
  );

  return (
    <section className="work-section" aria-labelledby="work-grouped-title">
      <Container>
        <header className="work-section__header">
          <p className="section-label">Grouped by track</p>
          <h2 id="work-grouped-title">Work themes I keep returning to.</h2>
          <p className="section-description">
            Each track highlights the kinds of problems I like to solve and the tools I practice with.
          </p>
        </header>

        <div className="work-grouped">
          {trackOrder.map((track) => {
            const trackItems = groups[track];
            if (!trackItems.length) {
              return null;
            }

            const meta = trackMeta[track];
            const TrackIcon = meta.icon;

            return (
              <motion.section
                key={track}
                className="work-track"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <header className="work-track__header">
                  <span className="work-track__icon" aria-hidden="true">
                    <Icon size={20}>
                      <TrackIcon />
                    </Icon>
                  </span>
                  <div>
                    <h3>{meta.title}</h3>
                    <p className="muted">{meta.description}</p>
                  </div>
                </header>
                <div className="work-card-grid">
                  {trackItems.map((item) => (
                    <WorkCard key={`${track}-${item.slug}`} item={item} />
                  ))}
                </div>
              </motion.section>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default WorkGroupedSection;
