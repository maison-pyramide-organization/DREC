"use client";

import { WindowContext } from "@/contexts/windowContext";
import { imagesA, textsA } from "@/utils/animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

  const s2A = () => {
    const $tiltes = document.querySelectorAll("[g-s='s2-c'] h3");
    const $paras = document.querySelectorAll("[g-s='s2-c'] p");
    const titles_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[g-s="s2-c"]',
        start: "top 95%",
      },
    });
    const paras_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[g-s="s2-c"] p',
        start: "top 95%",
      },
    });

    $tiltes.forEach(($title, i) => {
      const title_lines = SplitText.create($title, {
        type: "lines",
        mask: "lines",
      }).lines;

      titles_tl.from(
        title_lines,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.1,
        },
        i * 0.2
      );
    });
    $paras.forEach(($title, i) => {
      const title_lines = SplitText.create($title, {
        type: "lines",
        mask: "lines",
      }).lines;

      paras_tl.from(
        title_lines,
        {
          yPercent: 100,
          duration: 1,
          ease: "power4.inOut",
          stagger: 0.1,
        },
        i * 0.2
      );
    });
  };

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    initA();
    imagesA();
    textsA();
    s2A();
  }, [fontLoaded]);

  return null;
}
