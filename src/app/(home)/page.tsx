import s from "./_s.module.css";
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
      <div id="p" className={s.p}>
        <section className={s.he}>
          <h1 a-t="title">
            COMFORT, CONNECTION
            <span>& CONVENIENCE</span>
            <span>ACROSS DUBAI</span>
          </h1>
          <figure>
            <video
              className={s.v}
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
