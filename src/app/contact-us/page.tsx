import s from "./_s.module.css";
import Image from "next/image";
import contactI from "@/assets/images/contact/contact.png";
import bg from "@/assets/images/contact/contact-bg.png";
import Animation from "./_animation";

export default function contact() {
  return (
    <>
      <section className={s.c0}>
        <div className={s._}>
          <h1>
            <div>
              WE’D LOVE <span>TO</span>
            </div>
            <div>
              HEAR <span>FROM YOU</span>
            </div>
          </h1>

          <div className={s.c_info}>
            <div className={s.l}>
              <h3>
                <a
                  target="_blank"
                  href="mailto:info@drec.ae"
                  className={s.email}
                >
                  INFO@DREC.AE
                </a>
              </h3>
              <a
                target="_blank"
                href="https://www.instagram.com/drecuae"
                className={s.social}
              >
                INSTAGRAM
              </a>
              <a
                target="_blank"
                href="https://www.facebook.com/drecuae/"
                className={s.social}
              >
                FACEBOOK
              </a>
            </div>
            <div className={s.r}>
              <h3>DREC DUBAI HQ</h3>
              <p>Al Mina Road, Dubai UAE</p>
              <p>P.O. Box: 11412</p>
            </div>
          </div>
        </div>

        <Image className="bg" src={bg} alt="" />
      </section>

      <section className={s.c1}>
        <h2>
          SEND US YOUR <br />
          ENQUIRY
        </h2>
        <figure>
          <Image src={contactI} alt="DREC" />
        </figure>
        <form className={`${s.enqF} ${s.f}`}>
          <input type="email" name="email" placeholder="EMAIL ADDRESS" />
          <input type="text" name="name" placeholder="FULL NAME" />
          <input type="text" name="subject" placeholder="SUBJECT" />
          <input type="number" name="number" placeholder="PHONE NUMBER" />

          <div className={s.b}>
            <label htmlFor="message">MESSAGE</label>
            <textarea name="message" />
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </section>

      <section className={s.c2}>
        <h2>
          GROW YOUR
          <br /> CAREER WITH US
        </h2>
        <form className={`${s.carF} ${s.f}`}>
          <input type="text" name="name" placeholder="FULL NAME" />
          <input type="text" name="subject" placeholder="ATTACH CV" />
          <div className={s.b}>
            <label htmlFor="message">MESSAGE</label>
            <textarea name="message" />
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </section>
      <Animation />
    </>
  );
}
