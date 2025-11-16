"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useContext } from "react";
import { WindowContext } from "@/contexts/windowContext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  // ANALYTICS NUMBERS ANIMATION
  const analyticsA = () => {
    gsap.from("#an span", {
      innerText: 0,
      duration: 1,
      ease: "power1.out",
      snap: { innerText: 1 }, // rounds to whole numbers
      scrollTrigger: {
        trigger: "#an h3",
        start: "top 90%",
      },
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    // analyticsA();
  });

  return null;
}
