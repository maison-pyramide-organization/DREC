"use client";
import { useGSAP } from "@gsap/react";
import s from "./_s.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function () {
  gsap.registerPlugin(useGSAP, ScrollTrigger);

  useGSAP(() => {
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
  });

  return (
    <div id="an" className={s.ab_an}>
      <ul>
        <li>
          <h3>
            <span>3300</span>+
          </h3>
          <p>RESIDENTIAL AND COMMERCIAL PROPERTIES</p>
        </li>
        <li>
          <h3>
            <span>8800</span>+
          </h3>
          <p>RESIDENTS</p>
        </li>
        <li>
          <h3>
            <span>250</span>
          </h3>
          <p>EMPLOYEES AND MAINTANENCE PARTNERS</p>
        </li>
        <li>
          <h3>
            <span>30</span>+
          </h3>
          <p>YEARS ASSISTING PEOPLE FIND HOMES IN DUBAI</p>
        </li>
      </ul>
    </div>
  );
}
