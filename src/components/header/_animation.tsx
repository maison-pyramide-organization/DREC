"use client";

import { WindowContext } from "@/contexts/windowContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools, ScrollTrigger, SplitText } from "gsap/all";
import { useContext } from "react";

export default function Animation(props: any) {
  const { fontLoaded } = useContext(WindowContext);
  const { isOpened } = props;

  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, GSDevTools);

  // const headerA = () => {};

  const menuA = () => {
    const tl = gsap.timeline({
      defaults: { duration: 0.8, ease: "power3.inOut" },
    });

    const $menu = document.getElementById("menu");

    gsap.from($menu, {
      height: 0,
      duration: 0.6,
      ease: "power2.out",
    });

    // get all list items
    const items = gsap.utils.toArray("#menu li") as HTMLElement[];

    items.forEach((item, i) => {
      const text = item.querySelector("[g-s='y']"); // the first .y (text)
      const index = item.querySelector("[g-s='i'] [g-s='y']"); // the index number inside .i

      tl.from(text, { y: "100%" }, i * 0.1) // each <li> starts slightly later
        .from(index, { y: "100%" }, i * 0.1 + 0.1); // index starts a bit after text
    });
  };

  useGSAP(() => {
    if (!fontLoaded || !isOpened) return;
    menuA();
  }, [fontLoaded, isOpened]);

  return null;
}
