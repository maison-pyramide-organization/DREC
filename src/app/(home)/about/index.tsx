import s from "./_s.module.css";
import Link from "next/link";
import ab_image from "@/assets/images/home/about.png";
import Image from "next/image";
import Analytics from "./Analytics";

export default function About() {
  return (
    <section className={s.ab}>
      <Analytics />
      <div className={s.ab_in}>
        <div className={s.l}>
          <h3 a-t="r">
            We design for the long term
            <br />
            so life works in the short term.
          </h3>
          <p a-t="r">
            Since 1991, DREC has created and cared for homes and workspaces
            designed around people. As part of A.R.M. Holding, we pair a
            citywide portfolio with a people-first approach to lift the everyday
            for residents and businesses alike.
          </p>
          <Link href="/about-us">LEARN MORE</Link>
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
