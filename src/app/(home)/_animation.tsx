"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Animation() {
  const animation = () => {
    const $p = document.getElementById("p");
    const $title = document.querySelector('h1[a-t="title"]');
    const title_split = SplitText.create($title, {
      type: "lines",
      mask: "lines",
    });
    gsap.set($p, { opacity: 1 });
    gsap.from(title_split.lines, {
      y: "100%",
      duration: 0.4,
      stagger: 0.1,
    });
  };

  useGSAP(() => {
    
    document.fonts.ready
      .then(() => {
        animation();
      })
      .catch((error) => {
        console.error("Error loading fonts:", error);
      });
  });

  return <></>;
}
