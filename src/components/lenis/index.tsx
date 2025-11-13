"use client";

import ReactLenis, { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function Lenis({ children }: any) {
  const path = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    lenis?.scrollTo(0, { duration: 0 });
    lenis?.start();
  }, [path]);
  return <ReactLenis root>{children}</ReactLenis>;
}
