import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
}

const Card = ({ children }: CardProps) => (
  <motion.article
    className="card"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.18, ease: "easeOut" }}
  >
    {children}
  </motion.article>
);

export default Card;
