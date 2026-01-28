import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "../components/PageTransition";
import Icon from "../components/Icon";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { DotGridOverlay } from "../components/home/DotGridOverlay";
import { SocialChip } from "../components/home/SocialChip";
import { useTheme } from "../theme/ThemeProvider";
import profile from "../content/profile";
import {
  ArrowRightIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";
import heroImage from "../assets/matthew_cue_heroimage.png";

const heroPills = [
  { label: "Windows & Linux", className: "pill-one" },
  { label: "Basic networking", className: "pill-two" },
  { label: "Database creation / SQL", className: "pill-three" },
  { label: "Troubleshooting", className: "pill-four" }
];

const roadmapItems = [
  "Earn my first cloud certification (AWS or Azure fundamentals).",
  "Build more complete logging/monitoring in my homelab.",
  "Prepare for and pass CompTIA Security+."
];

const RoadmapTimeline = ({ items }: { items: string[] }) => (
  <ol className="roadmap-list">
    {items.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ol>
);

const HomePage = () => {
  const { prefersReducedMotion } = useTheme();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const snapshotRef = useRef<HTMLElement | null>(null);
  const roadmapRef = useRef<HTMLElement | null>(null);

  // Toggle the transparent navbar style when the hero section is in view.
  useEffect(() => {
    const heroSection = heroRef.current;
    const scrollRoot = scrollRef.current;

    if (!heroSection || !scrollRoot) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        document.body.classList.toggle("home-nav-transparent", entry.isIntersecting);
      },
      { root: scrollRoot, threshold: 0.7 }
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect();
      document.body.classList.remove("home-nav-transparent");
    };
  }, []);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    container: scrollRef,
    offset: ["start start", "end start"]
  });

  const { scrollYProgress: snapshotScroll } = useScroll({
    target: snapshotRef,
    container: scrollRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: roadmapScroll } = useScroll({
    target: roadmapRef,
    container: scrollRef,
    offset: ["start end", "end end"]
  });

  const heroTextY = useTransform(heroScroll, [0, 1], [0, -40]);
  const heroTextOpacity = useTransform(heroScroll, [0, 1], [1, 0.6]);
  const heroMediaY = useTransform(heroScroll, [0, 1], [-12, 8]);
  const pillDrift = useTransform(heroScroll, [0, 1], [0, -12]);
  const pillDriftAlt = useTransform(heroScroll, [0, 1], [0, 10]);

  const snapshotShadow = useTransform(
    snapshotScroll,
    [0, 1],
    ["0 12px 30px rgba(15, 23, 42, 0.08)", "0 20px 45px rgba(15, 23, 42, 0.18)"]
  );
  const snapshotBulletShift = useTransform(snapshotScroll, [0, 1], [6, -6]);

  const footerOpacity = useTransform(roadmapScroll, [0.6, 1], [0, 1]);

  const heroVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const heroStagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const sectionIntroVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <PageTransition>
      <div className="home-page">
        {/* Dot grid overlay (edit spacing/opacity in globals.css). */}
        <DotGridOverlay scrollRef={scrollRef} />
        {/* home-scroll is the only scroll container for this page (see globals.css). */}
        <div className="home-scroll" ref={scrollRef}>
          {/* home-scroll-inner adds the nav offset so Slide 1 starts below the floating nav. */}
          <div className="home-scroll-inner">
            {/* Panel 1: Hero section (edit text and CTA labels here). */}
            <section
              id="home-slide-1"
              className="home-panel home-slide home-slide--hero hero-panel"
              ref={heroRef}
            >
              <div className="home-section-inner hero-grid">
                <motion.div
                  className="hero-copy"
                  variants={heroStagger}
                  initial={prefersReducedMotion ? false : "hidden"}
                  animate="visible"
                  style={prefersReducedMotion ? undefined : { y: heroTextY, opacity: heroTextOpacity }}
                >
                  <motion.p className="hero-overline" variants={heroVariants}>
                    IT Support · Sysadmin · Cloud-in-Training
                  </motion.p>
                  <motion.h1 className="hero-title" variants={heroVariants}>
                    Matthew Cue
                    <span>I keep systems running and users supported.</span>
                  </motion.h1>
                  <motion.p className="hero-subcopy" variants={heroVariants}>
                    I bring frontline customer experience into IT. I troubleshoot calmly, keep Windows and
                    Linux machines usable, and build small tools that make support work smoother.
                  </motion.p>
                  <motion.div className="hero-actions" variants={heroVariants}>
                    {/* Use Primary/SecondaryButton for consistent CTA styling and cursor hints. */}
                    <PrimaryButton to="/skills" size="lg" icon={<Icon><ArrowRightIcon /></Icon>}>
                      See what I work with
                    </PrimaryButton>
                    <SecondaryButton to="/about" icon={<Icon><UserCircleIcon /></Icon>}>
                      Get to know me
                    </SecondaryButton>
                  </motion.div>
                </motion.div>

                {/* Hero media: photo + skill pills (you can swap or edit pill labels below). */}
                <motion.div
                  className="hero-media"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 40, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  style={prefersReducedMotion ? undefined : { y: heroMediaY }}
                >
                  <Link className="hero-photo-card" to="/about" aria-label="Learn more about Matthew Cue">
                    <img src={heroImage} alt="Portrait of Matthew Cue" />
                    <span className="hero-photo-strip">Based in California · Open to remote</span>
                  </Link>
                  <div className="hero-pill-group">
                    {heroPills.map((pill, index) => (
                      <motion.span
                        key={pill.label}
                        className={`hero-pill ${pill.className}`}
                        style={
                          prefersReducedMotion
                            ? undefined
                            : { y: index % 2 === 0 ? pillDrift : pillDriftAlt }
                        }
                      >
                        {pill.label}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Panel 2: Snapshot section (edit the copy and bullets here). */}
            <section
              id="home-slide-2"
              className="home-panel home-slide snapshot-panel"
              ref={snapshotRef}
            >
              <div className="home-section-inner">
                <motion.div
                  className="section-intro"
                  variants={sectionIntroVariants}
                  initial={prefersReducedMotion ? false : "hidden"}
                  whileInView="visible"
                  viewport={{ root: scrollRef, amount: 0.4, once: true }}
                >
                  <p className="section-label">Day-to-day and hands-on work</p>
                  <h2>What I do when something breaks.</h2>
                  <p className="muted">
                    Most of my practice lives in a small homelab and real-world troubleshooting for
                    people around me.
                  </p>
                </motion.div>

                <div className="snapshot-grid">
                  <motion.article
                    className="snapshot-card"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ root: scrollRef, amount: 0.3, once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      boxShadow: prefersReducedMotion
                        ? "0 12px 30px rgba(15, 23, 42, 0.08)"
                        : snapshotShadow
                    }}
                  >
                    <h3>Support &amp; systems</h3>
                    <motion.ul
                      className="snapshot-list"
                      style={prefersReducedMotion ? undefined : { y: snapshotBulletShift }}
                    >
                      <li>Help friends, family, and classmates recover from OS and hardware issues.</li>
                      <li>Diagnose Wi-Fi, DNS, and VPN problems on small networks.</li>
                      <li>Keep Windows and Linux installs usable with basic hardening and updates.</li>
                    </motion.ul>
                    <Link className="text-link" to="/work">
                      See more examples →
                    </Link>
                  </motion.article>

                  <motion.article
                    className="snapshot-card"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ root: scrollRef, amount: 0.3, once: true }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.08 }}
                    style={{
                      boxShadow: prefersReducedMotion
                        ? "0 12px 30px rgba(15, 23, 42, 0.08)"
                        : snapshotShadow
                    }}
                  >
                    <h3>Tools &amp; experiments</h3>
                    <motion.ul
                      className="snapshot-list"
                      style={prefersReducedMotion ? undefined : { y: snapshotBulletShift }}
                    >
                      <li>Use SQL and basic scripting to explore data and automate simple tasks.</li>
                      <li>Run a small homelab with VMs to practice server administration.</li>
                      <li>Build lightweight web tools like this site to present my work.</li>
                    </motion.ul>
                    <Link className="text-link" to="/work">
                      Explore my lab →
                    </Link>
                  </motion.article>
                </div>

                <div className="snapshot-cta">
                  <p>
                    If you hire me, this is the kind of work I’ll be doing for you—just on your systems
                    instead of mine.
                  </p>
                  <Link className="text-link" to="/skills">
                    Dive into my skills →
                  </Link>
                </div>
              </div>
            </section>

            {/* Panel 3: Skills + roadmap + contact (edit bullet lists and contact text here). */}
            <section
              id="home-slide-3"
              className="home-panel home-slide roadmap-panel"
              ref={roadmapRef}
            >
              <div className="home-section-inner roadmap-grid">
                <div className="roadmap-copy">
                  <motion.p
                    className="section-label"
                    variants={sectionIntroVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ root: scrollRef, amount: 0.4, once: true }}
                  >
                    Skills &amp; Roadmap
                  </motion.p>
                  <motion.h2
                    variants={sectionIntroVariants}
                    initial={prefersReducedMotion ? false : "hidden"}
                    whileInView="visible"
                    viewport={{ root: scrollRef, amount: 0.4, once: true }}
                  >
                    Focused on support and systems now, growing into cloud and security.
                  </motion.h2>

                  <motion.div
                    className="roadmap-section"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ root: scrollRef, amount: 0.4, once: true }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <h3>Today</h3>
                    <ul className="roadmap-list">
                      <li>Supporting users on Windows and macOS</li>
                      <li>Basic network troubleshooting (Wi-Fi, DNS, VPN)</li>
                      <li>Intro Linux server admin (VM-based homelab)</li>
                      <li>Simple automation with Python/PowerShell</li>
                    </ul>
                  </motion.div>

                  <motion.div
                    className="roadmap-section"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ root: scrollRef, amount: 0.4, once: true }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: prefersReducedMotion ? 0 : 0.08 }}
                  >
                    <h3>Next 6–12 months</h3>
                    <RoadmapTimeline items={roadmapItems} />
                  </motion.div>
                </div>

                <motion.aside
                  className="contact-card"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ root: scrollRef, amount: 0.4, once: true }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <h3>Ready for junior IT roles.</h3>
                  <p className="muted">
                    Based in California, open to remote. I’m especially interested in support, junior
                    sysadmin, or operations roles where I can keep learning cloud and security.
                  </p>
                  <div className="contact-actions">
                    <PrimaryButton href={`mailto:${profile.email}`} icon={<Icon><EnvelopeIcon /></Icon>}>
                      Email me
                    </PrimaryButton>
                    <SecondaryButton to="/about" icon={<Icon><DocumentArrowDownIcon /></Icon>}>
                      Download resume
                    </SecondaryButton>
                  </div>
                  {/* Update these URLs and labels when real profile links are ready. */}
                  <div className="social-chip-row">
                    <SocialChip
                      kind="github"
                      label="GitHub"
                      description="github.com/matthewcue"
                      href="https://github.com/matthewcue"
                    />
                    <SocialChip
                      kind="linkedin"
                      label="LinkedIn"
                      description="linkedin.com/in/matthewcue"
                      href="https://linkedin.com/in/matthewcue"
                    />
                  </div>
                </motion.aside>
              </div>

              <motion.div
                className="panel-footer"
                style={{ opacity: prefersReducedMotion ? 1 : footerOpacity }}
              >
                <span>© 2024 Matthew Cue</span>
                <div className="panel-footer-links">
                  <Link to="/about">About</Link>
                  <Link to="/about">Resume</Link>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
