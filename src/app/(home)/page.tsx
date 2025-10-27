import s from "./_s.module.css";
import Image from "next/image";
import Link from "next/link";
import vph from "@/assets/images/vph.png";
import ab_image from "@/assets/images/about.png";
import Map from "./map";
import Lifestyle from "./lifestyle";
import Cursor from "@/components/cursor";
import Highlights from "./highlights";

export default function Home() {
  return (
    <>
      <div className={s.p}>
        <section className={s.he}>
          <h1>
            COMFORT, CONNECTION
            <span>& CONVENIENCE</span>
            ACROSS DUBAI
          </h1>
          <figure>
            <Image src={vph} alt="" />
            {/* <video className={s.v} autoPlay loop muted playsInline>
            <source src="/he.mp4" type="video/mp4" />
          </video> */}
          </figure>
        </section>
        <section className={s.ab}>
          <div className={s.ab_an}>
            <ul>
              <li>
                <h3>3500</h3>
                <p>RESIDENTIAL AND COMMERCIAL PROPERTIES</p>
              </li>
              <li>
                <h3>250</h3>
                <p>EMPLOYEES AND MAINTANENCE PARTNERS</p>
              </li>
              <li>
                <h3>29</h3>
                <p>YEARS ASSISTING PEOPLE FIND HOMES IN DUBAI</p>
              </li>
            </ul>
          </div>
          <div className={s.ab_in}>
            <div className={s.l}>
              <h3>
                We design for the long term
                <br />
                so life works in the short term.
              </h3>
              <p>
                Since 1991, DREC has created and cared for homes and workspaces
                designed around people. As part of A.R.M. Holding, we pair a
                citywide portfolio with a people-first approach to lift the
                everyday for residents and businesses alike.
              </p>
              <Link href="/about-us">LEARN MORE</Link>
            </div>
            <div className={s.r}>
              <figure>
                <Image src={ab_image} alt="" />
              </figure>
            </div>
          </div>
        </section>

        <Lifestyle />
        <Map />
        <Highlights />
      </div>
      <Cursor />
    </>
  );
}
