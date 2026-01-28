import { createContext, useContext, useEffect, useMemo, useState } from "react";

type CursorMode = "default" | "interactive" | "hidden";

interface CursorContextValue {
  cursorMode: CursorMode;
  isPointerFine: boolean;
  prefersReducedMotion: boolean;
  setInteractive: (on: boolean) => void;
  setHidden: (on: boolean) => void;
}

const CursorContext = createContext<CursorContextValue>({
  cursorMode: "default",
  isPointerFine: true,
  prefersReducedMotion: false,
  setInteractive: () => {},
  setHidden: () => {}
});

const getMediaQuery = (query: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.matchMedia(query);
};

// CursorProvider keeps cursor state in one place so any component can opt in.
export const CursorProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPointerFine, setIsPointerFine] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const pointerQuery = getMediaQuery("(pointer: fine)");
    const motionQuery = getMediaQuery("(prefers-reduced-motion: reduce)");

    if (!pointerQuery || !motionQuery) {
      return;
    }

    const updatePointer = () => setIsPointerFine(pointerQuery.matches);
    const updateMotion = () => setPrefersReducedMotion(motionQuery.matches);

    updatePointer();
    updateMotion();

    pointerQuery.addEventListener("change", updatePointer);
    motionQuery.addEventListener("change", updateMotion);

    return () => {
      pointerQuery.removeEventListener("change", updatePointer);
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  const value = useMemo<CursorContextValue>(
    () => ({
      cursorMode: isHidden ? "hidden" : isInteractive ? "interactive" : "default",
      isPointerFine,
      prefersReducedMotion,
      setInteractive: (on) => {
        if (!isPointerFine) {
          return;
        }
        setIsInteractive(on);
      },
      setHidden: (on) => {
        if (!isPointerFine) {
          return;
        }
        setIsHidden(on);
      }
    }),
    [isHidden, isInteractive, isPointerFine, prefersReducedMotion]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

// useCursor exposes helpers so buttons/inputs can opt into cursor behaviors.
export const useCursor = () => useContext(CursorContext);
