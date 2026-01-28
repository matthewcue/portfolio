import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Wrap each page with a subtle fade/slide transition.
const PageTransition = ({ children }: { children: ReactNode }) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className="page-transition">{children}</div>;
  }

  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
