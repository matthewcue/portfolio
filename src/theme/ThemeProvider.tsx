import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

type ThemeMode = "light" | "dark";

interface ThemeContextValue {
  theme: ThemeMode;
  toggleTheme: () => void;
  prefersReducedMotion: boolean;
  accentColor: string;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const THEME_STORAGE_KEY = "portfolio-theme";

// Curated accent colors. Add/remove colors here to adjust the random palette.
const ACCENT_COLORS = [
  "#2563EB",
  "#0EA5E9",
  "#22C55E",
  "#14B8A6",
  "#EC4899",
  "#F97316",
  "#8B5CF6"
];

const getInitialTheme = (): ThemeMode => {
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored) {
    return stored;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
};

const hexToRgba = (hex: string, alpha: number) => {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // Light is the default, but we respect system preference if no saved theme exists.
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  // Accent color is randomized once per page load and stored in state so it never flickers.
  const [accentColor] = useState<string>(
    () => ACCENT_COLORS[Math.floor(Math.random() * ACCENT_COLORS.length)]
  );
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", accentColor);
    document.documentElement.style.setProperty("--accent-soft", hexToRgba(accentColor, 0.14));
  }, [accentColor]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () => setTheme((prev) => (prev === "light" ? "dark" : "light")),
      prefersReducedMotion,
      accentColor
    }),
    [theme, prefersReducedMotion, accentColor]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
