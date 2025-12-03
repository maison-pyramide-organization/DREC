"use client";

import { WindowContext } from "@/contexts/windowContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded, isMobile } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

  const horScroll = () => {
    const $secs = gsap.utils.toArray("#m section");
    const hs = gsap.to($secs, {
      xPercent: -100 * ($secs.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#m",
        pin: true,
        scrub: true,
      },
    });

    // S1 TIMELINE
    const $s1 = document.querySelector('[g-s="s1"]');

    const s1_tl = gsap.timeline({
      scrollTrigger: {
        trigger: '[g-s="s1-l"]',
        containerAnimation: hs,
        start: "right right",
        markers: true,
      },
    });
    s1_tl
      .from('[g-s="s1"] h2', {
        opacity: 0,
        duration: 0.5,
      })
      .from('[g-s="s1"] p', {
        opacity: 0,
        duration: 0.5,
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
    if (!isMobile) horScroll();
    // imagesA();
    // textsA();
  }, [fontLoaded]);

  return null;
}
