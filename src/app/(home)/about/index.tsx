import s from "./_s.module.css";
import Link from "next/link";
import ab_image from "@/assets/images/home/about.png";
import Image from "next/image";

export default function About() {
  return (
    <section className={s.ab}>
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

      {/* INFO */}
      <div className={s.ab_in}>
        <div className={s.l}>
          <h3 a-t="r" className="m-o">
            We design for the long term so life works in the short term.
          </h3>
          <h3 a-t="r" className="d-o">
            We design for the long term <br />
            so life works in the short term.
          </h3>
          <div>
            <p a-t="r">
              Since 1991, DREC has created and cared for homes and workspaces
              designed around people. As part of A.R.M. Holding, we pair a
              citywide portfolio with a people-first approach to lift the
              everyday for residents and businesses alike.
            </p>
            <Link href="/about-us">LEARN MORE</Link>
          </div>
        </div>
        <div className={s.r}>
          <figure a-i="r">
            <Image src={ab_image} alt="" />
          </figure>
        </div>
      </div>
    </section>
  );
}
