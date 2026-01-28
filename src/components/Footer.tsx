import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CodeBracketIcon, EnvelopeIcon, BriefcaseIcon } from "@heroicons/react/24/outline";
import profile from "../content/profile";
import Icon from "./Icon";
import { useTheme } from "../theme/ThemeProvider";
import { useCursor } from "../cursor/CursorContext";

const Footer = () => {
  const { prefersReducedMotion } = useTheme();
  const { setInteractive } = useCursor();
  const currentYear = new Date().getFullYear();

  // Profile data lives in src/content/profile.ts for easy updates to name, email, and socials.
  const { fullName, headline, email, social } = profile;

  const socialLinks = social.map((link) => {
    const isGithub = link.label.toLowerCase().includes("github");
    const isLinkedIn = link.label.toLowerCase().includes("linkedin");
    const icon = isGithub ? CodeBracketIcon : isLinkedIn ? BriefcaseIcon : EnvelopeIcon;

    return {
      ...link,
      icon
    };
  });

  return (
    <motion.footer
      className="site-footer"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="footer-inner">
        <div className="footer-row footer-primary">
          <div className="footer-brand">
            <p className="footer-name">{fullName}</p>
            <p className="footer-role">{headline} · Cloud-in-Training</p>
          </div>

          <div className="footer-links">
            {[
              { label: "Home", to: "/" },
              { label: "Projects", to: "/projects" },
              { label: "Skills", to: "/skills" },
              { label: "Resume", to: "/resume" }
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onPointerEnter={() => setInteractive(true)}
                onPointerLeave={() => setInteractive(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="footer-contact">
            <span className="footer-label">Let's talk</span>
            <a
              className="footer-email"
              href={`mailto:${email}`}
              onPointerEnter={() => setInteractive(true)}
              onPointerLeave={() => setInteractive(false)}
            >
              {email}
            </a>
            <div className="footer-socials">
              {socialLinks.map((link) => {
                const SocialIcon = link.icon;

                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    onPointerEnter={() => setInteractive(true)}
                    onPointerLeave={() => setInteractive(false)}
                    aria-label={link.label}
                  >
                    <Icon>
                      <SocialIcon />
                    </Icon>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-row footer-meta">
          <p>© {currentYear} {fullName}. Built with React &amp; Vite.</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
