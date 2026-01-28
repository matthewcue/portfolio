import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../../content/profile";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useCursor } from "../../cursor/CursorContext";

const AboutCtaSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { setInteractive } = useCursor();

  return (
    <motion.section
      className="about-section about-cta"
      aria-labelledby="about-cta-title"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="about-cta__inner">
        <h2 id="about-cta-title">
          If you&apos;re hiring for junior IT support, help desk, or junior sysadmin roles, I&apos;d love to
          hear from you.
        </h2>
        <div className="about-cta__actions">
          <PrimaryButton href="/matthew-cue_resume.pdf" download>
          <PrimaryButton href={profile.resumeUrl} download>
            Download resume (PDF)
          </PrimaryButton>
          <SecondaryButton href={`mailto:${profile.email}`}>Email me</SecondaryButton>
        </div>
        <p className="about-cta__links">
          You can also see my{" "}
          <Link
            to="/skills"
            className="text-link"
            onPointerEnter={() => setInteractive(true)}
            onPointerLeave={() => setInteractive(false)}
          >
            skills matrix and roadmap
          </Link>
          , and how I apply them in my{" "}
          <Link
            to="/work"
            className="text-link"
            onPointerEnter={() => setInteractive(true)}
            onPointerLeave={() => setInteractive(false)}
          >
            applied work
          </Link>
          .
        </p>
      </div>
    </motion.section>
  );
};

export default AboutCtaSection;
