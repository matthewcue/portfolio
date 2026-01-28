import { motion, useReducedMotion } from "framer-motion";

const LookingForSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.section
      className="about-section about-looking"
      aria-labelledby="about-looking-title"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="about-looking__inner">
        <h2 id="about-looking-title">What I&apos;m looking for.</h2>
        <p className="muted">
          I&apos;m looking for junior IT support, help desk, or junior sysadmin roles where I can support
          users directly and keep learning from more experienced teammates. I&apos;m especially interested
          in teams that value clear documentation, mentorship, and have a path toward more systems,
          cloud, or security work over time.
        </p>
        <div className="about-looking__lists">
          <div className="about-looking__list">
            <h3>Best fit</h3>
            <ul>
              <li>Teams that support a mix of Windows and macOS endpoints</li>
              <li>Places where clear documentation is valued</li>
              <li>Roles with a path into more systems/cloud work</li>
            </ul>
          </div>
          <div className="about-looking__list">
            <h3>Nice to have</h3>
            <ul>
              <li>Exposure to AWS/Azure</li>
              <li>Dedicated time to study for certifications</li>
              <li>Chances to automate repetitive tasks over time</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LookingForSection;
