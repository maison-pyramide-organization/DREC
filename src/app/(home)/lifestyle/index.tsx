import s from "./_s.module.css";
import lifestyle1 from "@/assets/images/lifestyle1.png";
import lifestyle2 from "@/assets/images/lifestyle2.png";
import Image from "next/image";

export default function Lifestyle() {
  return (
    <section className={s.ls}>
      <div className={s.l}>
        <h2>
          "Comfort, safety and connection guide every decision. We build for the
          life around you."
        </h2>

        <figure data-animation="pi">
          <Image src={lifestyle1} alt="" />
        </figure>
      </div>
      <div className={s.r}>
        <figure data-animation="pi">
          <Image src={lifestyle2} alt="" />
        </figure>
      </div>
    </section>
  );
}
