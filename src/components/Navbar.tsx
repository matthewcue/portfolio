import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useCursor } from "../cursor/CursorContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Projects", to: "/projects" },
  { label: "Lab", to: "/lab" },
  { label: "Skills", to: "/skills" },
  { label: "Writing", to: "/writing" },
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setInteractive } = useCursor();

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink
          className="navbar-brand"
          to="/"
          onClick={() => setIsOpen(false)}
          onPointerEnter={() => setInteractive(true)}
          onPointerLeave={() => setInteractive(false)}
        >
          CJ
        </NavLink>
        <button
          className="navbar-toggle"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onPointerEnter={() => setInteractive(true)}
          onPointerLeave={() => setInteractive(false)}
        >
          ☰
        </button>
        <nav className={`navbar-links ${isOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={() => setIsOpen(false)}
              onPointerEnter={() => setInteractive(true)}
              onPointerLeave={() => setInteractive(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
