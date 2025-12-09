"use client";

import { WindowContext } from "@/contexts/windowContext";
import { imagesA, textsA } from "@/utils/animations";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase, ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation(props: any) {
  const { play } = props;
  const { fontLoaded, isMobile } = useContext(WindowContext);

  gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger, CustomEase);
  CustomEase.create("io2", ".45,0,.55,1");

  const tlDefaults = {
    yPercent: 100,
    duration: 1.2,
    ease: "power4.out",
    stagger: 0.05,
  };

  const iDefaults = {
    duration: 1,
    opacity: 0,
    ease: "io2",
  };

  const split = () => {
    gsap.utils.toArray('[a-t="r"]').forEach((el: any) => {
      const t_split = SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "line",
      });
    });
  };

  const horScroll = () => {
    const $secs = gsap.utils.toArray("#m section");

    split();

    const hs = gsap.to($secs, {
      xPercent: -100 * ($secs.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: "#m",
        pin: true,
        scrub: true,
        end: "+=" + $secs.length * 2000, // Adjust this value to control speed
      },
    });

    // S0 TIMELINE
    const s0_tl = gsap.timeline();

    s0_tl
      .from("[g-s='s0'] h3 .line", {
        ...tlDefaults,
      })
      .from(
        "[g-s='s0'] h2 .line",
        {
          ...tlDefaults,
        },
        "<"
      )
      .from(
        '[g-s="s0"] figure',
        {
          ...iDefaults,
        },
        "-=0.5"
      );

    // CURSOR
    gsap.to("#cursor", {
      autoAlpha: 0,
      scrollTrigger: {
        trigger: '[g-s="s1-l"]',
        containerAnimation: hs,
        start: "left 90%",
        end: "left 85%",
        scrub: true,
      },
    });
    // S1 TIMELINE

    gsap.from('[g-s="s1-l"] .line', {
      ...tlDefaults,
      onComplete: () => {
        const $masks = document.querySelectorAll('[g-s="s1-l"] .line-mask');
        $masks.forEach(($mask: any) => {
          $mask.style.overflow = "visible";
        });
      },
      scrollTrigger: {
        trigger: '[g-s="s1-l"]',
        containerAnimation: hs,
        start: "right right",
      },
    });
    gsap.from('[g-s="s1"] figure', {
      ...iDefaults,
      scrollTrigger: {
        trigger: '[g-s="s1"] figure',
        containerAnimation: hs,
        start: "left 90%",
      },
    });

    // S2 TIMELINE
    gsap.from('[g-s="s2"] span', {
      x: (i) => (i == 0 ? "-50%" : "50%"),
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: '[g-s="s2"] h2',
        containerAnimation: hs,
        start: "left 75%",
        end: "right 25%",
        scrub: true,
      },
    });

    gsap.from('[g-s="s2"] p .line', {
      ...tlDefaults,
      scrollTrigger: {
        trigger: '[g-s="s2"] p',
        containerAnimation: hs,
        start: "right right",
      },
    });
  };

  const initA = () => {
    gsap.set("._", {
      autoAlpha: 1,
    });
  };
  const cursorA = () => {
    gsap.set("#cursor", {
      autoAlpha: 1,
    });
  };

  useGSAP(() => {
    if (!fontLoaded) return;
    if (!play) return;
    initA();
    if (!isMobile) cursorA();
    if (!isMobile) horScroll();
    if (isMobile) {
      imagesA();
      textsA();
    }
  }, [fontLoaded, play]);

  return null;
}
