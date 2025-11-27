import s from "./_s.module.css";
import Image from "next/image";
import faqs from "@/data/faqs";
import Accordion from "@/components/accordion";
import Igtk0 from "@/assets/images/gtk/gtk0.png";
import Igtk1 from "@/assets/images/gtk/gtk1.png";
import Igplay from "@/assets/images/gtk/gplay.png";
import Iappstore from "@/assets/images/gtk/appstore.png";
import bg1 from "@/assets/images/gtk/gtk-bg-1.png";
import bg2 from "@/assets/images/gtk/gtk-bg-2.png";
import Animation from "./_animation";
import Terms from "./terms";

export default function GTK() {
  return (
    <>
      <section className={s.g0}>
        <h1 a-t="r">
          WHAT TO EXPECT
          <br />
          FROM DREC
        </h1>
        <p a-t="r">
          From first viewing to handover and beyond, we coordinate the details
          so you do not have to. Our team sets the standards for clear
          processes, responsive service and steady follow-through. The aim is
          straightforward living that stays reliable.
        </p>
        <figure a-i="r">
          <Image src={Igtk0} alt="DREC" />
        </figure>
        <Image className="bg" src={bg1} alt="" />
      </section>

      <section className={s.g1}>
        <div className={s.l}>
          <h2 a-t="r">LEASING</h2>
          <figure a-i="r">
            <Image src={Igtk1} alt="DREC" />
          </figure>
          <h2 a-t="r" className="m-o">
            & MOVE-IN FAQS
          </h2>
          <h2 a-t="r" className="d-o">
            & MOVE-IN <br />
            FAQS
          </h2>
        </div>
        <div className={s.faqs}>
          {faqs.map((faq, i) => (
            <Accordion title={faq.q} key={i}>
              <p>{faq.a}</p>
            </Accordion>
          ))}
        </div>
      </section>

      <section className={s.g2}>
        <h2 className="m-o" a-t="r">
          YOUR DREC <br />
          TENANTS PORTAL
        </h2>
        <div>
          <h2 className="d-o" a-t="r">
            YOUR DREC TENANTS PORTAL
          </h2>
          <h3 a-t="r">DOWNLOAD OUR APP</h3>
          <p a-t="r">
            Submit maintenance, book facilities, request permits, book shared
            spaces and message the management office in one place.
          </p>
          <p>AVAILABLE NOW ON</p>
          <div className={s.download}>
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.drec.ae&hl=en&gl=US&pli=1"
            >
              <Image src={Igplay} alt="" />
            </a>
            <a
              target="_blank"
              href="https://apps.apple.com/ae/app/drec-eservices/id1663713914"
            >
              <Image src={Iappstore} alt="" />
            </a>
          </div>
        </div>

        <video autoPlay loop muted playsInline>
          <source src="/videos/phone.mp4" type="video/mp4" />
        </video>
        <Image className="bg" src={bg2} alt="" />
      </section>
      <Terms />

      <Animation />
    </>
  );
}
