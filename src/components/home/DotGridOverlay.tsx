import type { CSSProperties, RefObject } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "../../theme/ThemeProvider";

interface DotGridOverlayProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export const DotGridOverlay = ({ scrollRef }: DotGridOverlayProps) => {
  const { accentColor } = useTheme();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ container: scrollRef });

  // Adjust the parallax range here if you want more/less motion.
  const y = useTransform(scrollYProgress, [0, 1], [0, -16]);

  return (
    <motion.div
      aria-hidden="true"
      className="dot-grid-overlay"
      style={reduceMotion ? undefined : { y }}
    >
      {/* Tweak dot spacing + opacity in globals.css. */}
      <div
        className="dot-grid-overlay-inner"
        style={{ "--dot-color": accentColor } as CSSProperties}
      />
    </motion.div>
  );
};
