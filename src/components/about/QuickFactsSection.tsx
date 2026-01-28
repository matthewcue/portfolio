import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  CheckCircleIcon,
  CpuChipIcon,
  MapPinIcon,
  UserGroupIcon
} from "@heroicons/react/24/outline";
import type { CSSProperties } from "react";
import profile from "../../content/profile";
import Icon from "../Icon";
import { useTheme } from "../../theme/ThemeProvider";

const QuickFactsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const { accentColor, accentColorSoft } = useTheme();

  const facts = [
    {
      label: "Location",
      value: `${profile.location} · Open to remote`,
      icon: MapPinIcon
    },
    {
      label: "Core roles",
      value: "Junior IT Support · Help Desk · Junior Sysadmin",
      icon: UserGroupIcon
    },
    {
      label: "Technical focus",
      value: "Windows & macOS support · Linux basics · Networking basics",
      icon: CpuChipIcon
    },
    {
      label: "Learning next",
      value: "AWS/Azure fundamentals · CompTIA Security+",
      icon: ArrowTrendingUpIcon
    },
    {
      label: "Work style",
      value: "Calm under pressure, explains fixes in plain language",
      icon: ChatBubbleLeftRightIcon
    },
    {
      label: "Availability",
      value: "Available for full-time entry-level roles",
      icon: CheckCircleIcon
    }
  ];

  const sectionStyles = {
    "--about-accent": accentColor,
    "--about-accent-soft": accentColorSoft
  } as CSSProperties;

  return (
    <motion.section
      className="about-section"
      aria-labelledby="about-facts-title"
      style={sectionStyles}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <header className="about-section__header">
        <h2 id="about-facts-title">Quick facts.</h2>
        <p className="muted">
          A quick snapshot of where I&apos;m based, what I&apos;m focused on, and how I show up.
        </p>
      </header>
      <div className="about-facts-grid">
        {facts.map((fact, index) => {
          const FactIcon = fact.icon;
          return (
            <motion.div
              key={fact.label}
              className="about-fact-card"
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: prefersReducedMotion ? 0 : index * 0.06 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="about-fact-card__icon">
                <Icon>
                  <FactIcon />
                </Icon>
              </div>
              <span className="about-fact-card__label">{fact.label}</span>
              <span className="about-fact-card__value">{fact.value}</span>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default QuickFactsSection;
