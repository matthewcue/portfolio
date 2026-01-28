import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursor } from "../cursor/CursorContext";
import { useTheme } from "../theme/ThemeProvider";

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// CustomCursor renders a single accent-colored cursor that follows the pointer.
const CustomCursor = () => {
  const { cursorMode, isPointerFine, prefersReducedMotion } = useCursor();
  const { accentColor, accentColorSoft, accentColorStrong } = useTheme();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.3 };
  const springX = prefersReducedMotion ? x : useSpring(x, springConfig);
  const springY = prefersReducedMotion ? y : useSpring(y, springConfig);

  useEffect(() => {
    if (!isPointerFine) {
      return;
    }

    const handleMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [isPointerFine, x, y]);

  if (!isPointerFine) {
    return null;
  }

  const fillColor = accentColorSoft ?? hexToRgba(accentColor, 0.6);
  const borderColor = accentColorStrong ?? hexToRgba(accentColor, 0.85);

  return (
    <motion.div
      aria-hidden="true"
      className="custom-cursor"
      style={{
        x: springX,
        y: springY,
        backgroundColor: fillColor,
        borderColor
      }}
      animate={cursorMode}
      variants={{
        default: {
          width: 24,
          height: 24,
          opacity: 0.65,
          boxShadow: "none",
          scale: 1
        },
        interactive: {
          width: 38,
          height: 38,
          opacity: 0.9,
          boxShadow: `0 0 18px ${hexToRgba(accentColor, 0.35)}`,
          scale: 1
        },
        hidden: {
          opacity: 0,
          scale: 0.2,
          transition: { duration: 0.15 }
        }
      }}
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", damping: 22, stiffness: 260 }}
    />
  );
};

export default CustomCursor;
