"use client";

import { WindowContext } from "@/contexts/windowContext";
import { textsA } from "@/utils/animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    // bgA()
    // console.log("run");
    initA()
    textsA();

    // menuItemsA();
  }, [fontLoaded]);

  return null;
}
