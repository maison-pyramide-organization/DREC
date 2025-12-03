"use client";

import { WindowContext } from "@/contexts/windowContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation() {
  const { fontLoaded } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

  const horScroll = () => {
    const $secs = gsap.utils.toArray("#m section");
    const hs = gsap.to($secs, {
      xPercent: -100 * ($secs.length - 1),
      scrollTrigger: {
        trigger: "#m",
        pin: true,
        scrub: true,
      },
    });

    gsap.utils.toArray('[a-t="r"]').forEach((el: any) => {
      const t_split = SplitText.create(el, { type: "lines", mask: "lines" });

      gsap.from(t_split.lines, {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el, // 👈 each element triggers its own animation
          start: "left 90%",
          horizontal: true,
          containerAnimation: hs,
        },
        onComplete: () => {
          t_split.masks.forEach((mask: any) => {
            mask.style.overflow = "";
          });
        },
      });
    });
  };

  const textsA = () => {
    gsap.utils.toArray('[a-t="r"]').forEach((el: any) => {
      const t_split = SplitText.create(el, { type: "lines", mask: "lines" });

      gsap.from(t_split.lines, {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: el, // 👈 each element triggers its own animation
          start: "left center",
          markers: true,
        },
        onComplete: () => {
          t_split.masks.forEach((mask: any) => {
            mask.style.overflow = "";
          });
        },
      });
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
    horScroll();
    // imagesA();
    // textsA();
  }, [fontLoaded]);

  return null;
}
