import s from "./_s.module.css";
import Image from "next/image";
import faqs from "@/data/faqs";
import Accordion from "@/components/accordion";
import Igtk0 from "@/assets/images/gtk0.png";
import Igtk1 from "@/assets/images/gtk1.png";
import Igtk3 from "@/assets/images/gtk3.png";
import Igplay from "@/assets/images/gplay.png";
import Iappstore from "@/assets/images/appstore.png";

export default function GTK() {
  return (
    <>
      <section className={s.g0}>
        <div>
          <h1>
            WHAT TO EXPECT
            <br />
            FROM DREC
          </h1>
          <p>
            From first viewing to handover and beyond, we coordinate the details
            so you do not have to. Our team sets the standards for clear
            processes, responsive service and steady follow-through. The aim is
            straightforward living that stays reliable.
          </p>
        </div>
        <figure>
          <Image src={Igtk0} alt="DREC" />
        </figure>
      </section>

      <section className={s.g1}>
        <div>
          <h2>LEASING</h2>
          <figure>
            <Image src={Igtk1} alt="DREC" />
          </figure>
          <h2>
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
        <div>
          <h2>YOUR DREC TENANTS PORTAL</h2>
          <h3>DOWNLOAD OUR APP</h3>
          <p>
            Submit maintenance, book facilities, request permits, book shared
            spaces and message the management office in one place.
          </p>
          <p>AVAILABLE NOW ON</p>
          <div className={s.download}>
            <a href="/">
              <Image src={Igplay} alt="" />
            </a>
            <a href="/">
              <Image src={Iappstore} alt="" />
            </a>
          </div>
        </div>

          <video autoPlay loop muted playsInline>
            <source src="/videos/phone.mp4" type="video/mp4" />
          </video>
      </section>

      <section className={s.g3}>
        <h2>
          <div>
            click here <span>to view</span>
          </div>
          <div>
            <span>our terms</span>& conditions
          </div>
        </h2>
        <figure>
          <Image src={Igtk3} alt="" />
        </figure>
      </section>
    </>
  );
}
