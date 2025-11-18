import gsap from "gsap";
import { SplitText, ScrollTrigger, CustomEase } from "gsap/all";

gsap.registerPlugin(SplitText, ScrollTrigger, CustomEase);
CustomEase.create("io2", ".45,0,.55,1");

const imagesA = () => {
  gsap.utils.toArray('[a-i="r"]').forEach((el: any) => {
    gsap.from(el, {
      duration: 1,
      opacity: 0,
      ease: "io2",
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
      yPercent: 100,
      duration: 1.2,
      ease: "power4.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: el, // 👈 each element triggers its own animation
        start: "top 90%",
      },
    });
  });
};

export { textsA, imagesA };
