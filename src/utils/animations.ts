import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger);

const imagesA = () => {
  gsap.utils.toArray('[a-i="r"]').forEach((el: any) => {
    gsap.from(el, {
      duration: 1,
      opacity: 0,
      ease: "sine.out",
      //   ease: "io2",
      scrollTrigger: {
        trigger: el, // 👈 each element triggers its own animation
        start: "top 90%",
      },
    });
  });
};

const textsA = () => {
  gsap.utils.toArray('[a-t="r"]').forEach((el: any) => {
    const t_split = SplitText.create(el, { type: "lines", mask: "lines" });
    gsap.from(t_split.lines, {
      y: "100%",
      duration: 0.4,
      ease: "sine.out",
      stagger: {
        each: 0.1,
      },
      scrollTrigger: {
        trigger: el, // 👈 each element triggers its own animation
        start: "top 90%",
      },
    });
  });
};

export { textsA, imagesA };
