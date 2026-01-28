import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";
import profile from "../../content/profile";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useTheme } from "../../theme/ThemeProvider";
import heroImage from "../../assets/matthew_cue_heroimage.svg";

const AboutHero = () => {
  const prefersReducedMotion = useReducedMotion();
  const { accentColor, accentColorSoft } = useTheme();
  const resumeInNewTab = profile.resumeUrl.endsWith(".pdf") || profile.resumeUrl.startsWith("http");

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
    show: { opacity: 1, y: 0 }
  };

  const accentStyles = {
    "--about-accent": accentColor,
    "--about-accent-soft": accentColorSoft
  } as CSSProperties;

  return (
    <motion.section
      className="about-section about-hero"
      aria-labelledby="about-hero-title"
      style={accentStyles}
    >
      <div className="about-hero__grid">
        <motion.div
          className="about-hero__copy"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.span className="about-hero__overline" variants={itemVariants}>
            About
          </motion.span>
          <motion.h1 id="about-hero-title" variants={itemVariants}>
            Hi, I&apos;m {profile.fullName}.
          </motion.h1>
          <motion.h2 className="about-hero__headline" variants={itemVariants}>
            Entry-level IT support / sysadmin, bringing customer experience into systems work.
          </motion.h2>
          {/* Edit the paragraph below to match your voice and experience. */}
          <motion.p className="about-hero__intro" variants={itemVariants}>
            I studied Information Technology and built a small homelab so I could get comfortable
            breaking and fixing things on my own time. Most of my experience so far has been helping
            people around me—friends, classmates, family—get their machines and accounts back into a
            usable state. I like work that sits between people and systems: listening carefully,
            fixing calmly, and then tightening things up so the same problem is less likely next
            time.
          </motion.p>
          <motion.div className="about-hero__actions" variants={itemVariants}>
            {/* Update the resumeUrl in src/content/profile.ts to point to your real PDF. */}
            <PrimaryButton
              href={profile.resumeUrl}
              target={resumeInNewTab ? "_blank" : undefined}
              rel={resumeInNewTab ? "noreferrer" : undefined}
            >
              Download resume (PDF)
            </PrimaryButton>
            <SecondaryButton href={`mailto:${profile.email}`}>Email me</SecondaryButton>
          </motion.div>
          <motion.p className="about-hero__caption" variants={itemVariants}>
            Full, ATS-friendly resume; updated as I grow this site and my homelab.
          </motion.p>
        </motion.div>

        <motion.div
          className="about-hero__media"
          initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="about-hero__media-card"
            data-reduced-motion={prefersReducedMotion}
          >
            {/* Replace this image with a real portrait (matthew_cue_heroimage.png) when available. */}
            <img src={heroImage} alt={`${profile.fullName} portrait`} loading="lazy" />
            <span className="about-hero__badge">
              Based in {profile.location} · Open to remote
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AboutHero;
