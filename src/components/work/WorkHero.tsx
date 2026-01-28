import { motion, useReducedMotion } from "framer-motion";
import Container from "../Container";

const WorkHero = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.section
      className="work-hero"
      aria-labelledby="work-hero-title"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <Container>
        <div className="work-hero__inner">
          <motion.p className="section-label" variants={itemVariants}>
            Applied work
          </motion.p>
          <motion.h1 id="work-hero-title" variants={itemVariants}>
            Where I&apos;ve used my skills so far.
          </motion.h1>
          <motion.p className="work-hero__copy" variants={itemVariants}>
            This page pulls together my hands-on projects and lab notes into one view so it&apos;s easy
            to scan what I&apos;ve practiced. I focus on support workflows, systems fundamentals, and
            repeatable automation that keeps environments reliable.
          </motion.p>
          <motion.div className="work-hero__chips" variants={itemVariants}>
            {[
              "Hands-on troubleshooting",
              "Homelab & VMs",
              "Networking & connectivity",
              "Automation & scripting"
            ].map((chip) => (
              <span key={chip} className="work-hero__chip">
                {chip}
              </span>
            ))}
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default WorkHero;
