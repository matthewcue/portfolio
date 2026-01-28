import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type TypographyVariant = "plex-primary" | "garamond-primary";

interface TypographyContextValue {
  variant: TypographyVariant;
}

const TypographyContext = createContext<TypographyContextValue | undefined>(undefined);

function getInitialVariant(): TypographyVariant {
  if (typeof document === "undefined") {
    return "plex-primary";
  }
  const attr = document.documentElement.dataset.typographyVariant;
  return attr === "garamond-primary" ? "garamond-primary" : "plex-primary";
}

export const TypographyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [variant, setVariant] = useState<TypographyVariant>(getInitialVariant);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const current = document.documentElement.dataset.typographyVariant;
    if (current === "garamond-primary" || current === "plex-primary") {
      setVariant(current);
    }
  }, []);

  return <TypographyContext.Provider value={{ variant }}>{children}</TypographyContext.Provider>;
};

export function useTypography(): TypographyContextValue {
  const ctx = useContext(TypographyContext);
  if (!ctx) {
    throw new Error("useTypography must be used within a TypographyProvider");
  }
  return ctx;
}
