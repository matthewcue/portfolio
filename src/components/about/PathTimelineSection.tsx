import { motion, useReducedMotion } from "framer-motion";

const PathTimelineSection = () => {
  const prefersReducedMotion = useReducedMotion();

  const entries = [
    {
      title: "B.S. in Information Technology",
      subtext: "University Name · YYYY–YYYY",
      notes: ["Coursework in networking, operating systems, and databases."]
    },
    {
      title: "Built and maintained a personal homelab",
      subtext: "Hands-on practice",
      notes: ["Windows and Linux VMs.", "Basic services and lightweight monitoring."]
    },
    {
      title: "Informal IT support for friends, classmates, and family",
      subtext: "Support experience",
      notes: [
        "OS troubleshooting and reinstallations.",
        "Wi-Fi, DNS, and VPN issues.",
        "Account and basic security hygiene."
      ]
    },
    {
      title: "Deepening skills in cloud and security",
      subtext: "Current focus",
      notes: ["Studying AWS/Azure fundamentals.", "Preparing for CompTIA Security+."]
    },
    {
      title: "Today",
      subtext: "Open to the next step",
      notes: [
        "Looking for entry-level IT support / sysadmin roles where I can contribute and keep learning."
      ]
    }
  ];

  return (
    <motion.section
      className="about-section"
      aria-labelledby="about-path-title"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="about-section__header">
        <h2 id="about-path-title">Path &amp; timeline.</h2>
        <p className="muted">
          A quick view of the steps that got me here and the direction I&apos;m headed next.
        </p>
      </header>
      <div className="about-timeline">
        <div className="about-timeline__line" aria-hidden="true" />
        <div className="about-timeline__entries">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.title}
              className="about-timeline__entry"
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="about-timeline__marker" aria-hidden="true" />
              <div className="about-timeline__content">
                <h3>{entry.title}</h3>
                <p className="about-timeline__subtext">{entry.subtext}</p>
                <ul>
                  {entry.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PathTimelineSection;
