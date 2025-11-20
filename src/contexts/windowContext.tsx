"use client";

import { createContext, useEffect, useState, ReactNode, useRef } from "react";

type Window = {
  width: number;
  height: number;
  isMobile: boolean | null;
  fontLoaded: boolean;
  firstLoad: boolean;
};

export const WindowContext = createContext<Window>({
  width: 0,
  height: 0,
  isMobile: null,
  fontLoaded: false,
  firstLoad: true,
});

export function WindowProvider({ children }: { children: ReactNode }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(null) as any;
  const [fontLoaded, setFontLoaded] = useState<boolean>(
    () => !!(typeof window !== "undefined" && (window as any).__fontsReady)
  );
  const firstLoad = useRef(true);

  useEffect(() => {
    const update = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      window.innerWidth > 770 ? setIsMobile(false) : setIsMobile(true);
    };
    if (firstLoad.current) {
      console.log("🚀 First website load");
      firstLoad.current = false;
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if ((window as any).__fontsReady) {
      setFontLoaded(true);
      return;
    }
    (document.fonts?.ready ?? Promise.resolve())
      .then(() => {
        (window as any).__fontsReady = true;

        setFontLoaded(true);
      })
      .catch(() => {
        (window as any).__fontsReady = true;
        setFontLoaded(true);
      });
  }, []);

  return (
    <WindowContext.Provider
      value={{
        ...dimensions,
        isMobile,
        fontLoaded,
        firstLoad: firstLoad.current,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}
