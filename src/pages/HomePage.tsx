import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import PageTransition from "../components/PageTransition";
import Icon from "../components/Icon";
import PrimaryButton from "../components/buttons/PrimaryButton";
import SecondaryButton from "../components/buttons/SecondaryButton";
import { useTheme } from "../theme/ThemeProvider";
import {
  ArrowRightIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  UserCircleIcon
} from "@heroicons/react/24/outline";

const heroImage = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 400">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stop-color="#0ea5e9"/>
        <stop offset="100%" stop-color="#6366f1"/>
      </linearGradient>
    </defs>
    <rect width="320" height="400" rx="28" fill="url(#bg)"/>
    <circle cx="160" cy="150" r="62" fill="rgba(255,255,255,0.65)"/>
    <rect x="70" y="230" width="180" height="90" rx="36" fill="rgba(255,255,255,0.45)"/>
  </svg>`
)}`;

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
  const heroMediaY = useTransform(heroScroll, [0, 1], [0, -24]);
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
        <div className="home-scroll" ref={scrollRef}>
          {/* Panel 1: Hero section (edit text and CTA labels here). */}
          <section className="home-panel hero-panel" ref={heroRef}>
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
                  <PrimaryButton
                    to="/skills"
                    size="lg"
                    icon={<Icon><ArrowRightIcon /></Icon>}
                  >
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
                <div className="hero-photo-card">
                  <img src={heroImage} alt="Portrait of Matthew Cue" />
                  <span className="hero-photo-strip">Based in California · Open to remote</span>
                </div>
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
          <section className="home-panel snapshot-panel" ref={snapshotRef}>
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
                  <Link className="text-link" to="/projects">
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
                  <Link className="text-link" to="/lab">
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
          <section className="home-panel roadmap-panel" ref={roadmapRef}>
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
                  <PrimaryButton
                    href="mailto:matthew@example.com"
                    icon={<Icon><EnvelopeIcon /></Icon>}
                  >
                    Email me
                  </PrimaryButton>
                  <SecondaryButton
                    to="/resume"
                    icon={<Icon><DocumentArrowDownIcon /></Icon>}
                  >
                    Download resume
                  </SecondaryButton>
                </div>
                <div className="contact-links">
                  <a className="icon-link" href="https://github.com" aria-label="GitHub">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M12 .5C5.73.5.5 5.87.5 12.47c0 5.3 3.44 9.8 8.2 11.38.6.12.82-.26.82-.58 0-.29-.01-1.06-.02-2.07-3.34.74-4.04-1.65-4.04-1.65-.54-1.41-1.33-1.79-1.33-1.79-1.09-.77.08-.75.08-.75 1.2.09 1.83 1.27 1.83 1.27 1.07 1.88 2.8 1.34 3.49 1.03.11-.8.42-1.34.76-1.65-2.66-.31-5.46-1.38-5.46-6.12 0-1.35.46-2.45 1.23-3.32-.12-.31-.54-1.56.12-3.26 0 0 1-.33 3.3 1.26a11.07 11.07 0 0 1 6 0c2.3-1.59 3.3-1.26 3.3-1.26.66 1.7.24 2.95.12 3.26.76.87 1.23 1.97 1.23 3.32 0 4.76-2.8 5.8-5.48 6.1.43.38.81 1.12.81 2.26 0 1.63-.01 2.94-.01 3.34 0 .32.22.7.82.58 4.77-1.58 8.2-6.07 8.2-11.38C23.5 5.87 18.27.5 12 .5z"
                      />
                    </svg>
                  </a>
                  <a className="icon-link" href="https://linkedin.com" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="currentColor"
                        d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 8.75h3.96V21H3V8.75zM9.75 8.75H13.6v1.67h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.22V21h-3.96v-5.44c0-1.3-.02-2.98-1.81-2.98-1.81 0-2.09 1.42-2.09 2.89V21H9.75V8.75z"
                      />
                    </svg>
                  </a>
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
                <Link to="/resume">Resume</Link>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default HomePage;
