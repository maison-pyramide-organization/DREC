import s from "./_s.module.css";
import Link from "next/link";
import Image from "next/image";
import Iabout from "@/assets/images/about-banner.png";
import Iabout11 from "@/assets/images/about1.1.png";
import Iabout12 from "@/assets/images/about1.2.png";
import Iabout31 from "@/assets/images/about3.1.png";
import Iabout41 from "@/assets/images/about4.1.png";

export default function About() {
  return (
    <>
      <section className={s.s_a0}>
        <h1>WHO WE ARE</h1>

        <figure>
          <Image src={Iabout} alt="About DREC" />
        </figure>

        <p>BUILDING COMMUNITIES SINCE 1991</p>
      </section>

      <section className={s.s_a1}>
        <div className={s.l}>
          <h2>We create and care for liveable communities across Dubai.</h2>
          <figure>
            <Image src={Iabout11} alt="DREC" />
          </figure>
        </div>

        <div className={s.r}>
          <p>
            DREC develops and manages homes and workspaces that put people
            first. We favour human scale, clear design and locations that keep
            daily life simple. As part of A.R.M. Holding, we consider the
            long-term vision and pair it with attentive service, to deliver
            quality that lasts and communities that feel calm, safe and
            connected.
          </p>
          <a href="/">LEARN ABOUT A.R.M. HOLDING</a>
          <figure>
            <Image src={Iabout12} alt="DREC" />
          </figure>
        </div>
      </section>

      <section className={s.s_a2}>
        <h2>
          WHAT WE
          <span>STAND FOR</span>
        </h2>

        <div className={s.c}>
          <div>
            <h3>DESIGN THAT SERVES DAILY LIFE</h3>
            <p>
              Good light, practical layouts and durable finishes come first.
              Shared areas are welcoming and easy to use. Every choice supports
              comfort, clarity and routine.
            </p>
          </div>
          <div>
            <h3>
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
            <h3>
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
      </section>

      <section className={s.s_a3}>
        <h2>
          DREC
          <br />
          COMMUNITIES
        </h2>
        <figure>
          <Image src={Iabout31} alt="DREC" />
        </figure>
        <p>
          Across Dubai, DREC builds human-centred communities where tenants come
          first. Our homes and workspaces are planned for your routines: curated
          locations, useful amenities and locations that put parks, schools and
          daily routes close by. Your interests guide our decisions, from
          practical layouts to the support you receive.
        </p>
      </section>

      <section className={s.s_a4}>
        <div className={s.h}>
          <h2>
            <div>
            FIND YOUR <span>NEXT HOME</span>
            </div>
            <div>
            NOW. <span>START THE SEARCH</span>
            </div>
          </h2>
          <Link href="/properties">DISCOVER OUR PROPERTIES</Link>
        </div>
        <figure>
          <Image src={Iabout41} alt="DREC" />
        </figure>
      </section>
    </>
  );
}
