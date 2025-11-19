"use client";

import s from "./_s.module.css";
import Link from "next/link";
import Chev from "@/assets/icons/chev.svg";
import iSl1 from "@/assets/images/home/sl-1.png";
import iSl2 from "@/assets/images/home/sl-2.png";
import iSl3 from "@/assets/images/home/sl-3.png";
import Image from "next/image";
import gsap from "gsap";

export default function Places() {
  const sliderImages = [iSl1, iSl2, iSl3];

  const onClick = () => {
    const s1 = document.querySelector(`[slide-i="1"]`) as HTMLElement;
    const s2 = document.querySelector(`[slide-i="2"]`) as HTMLElement;
    const s3 = document.querySelector(`[slide-i="3"]`) as HTMLElement;
    const r = () => {
      s2.setAttribute("slide-i", "3");
      s1.setAttribute("slide-i", "2");
      s3.setAttribute("slide-i", "1");
    };
    const tl = gsap.timeline();
    tl.to(s3, { opacity: 0, duration: 0.2, onComplete: r })
      .set(s3, { top: 0, left: 0, opacity: 1 })
      .to([s1, s2], {
        top: "+=40rem",
        left: "+=50rem",
        duration: ".4",
      });
  };

  return (
    <section className={s.pl}>
      <div className={s.pl_s} onClick={onClick} g-s='pl'>
        <figure slide-i="1">
          <Image src={iSl1} alt="" />
        </figure>
        <figure slide-i="2">
          <Image src={iSl2} alt="" />
        </figure>
        <figure slide-i="3">
          <Image src={iSl3} alt="" />
        </figure>
      </div>

      <div className={s.pl_c}>
        <h2 a-t="r">
          FIND A PLACE
          <br />
          THAT FITS YOU
        </h2>
        <Link href="/properties">
          DISCOVER ALL PROPERTIES
          <Chev />
        </Link>
        <div className={s.pr}>
          <h3>118 COMPLEX</h3>
          <p>
            Light-filled homes with room to breathe. Step outside to spaces that
            feel inviting and come back to care you can count on. Quiet streets,
            welcoming shared areas and everyday essentials close by keep life
            simple.
          </p>
        </div>
      </div>
    </section>
  );
}
