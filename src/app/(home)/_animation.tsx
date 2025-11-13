"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";
import { WindowContext } from "@/contexts/windowContext";

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  const animation = () => {
    const $title = document.querySelector('h1[a-t="title"]');

    const title_split = SplitText.create($title, {
      type: "lines",
      mask: "lines",
    });

    gsap.from(title_split.lines, {
      y: "100%",
      duration: 0.4,
      stagger: 0.1,
    });
  };

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    // bgA()
    // console.log("run");
    initA();
    // animation();

    // menuItemsA();
  }, [fontLoaded]);

  return null;
}
