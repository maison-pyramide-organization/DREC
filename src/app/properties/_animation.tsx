"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";
import { WindowContext } from "@/contexts/windowContext";
import { textsA } from "@/utils/animations";

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

  const animation = () => {
    const $banner_img = document.querySelector(".b-f img");
    // const $tilte = document.querySelector()
    const title_split = SplitText.create('[g-s="ti"] span', {
      type: "lines",
      mask: "lines",
    });
    const tl = gsap.timeline();

    tl.from($banner_img, {
      width: 0,
      ease: "power1.inOut",
      duration: 1,
    }).from(title_split.lines, {
      y: "100%",
      duration: 1.6,
      stagger: 0.1,
      ease: "power4.out",
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
    animation();
    // textsA();
  }, [fontLoaded]);

  return null;
}
