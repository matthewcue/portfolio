import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bars3Icon,
  BeakerIcon,
  FolderIcon,
  HomeIcon,
  PencilSquareIcon,
  SparklesIcon,
  UserCircleIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import ThemeToggle from "./ThemeToggle";
import Icon from "./Icon";
import { useCursor } from "../cursor/CursorContext";
import { useTheme } from "../theme/ThemeProvider";

// Update this single config array to add, remove, or rename navigation items.
const navItems = [
  { label: "Home", to: "/", icon: HomeIcon },
  { label: "Projects", to: "/projects", icon: FolderIcon },
  { label: "Lab", to: "/lab", icon: BeakerIcon },
  { label: "Skills", to: "/skills", icon: SparklesIcon },
  { label: "Writing", to: "/writing", icon: PencilSquareIcon },
  { label: "About", to: "/about", icon: UserCircleIcon }
];

const MOBILE_BREAKPOINT = 880;
const SCROLL_THRESHOLD = 96;

const Navbar = () => {
  const { setInteractive } = useCursor();
  const { accentColor, accentColorSoft, prefersReducedMotion } = useTheme();
  const location = useLocation();
  const [isCondensed, setIsCondensed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position to switch between expanded and condensed nav states.
  useEffect(() => {
    const handleScroll = () => {
      setIsCondensed(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleMediaChange(mediaQuery);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navCursorTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 520, damping: 40 };

  const navContainerTransition = prefersReducedMotion
    ? { duration: 0.1 }
    : { type: "spring", stiffness: 320, damping: 36 };

  const isItemActive = (path: string) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  const cursorStyles = useMemo(
    () =>
      ({
        "--nav-accent": accentColor,
        "--nav-accent-soft": accentColorSoft
      }) as CSSProperties,
    [accentColor, accentColorSoft]
  );

  return (
    <header className="site-header" style={cursorStyles}>
      {/*
        Expanded vs. condensed layout:
        - Expanded shows full labels and a taller pill with extra padding.
        - Condensed shrinks the pill and hides labels while keeping them in the DOM.
      */}
      <nav className="site-nav" aria-label="Main navigation">
        {isMobile ? (
          <div className="nav-mobile-bar">
            <Link
              className="nav-brand"
              to="/"
              onPointerEnter={() => setInteractive(true)}
              onPointerLeave={() => setInteractive(false)}
            >
              MC
            </Link>
            <div className="nav-mobile-actions">
              <ThemeToggle />
              <button
                className="nav-mobile-toggle"
                type="button"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                onPointerEnter={() => setInteractive(true)}
                onPointerLeave={() => setInteractive(false)}
              >
                <Icon>{isMobileMenuOpen ? <XMarkIcon /> : <Bars3Icon />}</Icon>
              </button>
            </div>
          </div>
        ) : (
          <motion.div
            className="nav-pill"
            animate={{
              height: isCondensed ? 50 : 64,
              paddingInline: isCondensed ? 16 : 22,
              gap: isCondensed ? 10 : 16,
              borderRadius: 0,
              backgroundColor: isCondensed
                ? "var(--nav-surface-solid)"
                : "var(--nav-surface-glass)",
              borderColor: isCondensed ? "var(--nav-border-strong)" : "var(--nav-border-soft)",
              backdropFilter: isCondensed ? "blur(6px)" : "blur(16px)"
            }}
            transition={navContainerTransition}
          >
            <ul className="nav-list" role="list">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = isItemActive(item.to);

                return (
                  <li key={item.to} className="nav-item">
                    <Link
                      className={`nav-link ${isActive ? "is-active" : ""}`.trim()}
                      to={item.to}
                      onPointerEnter={() => setInteractive(true)}
                      onPointerLeave={() => setInteractive(false)}
                    >
                      {/*
                        The moving "nav cursor" uses a shared layoutId so Framer Motion
                        can smoothly animate the same element between nav items.
                        Keeping the cursor rendered only for the active item gives
                        a clean, single moving highlight instead of duplicates.
                      */}
                      {isActive && (
                        <motion.span
                          className="nav-cursor"
                          layoutId="navCursor"
                          transition={navCursorTransition}
                        />
                      )}
                      <span className="nav-link-content">
                        <Icon>
                          <IconComponent />
                        </Icon>
                        <motion.span
                          className="nav-link-label"
                          animate={{
                            opacity: isCondensed ? 0 : 1,
                            maxWidth: isCondensed ? 0 : 140
                          }}
                          transition={navContainerTransition}
                        >
                          {item.label}
                        </motion.span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="nav-actions">
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </nav>

      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <motion.div
            className="nav-mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              className="nav-mobile-panel"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="nav-mobile-header">
                <span className="nav-mobile-title">Navigate</span>
                <ThemeToggle />
              </div>
              <ul className="nav-mobile-list" role="list">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  const isActive = isItemActive(item.to);

                  return (
                    <li key={item.to} className="nav-mobile-item">
                      <Link
                        className={`nav-mobile-link ${isActive ? "is-active" : ""}`.trim()}
                        to={item.to}
                        onPointerEnter={() => setInteractive(true)}
                        onPointerLeave={() => setInteractive(false)}
                      >
                        {isActive && (
                          <motion.span
                            className="nav-cursor nav-cursor-mobile"
                            layoutId="navCursorMobile"
                            transition={navCursorTransition}
                          />
                        )}
                        <span className="nav-link-content">
                          <Icon>
                            <IconComponent />
                          </Icon>
                          <span className="nav-link-label">{item.label}</span>
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
