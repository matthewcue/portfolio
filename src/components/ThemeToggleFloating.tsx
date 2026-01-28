import ThemeToggle from "./ThemeToggle";
import { useCursor } from "../cursor/CursorContext";

const ThemeToggleFloating = () => {
  const { setInteractive } = useCursor();

  return (
    <div
      className="theme-toggle-floating"
      onPointerEnter={() => setInteractive(true)}
      onPointerLeave={() => setInteractive(false)}
    >
      {/* Adjust top/right values in globals.css to align with the nav pill. */}
      <ThemeToggle />
    </div>
  );
};

export default ThemeToggleFloating;
