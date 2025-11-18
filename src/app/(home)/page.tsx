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

export default function Home() {
  return (
    <>
      <div id="p" className={s.p}>
        <section className={s.he}>
          <h1 g-s="he_ti">
            COMFORT, CONNECTION
            <span>& CONVENIENCE</span>
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
          <Image className="bg" src={bg1} alt="" />
          <Lifestyle />
          <Image className={`${s.bg2} bg`} src={bg2} alt="" />
        </div>
        <Map />
        <Highlights />
      </div>
      <Cursor />
      <Animation />
    </>
  );
}
