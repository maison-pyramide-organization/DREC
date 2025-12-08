"use client";

import { WindowContext } from "@/contexts/windowContext";
import { imagesA, textsA } from "@/utils/animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded, loaderEnded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    if (!loaderEnded) return;
    initA();
    textsA();
    imagesA();
  }, [fontLoaded, loaderEnded]);

  return null;
}
