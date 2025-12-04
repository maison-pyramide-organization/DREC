import s from "./_s.module.css";
import Link from "next/link";
import Image from "next/image";
import Iabout from "@/assets/images/about/about-banner.png";
import Iabout11 from "@/assets/images/about/about1.1.png";
import Iabout12 from "@/assets/images/about/about1.2.png";
import Iabout31 from "@/assets/images/about/about3.1.png";
import Iabout41 from "@/assets/images/about/about4.1.png";
import bg1 from "@/assets/images/about/bg1.png";
import bg2 from "@/assets/images/about/ab-bg-2.png";
// import bg1m from "@/assets/images/about/bg1-m.png";
import Animation from "./_animation";

export default function About() {
  return (
    <>
      <section className={s.s_a0}>
        <h1 a-t="r">WHO WE ARE</h1>

        <figure a-i="r">
          <Image src={Iabout} alt="About DREC" />
        </figure>

        <p a-t="r">BUILDING COMMUNITIES SINCE 1991</p>
        {/* <Image className="bg m-o" src={bg1m} alt="" /> */}
      </section>

      <section className={s.s_a1}>
        <div className={s.l}>
          <h2 a-t="r">
            We create and care for liveable communities across Dubai.
          </h2>
          <figure a-i="r">
            <Image src={Iabout11} alt="DREC" />
          </figure>
        </div>

        <div className={s.r}>
          <p a-t="r">
            DREC develops and manages homes and workspaces that put people
            first. We favour human scale, clear design and locations that keep
            daily life simple. As part of A.R.M. Holding, we consider the
            long-term vision and pair it with attentive service, to deliver
            quality that lasts and communities that feel calm, safe and
            connected.
          </p>
          <a href="https://www.armholding.ae/">LEARN ABOUT A.R.M. HOLDING</a>
          <figure a-i="r">
            <Image src={Iabout12} alt="DREC" />
          </figure>
        </div>
        <Image className="bg d-o" src={bg1} alt="" />
      </section>

      <section className={s.s_a2}>
        <h2 a-t="r">
          WHAT WE
          <span>STAND FOR</span>
        </h2>

        <div g-s="s2-c" className={s.c}>
          <div>
            <span g-s="line" />
            <h3 className="m-o">DESIGN THAT SERVES DAILY LIFE</h3>
            <h3 className="d-o">
              DESIGN THAT SERVES <br /> DAILY LIFE
            </h3>
            <p>
              Good light, practical layouts and durable finishes come first.
              Shared areas are welcoming and easy to use. Every choice supports
              comfort, clarity and routine.
            </p>
          </div>
          <div>
            <span g-s="line" />
            <h3 className="m-o">CARE THAT LASTS</h3>
            <h3 className="d-o">
              CARE THAT
              <br /> LASTS
            </h3>
            <p>
              We stand behind what we build. Maintenance is proactive,
              communication is steady and standards stay consistent across the
              portfolio. The focus is reliability, day in and day out.
            </p>
          </div>
          <div>
            <span g-s="line" />
            <h3 className="m-o">COMMUNITY AT THE CENTRE</h3>
            <h3 className="d-o">
              COMMUNITY AT
              <br /> THE CENTRE
            </h3>
            <p>
              We think beyond buildings. Neighbourhood links, green pockets and
              useful nearby stops are part of the plan, so residents and
              businesses can settle in, connect and stay.
            </p>
          </div>
        </div>

        <Image className="bg" src={bg2} alt="" />
      </section>

      <section className={s.s_a3}>
        <h2 a-t="r">
          DREC
          <span>COMMUNITIES</span>
        </h2>
        <figure a-i="r">
          <Image src={Iabout31} alt="DREC" />
        </figure>
        <p a-t="r">
          Across Dubai, DREC builds human-centred communities where tenants come
          first. Our homes and workspaces are planned for your routines: curated
          locations, useful amenities and locations that put parks, schools and
          daily routes close by. Your interests guide our decisions, from
          practical layouts to the support you receive.
        </p>
      </section>

      <section className={s.s_a4}>
        <h2 className="m-o">
          FIND YOUR NEXT HOME NOW.
          <br />
          START THE SEARCH
        </h2>
        <div className={s.h}>
          <h2 className="d-o" a-t="r">
            <div>
              FIND YOUR <span>NEXT HOME</span>
            </div>
            <div>
              NOW. <span>START THE SEARCH</span>
            </div>
          </h2>
          <Link href="/properties">DISCOVER OUR PROPERTIES</Link>
        </div>
        <figure a-i="r">
          <Image src={Iabout41} alt="DREC" />
        </figure>
      </section>
      <Animation />
    </>
  );
}
