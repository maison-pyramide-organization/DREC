"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Animation() {
  const animation = () => {
    // ANALYTICS NUMBERS ANIMATION

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

    // GET IMAGE
    gsap.utils.toArray('[data-animation="pi"]').forEach((el: any) => {
      gsap.from(el, {
        opacity: 0,
        duration: 1,
        ease: "power1.out",
        scrollTrigger: {
          trigger: el, // 👈 each element triggers its own animation
          start: "top 80%",
        },
      });
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
