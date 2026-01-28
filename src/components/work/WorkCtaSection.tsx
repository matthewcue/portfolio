import { Link } from "react-router-dom";
import Container from "../Container";
import SecondaryButton from "../buttons/SecondaryButton";
import { useCursor } from "../../cursor/CursorContext";

const WorkCtaSection = () => {
  const { setInteractive } = useCursor();

  return (
    <section className="work-section work-cta" aria-labelledby="work-cta-title">
      <Container>
        <div className="work-cta__inner">
          <h2 id="work-cta-title">Want more detail on what I&apos;m learning next?</h2>
          <p className="section-description">
            If you&apos;d like more detail on my skills and what I&apos;m learning next, you can see my skills
            matrix and roadmap.
          </p>
          <div className="work-cta__actions">
            <SecondaryButton to="/skills">View skills &amp; roadmap</SecondaryButton>
            <div className="work-cta__links">
              <Link
                to="/about"
                className="text-link"
                onPointerEnter={() => setInteractive(true)}
                onPointerLeave={() => setInteractive(false)}
              >
                Get to know me
              </Link>
              <Link
                to="/writing"
                className="text-link"
                onPointerEnter={() => setInteractive(true)}
                onPointerLeave={() => setInteractive(false)}
              >
                Read lab notes &amp; reflections
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WorkCtaSection;
