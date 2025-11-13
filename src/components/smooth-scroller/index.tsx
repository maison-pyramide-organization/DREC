"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function SmoothScroller() {
  const pathname = usePathname();

  useGSAP(
    () => {
      ScrollSmoother.create({
        content: "._",
        smooth: 2,
        effects: true,
        // ease: "expo.out",
      });
    },
    {
      dependencies: [pathname],
      revertOnUpdate: true,
    }
  );

  return null;
}
