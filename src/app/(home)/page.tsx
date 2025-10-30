import s from "./_s.module.css";
import Image from "next/image";
import vph from "@/assets/images/vph.png";
import Map from "./map";
import Lifestyle from "./lifestyle";
import Cursor from "@/components/cursor";
import Highlights from "./highlights";
import Places from "./places";
import About from "./about";
import Animation from "./_animation";

export default function Home() {
  return (
    <>
      <div id="p" className={s.p} style={{ opacity: 0 }}>
        <section className={s.he}>
          <h1 a-t="title">
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

        <About />
        <Places />
        <Lifestyle />
        <Map />
        <Highlights />
      </div>
      <Cursor />
      <Animation />
    </>
  );
}
