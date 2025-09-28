import s from "./_s.module.css";
import Link from "next/link";
import Chev from "@/assets/icons/chev.svg";

export default function Properties() {
  return (
    <section className={s.prs}>
      <h2>
        FIND A PLACE
        <br />
        THAT FITS YOU
      </h2>
      <div className={s.prs_link}>
        <Link href="/properties">DISCOVER ALL PROPERTIES</Link>
        <Chev />
      </div>
      <div className={s.pr}>
        <h3>118 COMPLEX</h3>
        <p>
          Light-filled homes with room to breathe. Step outside to spaces that
          feel inviting and come back to care you can count on. Quiet streets,
          welcoming shared areas and everyday essentials close by keep life
          simple.
        </p>
      </div>
    </section>
  );
}
