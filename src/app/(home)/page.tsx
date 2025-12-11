import s from "./_s.module.css";
import Map from "./map";
import Lifestyle from "./lifestyle";
import Cursor from "@/components/cursor";
import Highlights from "./highlights";
import Places from "./places";
import About from "./about";
import Animation from "./_animation";
import Image from "next/image";
import bg1 from "@im/home/bg1.png";
import bg2 from "@im/home/bg2.png";
import bg1m from "@im/home/bg1-m.png";
import getHighlights from "@/services/api/highlights";

export default async function Home() {
  const highlights = await getHighlights();
  console.log("h", highlights);

  return (
    <>
      <div id="p" className={s.p}>
        <section className={s.he}>
          <h1 g-s="he_ti" className="m-o">
            COMFORT,
            <br />
            <div className={s.l1}>
              CONNECTION
              <span>&</span>
            </div>
            <div className={s.l2}>CONVENIENCE</div>
            ACROSS DUBAI
          </h1>

          <h1 g-s="he_ti" className="d-o">
            COMFORT, CONNECTION
            <span className={s.m}>& CONVENIENCE</span>
            <span>ACROSS DUBAI</span>
          </h1>
          <figure>
            <video
              className={s.v}
              g-s="he-v"
              autoPlay
              loop
              muted
              playsInline
              poster={`/vph.png`}
            >
              <source src="/videos/he.mp4" type="video/mp4" />
            </video>
          </figure>
        </section>

        <div className="w">
          <About />
          <Places />
          <Image className="bg d-o" src={bg1} alt="" />
          <Image className="bg m-o" src={bg1m} alt="" />
          <Lifestyle />
          <Image className={`${s.bg2} bg d-o`} src={bg2} alt="" />
        </div>
        <Map />
        <Highlights highlights={highlights} />
      </div>
      <Cursor />
      <Animation />
    </>
  );
}
