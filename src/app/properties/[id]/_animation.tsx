"use client";

import { WindowContext } from "@/contexts/windowContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP);

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    initA();
  }, [fontLoaded]);

  return null;
}
