import { motion, useReducedMotion } from "framer-motion";

const OutsideWorkSection = () => {
  const prefersReducedMotion = useReducedMotion();

  const cards = [
    {
      title: "I like understanding how things fit together.",
      body:
        "Whether it’s rebuilding a PC, organizing a home network, or tweaking a keyboard, I enjoy the small details that make day-to-day use smoother."
    },
    {
      title: "I enjoy helping people feel less stressed about tech.",
      body:
        "I’m the person friends text when something stops working. I try to leave them with a bit more understanding, not just a quick fix."
    },
    {
      title: "I keep learning outside of work.",
      body:
        "I read tech blogs, watch talks, and experiment in my homelab to understand changes before they show up in the workplace."
    }
  ];

  return (
    <motion.section
      className="about-section"
      aria-labelledby="about-outside-title"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="about-section__header">
        <h2 id="about-outside-title">Outside of work.</h2>
        {/* Swap these short vignettes with your own hobbies and interests. */}
      </header>
      <div className="about-outside-grid">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            className="about-outside-card"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.08 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3>{card.title}</h3>
            <p className="muted">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default OutsideWorkSection;
