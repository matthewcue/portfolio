import { motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Container from "../Container";
import Icon from "../Icon";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useCursor } from "../../cursor/CursorContext";

interface SkillsCtaSectionProps {
  email: string;
}

const SkillsCtaSection = ({ email }: SkillsCtaSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { setInteractive } = useCursor();

  return (
    <section className="skills-section skills-cta" aria-labelledby="skills-cta-title">
      <Container>
        <motion.div
          className="skills-cta__inner"
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 id="skills-cta-title">
            If you&apos;re hiring for junior IT support, helpdesk, or junior sysadmin roles, I&apos;d love to
            talk.
          </h2>
          <div className="skills-cta__actions">
            <PrimaryButton href={`mailto:${email}`} icon={<Icon><EnvelopeIcon /></Icon>}>
              Email me
            </PrimaryButton>
            <SecondaryButton to="/about" icon={<Icon><ArrowRightIcon /></Icon>}>
              Download resume
            </SecondaryButton>
          </div>
          <p className="skills-cta__footer">
            You can also see how I think about problems in my{" "}
            <Link
              to="/lab"
              className="text-link"
              onPointerEnter={() => setInteractive(true)}
              onPointerLeave={() => setInteractive(false)}
            >
              lab notes
            </Link>{" "}
            and{" "}
            <Link
              to="/writing"
              className="text-link"
              onPointerEnter={() => setInteractive(true)}
              onPointerLeave={() => setInteractive(false)}
            >
              writing
            </Link>
            .
          </p>
        </motion.div>
      </Container>
    </section>
  );
};

export default SkillsCtaSection;
