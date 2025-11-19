"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";
import { WindowContext } from "@/contexts/windowContext";
import { imagesA, textsA } from "@/utils/animations";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  // ANALYTICS NUMBERS ANIMATION
  const analyticsA = () => {
    gsap.from("#an span", {
      opacity: 0,
      textContent: 0,
      duration: 1,
      ease: "power1.out",
      snap: { textContent: 1 }, // rounds to whole numbers
      scrollTrigger: {
        trigger: "#an h3",
        start: "top 90%",
      },
    });
  };

  const animation = () => {
    const $title = document.querySelector('h1[a-t="title"]');

    const title_split = SplitText.create($title, {
      type: "lines",
      mask: "lines",
    });

    gsap;
  };

  const heA = () => {
    const $he_v = document.querySelector("[g-s='he-v']");
    // const $tilte = document.querySelector()
    const title_split = SplitText.create('[g-s="he_ti"]', {
      type: "lines",
      mask: "lines",
    });
    const tl = gsap.timeline();

    tl.from($he_v, {
      width: 0,
      ease: "power2.inOut",
      duration: 1,
    }).from(
      title_split.lines,
      {
        y: "100%",
        duration: 1.2,
        stagger: 0.05,
        ease: "power4.inOut",
      },
      "<-0.1"
    );
  };

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    initA();
    textsA();
    imagesA();
    heA();
    analyticsA();
  }, [fontLoaded]);

  return null;
}
