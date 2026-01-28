import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useCursor } from "../../cursor/CursorContext";
import { useTheme } from "../../theme/ThemeProvider";

export type SocialKind = "github" | "linkedin";

interface SocialChipProps {
  kind: SocialKind;
  label: string;
  description: string;
  href: string;
}

export const SocialChip = ({ kind, label, description, href }: SocialChipProps) => {
  const { accentColor, theme } = useTheme();
  const { setInteractive } = useCursor();
  const reduceMotion = useReducedMotion();
  const isGithub = kind === "github";

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="social-chip"
      onPointerEnter={() => setInteractive(true)}
      onPointerLeave={() => setInteractive(false)}
      onFocus={() => setInteractive(true)}
      onBlur={() => setInteractive(false)}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { y: 0, scale: 0.99 }}
      style={{ "--chip-accent": accentColor } as CSSProperties}
    >
      <div
        className="social-chip-icon"
        aria-hidden="true"
        style={{
          backgroundColor: isGithub
            ? theme === "dark"
              ? "#020617"
              : "#0f172a"
            : "#0a66c2"
        }}
      >
        {/* Swap these glyphs for real logos if you add a brand icon set later. */}
        <span className="social-chip-glyph">{isGithub ? "{}" : "in"}</span>
      </div>
      <div className="social-chip-text">
        <span className="social-chip-label">{label}</span>
        <span className="social-chip-description">{description}</span>
      </div>
    </motion.a>
  );
};
