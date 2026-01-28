import { motion, useReducedMotion } from "framer-motion";
import {
  AdjustmentsHorizontalIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
  LifebuoyIcon
} from "@heroicons/react/24/outline";
import Icon from "../Icon";

const HowIWorkSection = () => {
  const prefersReducedMotion = useReducedMotion();

  const blocks = [
    {
      title: "Calm troubleshooting",
      icon: LifebuoyIcon,
      bullets: [
        "Talks users through issues step by step.",
        "Keeps notes so fixes can be repeated.",
        "Tries the simple explanations first."
      ]
    },
    {
      title: "Systems thinking (junior level)",
      icon: AdjustmentsHorizontalIcon,
      bullets: [
        "Looks for patterns across tickets or incidents.",
        "Notices when the same fix keeps reappearing.",
        "Suggests small automation or documentation improvements."
      ]
    },
    {
      title: "Communication",
      icon: ChatBubbleLeftRightIcon,
      bullets: [
        "Explains options before making changes.",
        "Writes clear, short messages and tickets.",
        "Knows when to ask for help."
      ]
    },
    {
      title: "Learning habit",
      icon: BookOpenIcon,
      bullets: [
        "Keeps a running list of topics to revisit.",
        "Practices in homelab before suggesting changes.",
        "Preps for certs with a ‘how would this help at work?’ mindset."
      ]
    }
  ];

  return (
    <motion.section
      className="about-section"
      aria-labelledby="about-work-title"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="about-work-grid">
        <div className="about-work-copy">
          <h2 id="about-work-title">How I work.</h2>
          {/* Adjust this paragraph to match your tone and process. */}
          <p className="muted">
            I like to be the calm person in the room when something’s broken. I ask questions, write
            things down, and try to leave systems a little better than I found them.
          </p>
        </div>
        <div className="about-work-cards">
          {blocks.map((block, index) => {
            const BlockIcon = block.icon;
            return (
              <motion.div
                key={block.title}
                className="about-work-card"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="about-work-card__icon">
                  <Icon>
                    <BlockIcon />
                  </Icon>
                </div>
                <h3>{block.title}</h3>
                <ul>
                  {block.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default HowIWorkSection;
