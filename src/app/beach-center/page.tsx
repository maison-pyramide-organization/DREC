"use client";

import { useEffect, useRef } from "react";
import s from "./_s.module.css";
import Image from "next/image";
import bcLogo from "@im/beach/bc-logo.png";
import bcS0 from "@im/beach/bc-s0.png";
import bcS1 from "@im/beach/bc-s1.png";
import bcS2 from "@im/beach/bc-s2.png";

export default function BeachCenter() {
  const vidR = useRef(null);

  const showP = () => {
    const $vid = vidR.current! as HTMLVideoElement;
    $vid.classList.add("hi");

    const $m = document.getElementById("m") as HTMLElement;
    $m?.classList.add("sh");
  };

  useEffect(() => {
    const $vid = vidR.current! as HTMLVideoElement;
    if (!$vid) return;
    $vid.addEventListener("ended", showP);
    $vid.play();
  }, []);

  return (
    <div className={s.p}>
      {/* <video className={s.v} g-s="he-v" muted ref={vidR}>
        <source src="/videos/beach-center.mp4" type="video/mp4" />
      </video> */}

      {/* <main id="m" className={s.m} style={{ opacity: 0, visibility: "hidden" }}> */}
      <main id="m" className={s.m}>
        {/* SECTION 0 */}

        <section className={s.s0}>
          <div className={s._}>
            <div className={s.l}>
              <h3>A PROJECT BY DREC</h3>
              <figure>
                <Image src={bcLogo} alt="Beach Center" />
              </figure>
            </div>
            <div className={s.r}>
              <h2>
                <div>A NEW</div>
                <div>
                  RHYTHM <span>IN A</span>
                </div>
                <div>FAMILIAR PLACE</div>
              </h2>
              <figure>
                <Image src={bcS0} alt="Beach Center" />
              </figure>
            </div>
          </div>
        </section>

        {/* SECTION 1 */}

        <section className={s.s1}>
          <div className={s._}>
            <div className={s.l}>
              <h2>
                BEACH CENTRE,
                <br />
                JUMEIRAH
              </h2>

              <p>
                A neighborhood mall with
                <br />
                memory, reimagined with clarity.
              </p>
              <p>
                A Jumeirah landmark with new energy, Beach Centre keeps the
                spirit of a neighborhood mall while lifting the experience.
                Coffee, cultural moments and useful stops connect without the
                noise. Backed by A.R.M. Holding, it serves the community with
                clarity, comfort and care.
              </p>
            </div>
            <div className={s.r}>
              <figure>
                <Image src={bcS1} alt="Beach Center" />
              </figure>
            </div>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className={s.s2}>
          <div className={s._}>
            <p>
              COMING SOON <br />
              IN 2007
            </p>
            <figure>
              <Image src={bcS2} alt="Beach Center" />
            </figure>
          </div>
        </section>
      </main>
    </div>
  );
}
